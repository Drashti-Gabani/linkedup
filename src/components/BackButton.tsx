import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import { hp, wp } from '../utils/responsive';
import { useTheme } from '../hooks/useTheme';

interface BackButtonProps {
  onPress: () => void;
  size?: 'small' | 'medium' | 'large';
  style?: any;
}

const BackButton: React.FC<BackButtonProps> = ({
  onPress,
  size = 'medium',
  style,
}) => {
  const { gradients, colors } = useTheme();

  const getSize = () => {
    switch (size) {
      case 'small':
        return { width: 40, height: 40, radius: 20, iconSize: 20 };
      case 'large':
        return { width: 56, height: 56, radius: 28, iconSize: 24 };
      case 'medium':
      default:
        return { width: 48, height: 48, radius: 24, iconSize: 15 };
    }
  };

  const sizeConfig = getSize();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { width: sizeConfig.width, height: sizeConfig.height },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <LinearGradient
        colors={gradients.secondary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        angle={242}
        style={[
          styles.gradient,
          {
            width: sizeConfig.width,
            height: sizeConfig.height,
            borderRadius: sizeConfig.radius,
          },
        ]}
      >
        <Svg
          width={sizeConfig.iconSize}
          height={sizeConfig.iconSize}
          viewBox="0 0 13 13"
          fill="none"
        >
          <Path
            d="M11.6207 6.31026L0.999977 6.31026M0.999977 6.31026L6.31032 11.6206M0.999977 6.31026L6.31032 0.999916"
            stroke={colors.iconSelected}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: hp('2%'), // ~5.1% from top (46/896 = 5.13%)
    left: wp('6.5%'), // ~6.5% from left (27/414 = 6.52%)
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BackButton;
