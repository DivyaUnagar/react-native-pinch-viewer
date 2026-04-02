"use strict";

import { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, View, Text, Modal, SafeAreaView, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS } from 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ImageItem } from "./ImageItem.js";
import { ThumbnailItem } from "./ThumbnailItem.js";
import { getSource } from "../utils/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const {
  width: SCREEN_WIDTH
} = Dimensions.get('window');

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
  containerStyle
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const flatListRef = useRef(null);
  const thumbListRef = useRef(null);
  const bgSharedOpacity = useSharedValue(0);
  useEffect(() => {
    if (visible) {
      setCurrentIndex(initialIndex);
      bgSharedOpacity.value = withTiming(1, {
        duration: 300
      });
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index: initialIndex,
          animated: false
        });
        thumbListRef.current?.scrollToIndex({
          index: initialIndex,
          animated: false,
          viewPosition: 0.5
        });
      }, 50);
    } else {
      bgSharedOpacity.value = withTiming(0, {
        duration: 200
      });
    }
  }, [visible, initialIndex, bgSharedOpacity]);
  const handleClose = () => {
    bgSharedOpacity.value = withTiming(0, {
      duration: 200
    }, isFinished => {
      if (isFinished) {
        runOnJS(onClose)();
      }
    });
  };
  const onScroll = useCallback(event => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / SCREEN_WIDTH);
    if (index !== currentIndex && index >= 0 && index < images.length) {
      setCurrentIndex(index);
      thumbListRef.current?.scrollToIndex({
        index,
        animated: true,
        viewPosition: 0.5
      });
    }
  }, [currentIndex, images.length]);
  const bgStyle = useAnimatedStyle(() => ({
    backgroundColor: `rgba(0, 0, 0, ${bgSharedOpacity.value * backdropOpacity})`,
    opacity: bgSharedOpacity.value
  }));
  if (!visible || !images || images.length === 0) return null;
  return /*#__PURE__*/_jsx(Modal, {
    visible: visible,
    transparent: true,
    animationType: "none",
    statusBarTranslucent: true,
    onRequestClose: handleClose,
    children: /*#__PURE__*/_jsxs(GestureHandlerRootView, {
      style: [styles.root, containerStyle],
      children: [/*#__PURE__*/_jsx(Animated.View, {
        style: [StyleSheet.absoluteFill, bgStyle]
      }), /*#__PURE__*/_jsx(View, {
        style: StyleSheet.absoluteFill,
        children: /*#__PURE__*/_jsx(FlatList, {
          ref: flatListRef,
          data: images,
          keyExtractor: (_, index) => index.toString(),
          horizontal: true,
          pagingEnabled: true,
          scrollEnabled: true,
          showsHorizontalScrollIndicator: false,
          onScroll: onScroll,
          scrollEventThrottle: 16,
          getItemLayout: (_, index) => ({
            length: SCREEN_WIDTH,
            offset: SCREEN_WIDTH * index,
            index
          }),
          renderItem: ({
            item
          }) => /*#__PURE__*/_jsx(ImageItem, {
            source: getSource(item),
            enableSwipeDown: enableSwipeDown,
            onSwipeDownClose: handleClose,
            setIsZooming: () => {},
            resizeMode: imageResizeMode
          }),
          initialScrollIndex: initialIndex
        })
      }), /*#__PURE__*/_jsxs(SafeAreaView, {
        style: styles.overlay,
        pointerEvents: "box-none",
        children: [/*#__PURE__*/_jsxs(View, {
          style: styles.header,
          pointerEvents: "box-none",
          children: [/*#__PURE__*/_jsx(Text, {
            style: styles.headerText,
            children: showIndicators && images.length > 1 ? `${currentIndex + 1} / ${images.length}` : ''
          }), /*#__PURE__*/_jsx(TouchableOpacity, {
            onPress: handleClose,
            style: styles.closeButton,
            children: /*#__PURE__*/_jsx(Text, {
              style: styles.closeText,
              children: "\u2715"
            })
          })]
        }), /*#__PURE__*/_jsx(View, {
          style: {
            flex: 1
          },
          pointerEvents: "none"
        }), showThumbnails && images.length > 1 && /*#__PURE__*/_jsx(View, {
          style: styles.footer,
          pointerEvents: "box-none",
          children: /*#__PURE__*/_jsx(FlatList, {
            ref: thumbListRef,
            data: images,
            keyExtractor: (_, i) => i.toString(),
            horizontal: true,
            showsHorizontalScrollIndicator: false,
            contentContainerStyle: styles.thumbnailList,
            getItemLayout: (_, index) => ({
              length: 60,
              offset: 60 * index,
              index
            }),
            renderItem: ({
              item,
              index
            }) => /*#__PURE__*/_jsx(ThumbnailItem, {
              source: getSource(item),
              isSelected: index === currentIndex,
              onPress: () => flatListRef.current?.scrollToIndex({
                index,
                animated: true
              })
            })
          })
        }), showIndicators && !showThumbnails && images.length > 1 && /*#__PURE__*/_jsx(View, {
          style: styles.dotsContainer,
          pointerEvents: "none",
          children: images.map((_, i) => /*#__PURE__*/_jsx(View, {
            style: [styles.dot, i === currentIndex && styles.activeDot]
          }, i))
        })]
      })]
    })
  });
};
const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
    justifyContent: 'space-between'
  },
  header: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 20,
    marginTop: 30
  },
  headerText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600'
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  closeText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  footer: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center'
  },
  thumbnailList: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 10
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
    height: 40
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.4)',
    marginHorizontal: 4
  },
  activeDot: {
    backgroundColor: '#ffffff',
    width: 10,
    height: 10,
    borderRadius: 5
  }
});
//# sourceMappingURL=PinchViewer.js.map