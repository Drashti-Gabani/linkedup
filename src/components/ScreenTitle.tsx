import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { wp, hp } from '../utils/responsive';

interface ScreenTitleProps {
  title: string;
  subtitle?: string;
  highlightWidth?: number;
  highlightHeight?: number;
  highlightTop?: number;
  titleSize?: 'large' | 'medium';
  containerMarginTop?: number;
  containerMarginBottom?: number;
}

const ScreenTitle: React.FC<ScreenTitleProps> = ({
  title,
  subtitle,
  highlightWidth,
  highlightHeight,
  highlightTop,
  titleSize = 'medium',
  containerMarginTop,
  containerMarginBottom,
}) => {
  const { colors, isDark } = useTheme();

  // Default values based on titleSize
  const defaultHighlightWidth = titleSize === 'large' ? 173 : 115;
  const defaultHighlightHeight = titleSize === 'large' ? 14 : 18;
  const defaultHighlightTop = titleSize === 'large' ? 21 : 14;

  const finalHighlightWidth = highlightWidth ?? defaultHighlightWidth;
  const finalHighlightHeight = highlightHeight ?? defaultHighlightHeight;
  const finalHighlightTop = highlightTop ?? defaultHighlightTop;

  const titleFontSize = titleSize === 'large' ? 40 : 26;
  const titleLineHeight = titleSize === 'large' ? 40 : undefined;

  // Default marginTop based on titleSize
  const defaultMarginTop =
    containerMarginTop !== undefined
      ? containerMarginTop
      : titleSize === 'large'
      ? 0
      : hp('8%');

  return (
    <View
      style={[
        styles.container,
        { marginTop: defaultMarginTop },
        containerMarginBottom !== undefined && {
          marginBottom: containerMarginBottom,
        },
      ]}
    >
      <View style={styles.titleContainer}>
        <Text
          style={[
            styles.title,
            { color: colors.heading, fontSize: titleFontSize },
            titleLineHeight && { lineHeight: titleLineHeight },
          ]}
        >
          {title}
        </Text>
        {!isDark && (
          <View
            style={[
              styles.highlight,
              {
                width: finalHighlightWidth,
                height: finalHighlightHeight,
                top: finalHighlightTop,
                backgroundColor: colors.backgroundSecondary,
              },
            ]}
          />
        )}
      </View>
      {subtitle && (
        <Text style={[styles.subtitle, { color: colors.subheading }]}>
          {subtitle}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: hp('3%'),
    position: 'relative',
  },
  titleContainer: {
    alignItems: 'center',
    position: 'relative',
    width: '100%',
    paddingHorizontal: wp('2%'),
  },
  title: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: 26,
    textAlign: 'center',
    flexShrink: 1,
  },
  highlight: {
    position: 'absolute',
    zIndex: -1,
  },
  subtitle: {
    fontFamily: 'Sofia Pro',
    fontWeight: '400',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
    width: wp('70%'),
  },
});

export default ScreenTitle;
