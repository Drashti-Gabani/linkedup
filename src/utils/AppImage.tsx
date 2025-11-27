import React from 'react';
import {
  Image,
  ImageStyle,
  StyleProp,
  ImageSourcePropType,
  ImageProps,
  Animated as RNAnimated,
} from 'react-native';
import FastImage, { Source } from 'react-native-fast-image';

/**
 * AppImage - Smart wrapper component that uses FastImage for performance or Image for tintColor
 *
 * This component automatically chooses the best image component:
 * - Uses FastImage (high performance) for regular images without tintColor
 * - Uses Image (standard) when tintColor is needed (for icons)
 *
 * Supports both local images (require) and remote images (uri).
 *
 * @example
 * // Regular image - uses FastImage for performance
 * <AppImage source={{ uri: 'https://example.com/image.jpg' }} style={styles.image} />
 *
 * @example
 * // Icon with tintColor - uses Image
 * <AppImage source={require('./icon.png')} style={[styles.icon, { tintColor: '#8239FF' }]} />
 */
export interface AppImageProps extends Omit<ImageProps, 'source' | 'style'> {
  source: ImageSourcePropType | { uri: string };
  style?: StyleProp<ImageStyle>;
  resizeMode?: 'contain' | 'cover' | 'stretch' | 'center' | 'repeat';
}

// Helper to check if style contains tintColor
const hasTintColor = (style: StyleProp<ImageStyle>): boolean => {
  if (!style) return false;
  if (Array.isArray(style)) {
    return style.some(s => s && typeof s === 'object' && 'tintColor' in s);
  }
  return typeof style === 'object' && 'tintColor' in style;
};

export const AppImage: React.FC<AppImageProps> = ({
  source,
  style,
  resizeMode = 'cover',
  ...props
}) => {
  const needsTintColor = hasTintColor(style);

  // Convert source to FastImage format (always compute, but only use if needed)
  const fastImageSource: Source | number = React.useMemo(() => {
    if (typeof source === 'number') {
      return source;
    }
    if ('uri' in source) {
      return {
        uri: source.uri,
        priority: FastImage.priority.normal,
      };
    }
    return source as Source;
  }, [source]);

  // Map resizeMode to FastImage format (FastImage doesn't support 'repeat')
  const fastImageResizeMode =
    resizeMode === 'repeat'
      ? FastImage.resizeMode.cover
      : FastImage.resizeMode[resizeMode as keyof typeof FastImage.resizeMode] ||
        FastImage.resizeMode.cover;

  // Use Image when tintColor is needed, FastImage otherwise for performance
  if (needsTintColor) {
    return (
      <Image source={source} style={style} resizeMode={resizeMode} {...props} />
    );
  }

  return (
    <FastImage
      source={fastImageSource}
      style={style as any}
      resizeMode={fastImageResizeMode}
      {...(props as any)}
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
