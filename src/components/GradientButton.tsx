import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { wp } from '../utils/responsive';

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
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.button, style]}
      disabled={disabled}
    >
      <LinearGradient
        colors={disabled ? ['#CCCCCC', '#999999'] : ['#9253FF', '#8239FF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
        angle={46}
      >
        <Text style={styles.buttonText}>{text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    shadowColor: '#9253FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
    paddingHorizontal: wp('13%'),
  },
  gradient: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  buttonText: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.6,
    color: '#FFFFFF',
    paddingVertical: 16,
  },
});

export default GradientButton;
