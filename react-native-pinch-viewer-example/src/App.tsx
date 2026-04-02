import { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import type { ImageSourcePropType } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PinchViewer } from 'react-native-pinch-viewer';

const { width } = Dimensions.get('window');

// 1. Define your array of images
const imageArray: ImageSourcePropType[] = [
  require('./assets/model1.jpg'),
  {
    uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop',
  },
  {
    uri: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop',
  },
  {
    uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
  },
  {
    uri: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop',
  },
  {
    uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop',
  },
];

export default function App() {
  const [viewerVisible, setViewerVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const openImage = (index: number) => {
    setSelectedIndex(index);
    setViewerVisible(true);
  };

  return (
    <GestureHandlerRootView style={styles.root}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.title}>React Native Pinch Viewer</Text>
        </View>

        {/* Gallery Grid */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.grid}>
            {imageArray.map((img, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                onPress={() => openImage(index)}
                style={styles.imageCard}
              >
                <Image
                  source={img}
                  style={styles.thumbnailImage}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Modern PinchViewer Component */}
      <PinchViewer
        images={imageArray}
        visible={viewerVisible}
        initialIndex={selectedIndex}
        onClose={() => setViewerVisible(false)}
        enableSwipeDown={false}
        showIndicators={true}
        showThumbnails={true}
        backdropOpacity={0.7}
        imageResizeMode="cover" // Forces image to span entire vertical height of the screen!
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#000000' },
  container: {
    flex: 1,
    backgroundColor: '#0A0A0C', // Deep dark aesthetic
    paddingTop: 60,
  },
  header: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: '800',
    // letterSpacing: 0.5,
  },
  subtitle: {
    color: '#8A8A8E',
    fontSize: 16,
    marginTop: 6,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  scrollContent: {
    paddingBottom: 40,
    paddingHorizontal: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  imageCard: {
    width: (width - 48) / 2, // 2 columns with 16px gap
    height: 240, // Taller aesthetic portrait ratio
    marginBottom: 16,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#1C1C1E',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
});
