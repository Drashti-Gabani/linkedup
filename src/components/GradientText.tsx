import React from 'react';
import { Text, TextStyle } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../hooks/useTheme';

interface GradientTextProps {
  children: React.ReactNode;
  colors?: string[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  style?: TextStyle;
}

const GradientText: React.FC<GradientTextProps> = ({
  children,
  colors: customColors,
  start = { x: 0, y: 0 },
  end = { x: 1, y: 0 },
  style,
}) => {
  const { gradients } = useTheme();
  const colors = customColors || gradients.primary;
  return (
    <MaskedView
      maskElement={
        <Text style={[style, { backgroundColor: 'transparent' }]}>
          {children}
        </Text>
      }
    >
      <LinearGradient colors={colors} start={start} end={end}>
        <Text style={[style, { opacity: 0 }]}>{children}</Text>
      </LinearGradient>
    </MaskedView>
  );
};

export default GradientText;
