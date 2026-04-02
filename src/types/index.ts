import type { ImageSourcePropType, ViewStyle, ImageStyle } from 'react-native';

export interface PinchViewerProps {
  /**
   * Array of images to display. Each item can be a URI string, an object with { uri }, or a local require().
   */
  images: (ImageSourcePropType | { uri: string } | string)[];

  /**
   * The initial image index to show.
   * @default 0
   */
  initialIndex?: number;

  /**
   * Controls the visibility of the viewer modal.
   */
  visible: boolean;

  /**
   * Callback when the viewer is closed.
   */
  onClose: () => void;

  /**
   * Enable swipe-down-to-close gesture.
   * @default true
   */
  enableSwipeDown?: boolean;

  /**
   * Show "x / y" image indicator.
   * @default true
   */
  showIndicators?: boolean;

  /**
   * Show thumbnail gallery at the bottom.
   * @default true
   */
  showThumbnails?: boolean;

  /**
   * Opacity of the backdrop (0 to 1).
   * @default 0.95
   */
  backdropOpacity?: number;

  /**
   * Image resize mode.
   * @default 'contain'
   */
  imageResizeMode?: 'contain' | 'cover' | 'stretch' | 'center';

  /**
   * Optional custom styles for the container.
   */
  containerStyle?: ViewStyle;

  /**
   * Optional custom styles for the images.
   */
  imageStyle?: ImageStyle;
}

export interface ImageItemProps {
  source: ImageSourcePropType;
  onSwipeDownClose?: () => void;
  enableSwipeDown?: boolean;
  setIsZooming: (isZooming: boolean) => void;
  resizeMode?: 'contain' | 'cover' | 'stretch' | 'center';
}
