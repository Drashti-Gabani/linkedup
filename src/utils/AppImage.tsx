import React from 'react';
import FastImage, { FastImageProps, Source } from 'react-native-fast-image';
import { ImageStyle, StyleProp, ImageSourcePropType, Animated as RNAnimated } from 'react-native';

/**
 * AppImage - Wrapper component for FastImage
 * 
 * This component provides a centralized way to use images throughout the app.
 * If you need to change the image library in the future, you only need to update this file.
 * 
 * Supports both local images (require) and remote images (uri).
 * 
 * @example
 * // Local image
 * <AppImage source={require('./image.png')} style={styles.image} />
 * 
 * @example
 * // Remote image
 * <AppImage source={{ uri: 'https://example.com/image.jpg' }} style={styles.image} />
 */
export interface AppImageProps extends Omit<FastImageProps, 'source' | 'style'> {
  source: ImageSourcePropType | { uri: string };
  style?: StyleProp<ImageStyle>;
  resizeMode?: 'contain' | 'cover' | 'stretch' | 'center';
}

export const AppImage: React.FC<AppImageProps> = ({
  source,
  style,
  resizeMode = 'cover',
  ...props
}) => {
  // Convert ImageSourcePropType to FastImage source format
  const fastImageSource: Source = React.useMemo(() => {
    if (typeof source === 'number') {
      // Local require() image
      return source as number;
    }
    if ('uri' in source) {
      // Remote image with uri
      return {
        uri: source.uri,
        priority: FastImage.priority.normal,
      };
    }
    // Fallback for other formats
    return source as Source;
  }, [source]);

  return (
    <FastImage
      source={fastImageSource}
      style={style}
      resizeMode={FastImage.resizeMode[resizeMode]}
      {...props}
    />
  );
};

export default AppImage;

/**
 * Animated version of AppImage for use with React Native Animated API
 * 
 * @example
 * const animatedValue = useRef(new Animated.Value(0)).current;
 * <AnimatedAppImage 
 *   source={require('./image.png')} 
 *   style={[styles.image, { opacity: animatedValue }]} 
 * />
 */
export const AnimatedAppImage = RNAnimated.createAnimatedComponent(AppImage);

