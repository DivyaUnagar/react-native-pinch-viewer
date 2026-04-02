import type { ImageSourcePropType } from 'react-native';
/**
 * Ensures the image source is unified to the internal React Native ImageSourcePropType.
 * Supports strings (URIs), objects with URIs, and local number (require).
 */
export declare const getSource: (img: any) => ImageSourcePropType;
/**
 * Clamps a value between a minimum and maximum.
 * Marker 'worklet' tells Reanimated it's safe to run on the UI thread.
 */
export declare const clamp: (value: number, min: number, max: number) => number;
//# sourceMappingURL=index.d.ts.map