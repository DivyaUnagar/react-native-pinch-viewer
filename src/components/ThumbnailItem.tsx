import {StyleSheet, TouchableOpacity, Image} from 'react-native';
import type {ImageSourcePropType} from 'react-native';

interface ThumbnailItemProps {
  source: ImageSourcePropType;
  isSelected: boolean;
  onPress: () => void;
}

/**
 * ThumbnailItem: A small image preview for the gallery at the bottom.
 */
export const ThumbnailItem = ({
  source,
  isSelected,
  onPress,
}: ThumbnailItemProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[styles.thumbnailButton, isSelected && styles.thumbnailSelected]}>
      <Image style={styles.thumbnailImage} source={source} resizeMode="cover" />
    </TouchableOpacity>
  );
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
    marginRight: 10,
  },
  thumbnailSelected: {
    borderColor: '#ffffff',
    opacity: 1,
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
});
