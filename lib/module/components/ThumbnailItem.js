"use strict";

import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { jsx as _jsx } from "react/jsx-runtime";
/**
 * ThumbnailItem: A small image preview for the gallery at the bottom.
 */
export const ThumbnailItem = ({
  source,
  isSelected,
  onPress
}) => {
  return /*#__PURE__*/_jsx(TouchableOpacity, {
    onPress: onPress,
    activeOpacity: 0.7,
    style: [styles.thumbnailButton, isSelected && styles.thumbnailSelected],
    children: /*#__PURE__*/_jsx(Image, {
      style: styles.thumbnailImage,
      source: source,
      resizeMode: "cover"
    })
  });
};
const styles = StyleSheet.create({
  thumbnailButton: {
    width: 50,
    height: 50,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
    opacity: 0.5,
    marginRight: 10
  },
  thumbnailSelected: {
    borderColor: '#ffffff',
    opacity: 1
  },
  thumbnailImage: {
    width: '100%',
    height: '100%'
  }
});
//# sourceMappingURL=ThumbnailItem.js.map