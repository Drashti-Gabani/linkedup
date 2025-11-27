import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { wp } from '../utils/responsive';
import { useTheme } from '../hooks/useTheme';

interface GradientButtonProps {
  onPress: () => void;
  text: string;
  style?: ViewStyle;
  disabled?: boolean;
}

const GradientButton: React.FC<GradientButtonProps> = ({
  onPress,
  text,
  style,
  disabled = false,
}) => {
  const { gradients, colors } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.button, style]}
      disabled={disabled}
    >
      <LinearGradient
        colors={disabled ? gradients.disabled : gradients.primary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
        angle={46}
      >
        <Text style={[styles.buttonText, { color: colors.iconSelected }]}>
          {text}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    paddingHorizontal: wp('13%'),
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  gradient: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  buttonText: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: 20,
    includeFontPadding: false,
    paddingVertical: 16,
  },
});

export default GradientButton;
