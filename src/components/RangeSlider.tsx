import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import {
  PanGestureHandler,
  GestureHandlerRootView,
  State,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerStateChangeEvent,
} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../hooks/useTheme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SLIDER_WIDTH = SCREEN_WIDTH - 46; // Account for padding

interface RangeSliderProps {
  min: number;
  max: number;
  value: { min: number; max: number };
  onValueChange: (value: { min: number; max: number }) => void;
  step?: number;
  minRange?: number;
  label?: string;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  min,
  max,
  value,
  onValueChange,
  step = 1,
  minRange = 1,
  label,
}) => {
  const { colors, gradients } = useTheme();
  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);
  const panRef = useRef(null);
  const initialPositionRef = useRef<{ min: number; max: number } | null>(null);

  const getPosition = (val: number) => {
    return ((val - min) / (max - min)) * SLIDER_WIDTH;
  };

  const getValue = (position: number) => {
    const ratio = position / SLIDER_WIDTH;
    const val = min + ratio * (max - min);
    return Math.round(val / step) * step;
  };

  const handleGestureEvent = (
    event: PanGestureHandlerGestureEvent,
    thumb: 'min' | 'max',
  ) => {
    if (isDragging !== thumb || !initialPositionRef.current) return;

    const { translationX } = event.nativeEvent;
    const initialPos =
      thumb === 'min'
        ? initialPositionRef.current.min
        : initialPositionRef.current.max;

    const newPosition = Math.max(
      0,
      Math.min(SLIDER_WIDTH, initialPos + translationX),
    );
    const newValue = getValue(newPosition);

    if (thumb === 'min') {
      const newMin = Math.max(min, Math.min(newValue, value.max - minRange));
      onValueChange({ ...value, min: newMin });
    } else {
      const newMax = Math.min(max, Math.max(newValue, value.min + minRange));
      onValueChange({ ...value, max: newMax });
    }
  };

  const handleStateChange = (
    event: PanGestureHandlerStateChangeEvent,
    thumb: 'min' | 'max',
  ) => {
    const { state } = event.nativeEvent;

    if (state === State.BEGAN) {
      setIsDragging(thumb);
      // Store initial positions when gesture begins
      initialPositionRef.current = {
        min: getPosition(value.min),
        max: getPosition(value.max),
      };
    } else if (state === State.END || state === State.CANCELLED) {
      setIsDragging(null);
      initialPositionRef.current = null;
    }
  };

  const minPosition = getPosition(value.min);
  const maxPosition = getPosition(value.max);

  return (
    <GestureHandlerRootView style={styles.container}>
      {label && (
        <Text style={[styles.label, { color: colors.heading }]}>{label}</Text>
      )}

      <View style={styles.rangeLabels}>
        <View style={styles.rangeLabel}>
          <View
            style={[
              styles.rangeLabelBox,
              { backgroundColor: colors.backgroundSecondary },
            ]}
          >
            <Text style={[styles.rangeLabelText, { color: colors.accent }]}>
              {value.min}
            </Text>
          </View>
          <View
            style={[
              styles.rangeLabelArrow,
              { borderTopColor: colors.backgroundSecondary },
            ]}
          />
        </View>
        <View style={styles.rangeLabel}>
          <View
            style={[
              styles.rangeLabelBox,
              { backgroundColor: colors.backgroundSecondary },
            ]}
          >
            <Text style={[styles.rangeLabelText, { color: colors.accent }]}>
              {value.max}
            </Text>
          </View>
          <View
            style={[
              styles.rangeLabelArrow,
              { borderTopColor: colors.backgroundSecondary },
            ]}
          />
        </View>
      </View>

      <View style={styles.sliderContainer}>
        <View style={styles.sliderTrack}>
          <View
            style={[
              styles.sliderTrackInactive,
              { backgroundColor: colors.sliderTrack },
            ]}
          />
          <LinearGradient
            colors={gradients.primary}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[
              styles.sliderTrackActive,
              {
                left: minPosition,
                width: maxPosition - minPosition,
              },
            ]}
          />

          <PanGestureHandler
            ref={panRef}
            onGestureEvent={event => handleGestureEvent(event, 'min')}
            onHandlerStateChange={event => handleStateChange(event, 'min')}
            minDist={0}
            activeOffsetX={[-5, 5]}
            failOffsetY={[-10, 10]}
          >
            <View
              style={[
                styles.sliderThumb,
                { left: minPosition },
                isDragging === 'min' && styles.sliderThumbActive,
              ]}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <LinearGradient
                colors={gradients.primary}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.sliderThumbGradient}
              />
            </View>
          </PanGestureHandler>

          <PanGestureHandler
            onGestureEvent={event => handleGestureEvent(event, 'max')}
            onHandlerStateChange={event => handleStateChange(event, 'max')}
            minDist={0}
            activeOffsetX={[-5, 5]}
            failOffsetY={[-10, 10]}
          >
            <View
              style={[
                styles.sliderThumb,
                { left: maxPosition },
                isDragging === 'max' && styles.sliderThumbActive,
              ]}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <LinearGradient
                colors={gradients.primary}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.sliderThumbGradient}
              />
            </View>
          </PanGestureHandler>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
  },
  label: {
    fontFamily: 'Comfortaa-Medium',
    fontSize: 18,
    lineHeight: 20.07,
    letterSpacing: -0.54,
    marginBottom: 11,
  },
  rangeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 58,
    marginBottom: 6,
  },
  rangeLabel: {
    alignItems: 'center',
  },
  rangeLabelBox: {
    borderRadius: 3,
    paddingVertical: 4,
    paddingHorizontal: 6,
    minWidth: 28,
    alignItems: 'center',
  },
  rangeLabelText: {
    fontFamily: 'Sofia Pro',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 14,
    letterSpacing: -0.42,
  },
  rangeLabelArrow: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 3.5,
    borderRightWidth: 3.5,
    borderTopWidth: 5,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    marginTop: -1,
  },
  sliderContainer: {
    position: 'relative',
  },
  sliderTrack: {
    position: 'relative',
    height: 4,
    width: SLIDER_WIDTH,
    borderRadius: 2,
    marginVertical: 15,
  },
  sliderTrackInactive: {
    position: 'absolute',
    width: '100%',
    height: 4,
    borderRadius: 2,
  },
  sliderTrackActive: {
    position: 'absolute',
    height: 4,
    borderRadius: 2,
  },
  sliderThumb: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    top: -8.5,
    left: -10,
  },
  sliderThumbActive: {
    transform: [{ scale: 1.2 }],
  },
  sliderThumbGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});

export default RangeSlider;
