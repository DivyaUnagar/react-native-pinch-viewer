import { useState, useEffect, useRef, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Platform,
} from 'react-native';
import type { NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ImageItem } from './ImageItem';
import { ThumbnailItem } from './ThumbnailItem';
import { getSource } from '../utils';
import type { PinchViewerProps } from '../types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

/**
 * PinchViewer: The main professional image gallery component.
 * Features:
 * - Pinch-to-zoom & Pan
 * - Swipe-down-to-close
 * - Horizontal swipe for multiple images
 * - Thumbnail preview navigation
 * - Custom indicators (dots or text)
 */
export const PinchViewer = ({
  images,
  initialIndex = 0,
  visible,
  onClose,
  enableSwipeDown = true,
  showIndicators = true,
  showThumbnails = true,
  backdropOpacity = 0.95,
  imageResizeMode = 'contain',
  containerStyle,
}: PinchViewerProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const flatListRef = useRef<FlatList>(null);
  const thumbListRef = useRef<FlatList>(null);
  const bgSharedOpacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      setCurrentIndex(initialIndex);
      bgSharedOpacity.value = withTiming(1, { duration: 300 });
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index: initialIndex,
          animated: false,
        });
        thumbListRef.current?.scrollToIndex({
          index: initialIndex,
          animated: false,
          viewPosition: 0.5,
        });
      }, 50);
    } else {
      bgSharedOpacity.value = withTiming(0, { duration: 200 });
    }
  }, [visible, initialIndex, bgSharedOpacity]);

  const handleClose = () => {
    bgSharedOpacity.value = withTiming(0, { duration: 200 }, (isFinished) => {
      if (isFinished) {
        runOnJS(onClose)();
      }
    });
  };

  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetX = event.nativeEvent.contentOffset.x;
      const index = Math.round(offsetX / SCREEN_WIDTH);
      if (index !== currentIndex && index >= 0 && index < images.length) {
        setCurrentIndex(index);
        thumbListRef.current?.scrollToIndex({
          index,
          animated: true,
          viewPosition: 0.5,
        });
      }
    },
    [currentIndex, images.length]
  );

  const bgStyle = useAnimatedStyle(() => ({
    backgroundColor: `rgba(0, 0, 0, ${
      bgSharedOpacity.value * backdropOpacity
    })`,
    opacity: bgSharedOpacity.value,
  }));

  if (!visible || !images || images.length === 0) return null;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="none"
      statusBarTranslucent={true}
      onRequestClose={handleClose}
    >
      <GestureHandlerRootView style={[styles.root, containerStyle]}>
        <Animated.View style={[StyleSheet.absoluteFill, bgStyle]} />

        {/* Gallery spanning full screen */}
        <View style={StyleSheet.absoluteFill}>
          <FlatList
            ref={flatListRef}
            data={images}
            keyExtractor={(_, index) => index.toString()}
            horizontal={true}
            pagingEnabled
            scrollEnabled={true}
            showsHorizontalScrollIndicator={false}
            onScroll={onScroll}
            scrollEventThrottle={16}
            getItemLayout={(_, index) => ({
              length: SCREEN_WIDTH,
              offset: SCREEN_WIDTH * index,
              index,
            })}
            renderItem={({ item }) => (
              <ImageItem
                source={getSource(item)}
                enableSwipeDown={enableSwipeDown}
                onSwipeDownClose={handleClose}
                setIsZooming={() => {}}
                resizeMode={imageResizeMode}
              />
            )}
            initialScrollIndex={initialIndex}
          />
        </View>

        {/* UI Overlay */}
        <SafeAreaView style={styles.overlay} pointerEvents="box-none">
          <View style={styles.header} pointerEvents="box-none">
            <Text style={styles.headerText}>
              {showIndicators && images.length > 1
                ? `${currentIndex + 1} / ${images.length}`
                : ''}
            </Text>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.spacer} pointerEvents="none" />

          {showThumbnails && images.length > 1 && (
            <View style={styles.footer} pointerEvents="box-none">
              <FlatList
                ref={thumbListRef}
                data={images}
                keyExtractor={(_, i) => i.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.thumbnailList}
                getItemLayout={(_, index) => ({
                  length: 60,
                  offset: 60 * index,
                  index,
                })}
                renderItem={({ item, index }) => (
                  <ThumbnailItem
                    source={getSource(item)}
                    isSelected={index === currentIndex}
                    onPress={() =>
                      flatListRef.current?.scrollToIndex({
                        index,
                        animated: true,
                      })
                    }
                  />
                )}
              />
            </View>
          )}

          {showIndicators && !showThumbnails && images.length > 1 && (
            <View style={styles.dotsContainer} pointerEvents="none">
              {images.map((_, i) => (
                <View
                  key={i}
                  style={[styles.dot, i === currentIndex && styles.activeDot]}
                />
              ))}
            </View>
          )}
        </SafeAreaView>
      </GestureHandlerRootView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
    justifyContent: 'space-between',
  },
  header: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 20,
    marginTop: Platform.OS === 'ios' ? 0 : 30,
  },
  headerText: { color: 'white', fontSize: 16, fontWeight: '600' },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  footer: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnailList: { paddingHorizontal: 20, paddingVertical: 10, gap: 10 },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
    height: 40,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.4)',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#ffffff',
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  spacer: { flex: 1 },
});
