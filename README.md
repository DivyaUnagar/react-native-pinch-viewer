# react-native-pinch-viewer

A high-performance, production-ready **React Native Image Gallery** and **Pinch-to-Zoom** viewer. Built with **React Native Gesture Handler** and **Reanimated 3** for buttery-smooth 60fps performance on both iOS and Android.

Looking for a reliable **React Native Photo Viewer** with **Pinch-to-Zoom** and **Gallery Swiping**? This library provides a seamless, natively-driven experience for handling image interactions.

![npm version](https://img.shields.io/npm/v/react-native-pinch-viewer)
![license](https://img.shields.io/npm/l/react-native-pinch-viewer)
![platform](https://img.shields.io/badge/platform-ios%20%7C%20android-lightgrey)

## 🌟 Features

- 🚀 **Buttery Smooth 60FPS**: Leverages Reanimated 3 for high-performance, natively-driven animations.
- 🔍 **Intuitive Pinch-to-Zoom**: Smooth zooming and scaling using standard pinch gestures.
- 🖐️ **Pan & Drag**: Experience fluid panning when zoomed in to explore image details.
- 📱 **Integrated Gallery Support**: Built-in horizontal swiping to navigate through multiple images.
- 🖼️ **Thumbnail Navigation**: Optional thumbnail carousel for quick access to specific images.
- ⬇️ **Modern Swipe-to-Close**: Intuitive swipe-down gesture to dismiss the viewer.
- 🎨 **Deeply Customizable**: Easily control colors, opacities, and various UI elements.
- 📦 **Lightweight & Fast**: Minimal footprint with optimized dependencies.
- ⚛️ **Expo Support**: Fully compatible with Expo (Managed & Bare workflows).

## Installation

```sh
npm install react-native-pinch-viewer
# or
yarn add react-native-pinch-viewer
```

### Peer Dependencies

This package requires `react-native-gesture-handler` and `react-native-reanimated`. If you haven't installed them yet:

```sh
npm install react-native-gesture-handler react-native-reanimated
```

### 🚀 Expo Support

This library is built with standard React Native modules and works perfectly with **Expo**. Ensure you have `react-native-gesture-handler` and `react-native-reanimated` installed in your project.

> **Important**: Ensure your application is wrapped with `<GestureHandlerRootView>` (from `react-native-gesture-handler`) for gestures to work correctly.

## 💡 Why `react-native-pinch-viewer`?

Most React Native image viewers suffer from performance bottlenecks or lack of customization. `react-native-pinch-viewer` was designed from the ground up using **shared values** and **worklets** to ensure all animations run on the UI thread, providing a premium feel that rivals native applications.

## Usage

```tsx
import React, { useState } from 'react';
import { Button, SafeAreaView } from 'react-native';
import { PinchViewer } from 'react-native-pinch-viewer';

const images = [
  'https://example.com/image1.jpg',
  'https://example.com/image2.jpg',
  require('./assets/local-image.png'),
];

export default function App() {
  const [visible, setVisible] = useState(false);

  return (
    <SafeAreaView>
      <Button title="Open Gallery" onPress={() => setVisible(true)} />

      <PinchViewer
        images={images}
        visible={visible}
        onClose={() => setVisible(false)}
        enableSwipeDown={true}
        showThumbnails={true}
      />
    </SafeAreaView>
  );
}
```

## Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| **`images`** | `Array` | *Required* | Array of images (URIs, objects, or local requires). |
| **`visible`** | `boolean` | *Required* | Controls whether the viewer is shown. |
| **`onClose`** | `function` | *Required* | Callback function when the viewer is closed. |
| **`initialIndex`** | `number` | `0` | The image index to show first. |
| **`enableSwipeDown`**| `boolean` | `true` | Enable swipe-down-to-close gesture. |
| **`showIndicators`** | `boolean` | `true` | Show "current / total" text and dots. |
| **`showThumbnails`** | `boolean` | `true` | Show the thumbnail scrollbar at the bottom. |
| **`backdropOpacity`**| `number` | `0.95` | Opacity of the background (0 to 1). |
| **`imageResizeMode`**| `string` | `'contain'` | How images are resized ('contain', 'cover', etc). |

## License

MIT © [Divya Unagar](https://github.com/DivyaUnagar)
