import React from 'react';
import { View, ViewStyle, StyleProp, ImageSourcePropType } from 'react-native';
import FastImage, { FastImageProps, Source } from 'react-native-fast-image';
import { AppImage } from './AppImage';

/**
 * AppImageBackground - Wrapper component for ImageBackground using FastImage
 * 
 * This component provides a centralized way to use image backgrounds throughout the app.
 * If you need to change the image library in the future, you only need to update this file.
 * 
 * Supports both local images (require) and remote images (uri).
 * 
 * @example
 * // Local image background
 * <AppImageBackground 
 *   source={require('./bg.png')} 
 *   style={styles.container}
 *   imageStyle={styles.backgroundImage}
 * >
 *   <Text>Content on top of image</Text>
 * </AppImageBackground>
 * 
 * @example
 * // Remote image background
 * <AppImageBackground 
 *   source={{ uri: 'https://example.com/bg.jpg' }} 
 *   style={styles.container}
 * >
 *   <Text>Content on top of image</Text>
 * </AppImageBackground>
 */
export interface AppImageBackgroundProps {
  source: ImageSourcePropType | { uri: string };
  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ViewStyle>;
  resizeMode?: 'contain' | 'cover' | 'stretch' | 'center';
  children?: React.ReactNode;
}

export const AppImageBackground: React.FC<AppImageBackgroundProps> = ({
  source,
  style,
  imageStyle,
  resizeMode = 'cover',
  children,
}) => {
  return (
    <View style={style}>
      <AppImage
        source={source}
        style={[
          {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          },
          imageStyle,
        ]}
        resizeMode={resizeMode}
      />
      {children}
    </View>
  );
};

export default AppImageBackground;

