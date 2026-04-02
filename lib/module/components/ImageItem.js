"use strict";

import { useState } from 'react';
import { StyleSheet, View, Image, Dimensions, ActivityIndicator } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS, interpolate, Extrapolation } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { clamp } from "../utils/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT
} = Dimensions.get('window');

/**
 * ImageItem component that manages gestures for a single image:
 * - Pinch-to-zoom
 * - Pan (when zoomed)
 * - Swipe-down-to-close
 * - Double-tap to zoom in/out
 */
export const ImageItem = ({
  source,
  onSwipeDownClose,
  enableSwipeDown,
  setIsZooming,
  resizeMode = 'contain'
}) => {
  const [loading, setLoading] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isPinching, setIsPinching] = useState(false);
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);
  const resetState = () => {
    'worklet';

    scale.value = withTiming(1);
    translateX.value = withTiming(0);
    translateY.value = withTiming(0);
    savedScale.value = 1;
    savedTranslateX.value = 0;
    savedTranslateY.value = 0;
    runOnJS(setIsZooming)(false);
    runOnJS(setIsZoomed)(false);
  };
  const pinch = Gesture.Pinch().onBegin(() => {
    runOnJS(setIsZooming)(true);
    runOnJS(setIsPinching)(true);
  }).onUpdate(event => {
    scale.value = Math.max(0.5, savedScale.value * event.scale);
  }).onEnd(() => {
    if (scale.value <= 1) {
      resetState();
    } else {
      savedScale.value = scale.value;
      const maxTx = (SCREEN_WIDTH * scale.value - SCREEN_WIDTH) / 2;
      const maxTy = (SCREEN_HEIGHT * scale.value - SCREEN_HEIGHT) / 2;
      translateX.value = withTiming(clamp(translateX.value, -maxTx, maxTx));
      translateY.value = withTiming(clamp(translateY.value, -maxTy, maxTy));
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
      runOnJS(setIsZoomed)(true);
    }
    runOnJS(setIsPinching)(false);
  });
  const pan = Gesture.Pan().maxPointers(1).onUpdate(event => {
    if (scale.value > 1) {
      const maxTx = (SCREEN_WIDTH * scale.value - SCREEN_WIDTH) / 2;
      const maxTy = (SCREEN_HEIGHT * scale.value - SCREEN_HEIGHT) / 2;
      translateX.value = clamp(savedTranslateX.value + event.translationX, -maxTx, maxTx);
      translateY.value = clamp(savedTranslateY.value + event.translationY, -maxTy, maxTy);
    } else if (enableSwipeDown && scale.value === 1) {
      if (event.translationY > 0) {
        translateY.value = event.translationY;
        const newScale = interpolate(event.translationY, [0, SCREEN_HEIGHT / 2], [1, 0.8], Extrapolation.CLAMP);
        scale.value = newScale;
      }
    }
  }).onEnd(() => {
    if (scale.value > 1) {
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    } else if (enableSwipeDown && translateY.value > 100) {
      if (onSwipeDownClose) runOnJS(onSwipeDownClose)();
    } else {
      resetState();
    }
  });

  // Enable PAN only when zooming/zoomed or swipe-down is enabled.
  const isPanEnabled = isZoomed || isPinching || !!enableSwipeDown;
  const configuredPan = pan.enabled(isPanEnabled).activeOffsetX([-20, 20]).activeOffsetY([-20, 20]).failOffsetX([-40, 40]);
  const doubleTap = Gesture.Tap().numberOfTaps(2).maxDelay(250).onEnd(() => {
    if (scale.value !== 1) {
      resetState();
    } else {
      scale.value = withTiming(2.5);
      savedScale.value = 2.5;
      runOnJS(setIsZooming)(true);
      runOnJS(setIsZoomed)(true);
    }
  });
  const composed = Gesture.Simultaneous(pinch, configuredPan, Gesture.Exclusive(doubleTap));
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{
      translateX: translateX.value
    }, {
      translateY: translateY.value
    }, {
      scale: scale.value
    }]
  }));
  return /*#__PURE__*/_jsx(View, {
    style: styles.imageContainer,
    children: /*#__PURE__*/_jsx(GestureDetector, {
      gesture: composed,
      children: /*#__PURE__*/_jsxs(Animated.View, {
        style: [styles.imageWrapper, animatedStyle],
        pointerEvents: "box-none",
        children: [/*#__PURE__*/_jsx(Image, {
          source: source,
          style: styles.image,
          resizeMode: resizeMode,
          onLoadStart: () => setLoading(true),
          onLoadEnd: () => setLoading(false)
        }), loading && /*#__PURE__*/_jsx(ActivityIndicator, {
          style: styles.loader,
          size: "large",
          color: "#ffffff",
          pointerEvents: "none"
        })]
      })
    })
  });
};
const styles = StyleSheet.create({
  imageContainer: {
    width: SCREEN_WIDTH,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageWrapper: {
    width: SCREEN_WIDTH,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  loader: {
    position: 'absolute'
  }
});
//# sourceMappingURL=ImageItem.js.map