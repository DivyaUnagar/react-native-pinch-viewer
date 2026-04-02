"use strict";

/**
 * Ensures the image source is unified to the internal React Native ImageSourcePropType.
 * Supports strings (URIs), objects with URIs, and local number (require).
 */
export const getSource = img => {
  if (typeof img === 'string') return {
    uri: img
  };
  if (img && typeof img === 'object' && 'uri' in img) return img;
  return img; // For require() which returns a number (resource id)
};

/**
 * Clamps a value between a minimum and maximum.
 * Marker 'worklet' tells Reanimated it's safe to run on the UI thread.
 */
export const clamp = (value, min, max) => {
  'worklet';

  return Math.min(Math.max(value, min), max);
};
//# sourceMappingURL=index.js.map