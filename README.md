# react-native-pinch-viewer

A highly customizable, production-ready React Native image gallery and pinch-to-zoom viewer. Built with **React Native Gesture Handler** and **Reanimated** for 60fps performance.

![npm version](https://img.shields.io/npm/v/react-native-pinch-viewer)
![license](https://img.shields.io/npm/l/react-native-pinch-viewer)
![platform](https://img.shields.io/badge/platform-ios%20%7C%20android-lightgrey)

## Features

- 🚀 **Performant**: Smooth 60fps animations using Reanimated 3.
- pinch **Pinch-to-Zoom**: Intuitive pinch gestures to explore image details.
- hand **Pan & Drag**: Seamless panning when zoomed in.
- 📱 **Gallery Support**: Built-in horizontal swiping for multiple images.
- 🖼️ **Thumbnails**: Optional thumbnail gallery for quick navigation.
- ⬇️ **Swipe-to-Close**: Modern swipe-down-to-dismiss gesture.
- 🎨 **Customizable**: Control colors, opacities, and UI elements easily.
- 📦 **Lightweight**: Minimal dependencies and small bundle size.

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

> **Note**: Don't forget to wrap your app with `<GestureHandlerRootView>`!

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
