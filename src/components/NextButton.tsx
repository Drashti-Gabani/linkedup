import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import Svg, { Path } from 'react-native-svg';
import { hp, wp } from '../utils/responsive';

interface NextButtonProps {
  onPress: () => void;
  showText?: boolean;
  size?: 'small' | 'medium' | 'large';
  textLabel?: string;
  style?: any;
}

const NextButton: React.FC<NextButtonProps> = ({
  onPress,
  showText = true,
  size = 'medium',
  textLabel = 'Next',
  style,
}) => {
  const getSize = () => {
    switch (size) {
      case 'small':
        return {
          arrowWidth: 40,
          arrowHeight: 40,
          arrowRadius: 20,
          arrowIconSize: 20,
        };
      case 'large':
        return {
          arrowWidth: 56,
          arrowHeight: 56,
          arrowRadius: 28,
          arrowIconSize: 24,
        };
      case 'medium':
      default:
        return {
          arrowWidth: 48,
          arrowHeight: 48,
          arrowRadius: 24,
          arrowIconSize: 15,
        };
    }
  };

  const sizeConfig = getSize();

  return (
    <View style={[styles.container, style]}>
      {showText && (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
          <MaskedView
            maskElement={<Text style={styles.textMask}>{textLabel}</Text>}
          >
            <LinearGradient
              colors={['#A776FC', '#8239FF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradient}
            >
              <Text style={[styles.text, { opacity: 0 }]}>{textLabel}</Text>
            </LinearGradient>
          </MaskedView>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        style={{
          width: sizeConfig.arrowWidth,
          height: sizeConfig.arrowHeight,
        }}
      >
        <LinearGradient
          colors={['#A776FC', '#8239FF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          angle={242}
          style={[
            styles.arrowButton,
            {
              width: sizeConfig.arrowWidth,
              height: sizeConfig.arrowHeight,
              borderRadius: sizeConfig.arrowRadius,
            },
          ]}
        >
          <Svg
            width={sizeConfig.arrowIconSize}
            height={sizeConfig.arrowIconSize}
            viewBox="0 0 13 13"
            fill="none"
          >
            <Path
              d="M1 6.31034H11.6207M11.6207 6.31034L6.31034 1M11.6207 6.31034L6.31034 11.6207"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: hp('5%'),
    right: wp('6%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 12,
  },
  textMask: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.66,
    backgroundColor: 'transparent',
  },
  gradient: {
    paddingVertical: 2,
  },
  text: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.66,
  },
  arrowButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NextButton;
