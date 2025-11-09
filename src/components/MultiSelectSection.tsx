import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../hooks/useTheme';

/**
 * Icon configuration interface for MultiSelectSection
 * Supports both image sources and React components
 */
export interface IconConfig {
  default: any; // Image source or React component for unselected state
  selected?: any; // Image source or React component for selected state (optional)
  size?: number; // Icon size in pixels (default: 18)
}

interface MultiSelectSectionProps {
  title?: string;
  options: string[];
  selectedValues: string[];
  onSelect: (value: string) => void;
  maxSelections?: number;
  iconMap?: Record<string, IconConfig>;
  renderIcon?: (option: string, isSelected: boolean) => React.ReactNode;
}

const MultiSelectSection: React.FC<MultiSelectSectionProps> = ({
  title,
  options,
  selectedValues,
  onSelect,
  maxSelections: _maxSelections,
  iconMap,
  renderIcon,
}) => {
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  // Icon colors matching text colors from Figma design
  // Selected: white (matches selected text)
  const SELECTED_ICON_COLOR = '#FFFFFF';
  // Unselected: gray matching text color (dark mode: #B2B2B2, light mode: #C6C6C6)
  const UNSELECTED_ICON_COLOR_DARK = '#B2B2B2';
  const UNSELECTED_ICON_COLOR_LIGHT = '#C6C6C6';

  const handleSelect = (value: string) => {
    // Always call onSelect - let the parent handle the logic
    onSelect(value);
  };

  const getIcon = (
    option: string,
    isSelected: boolean,
  ): React.ReactNode | null => {
    // Priority: renderIcon function > iconMap > no icon
    if (renderIcon) {
      return renderIcon(option, isSelected);
    }

    if (iconMap && iconMap[option]) {
      const iconConfig = iconMap[option];
      const iconSource =
        isSelected && iconConfig.selected
          ? iconConfig.selected
          : iconConfig.default;
      const iconSize = iconConfig.size || 18;

      // If it's a React component, render it
      if (
        React.isValidElement(iconSource) ||
        typeof iconSource === 'function'
      ) {
        return typeof iconSource === 'function' ? iconSource() : iconSource;
      }

      // Otherwise, treat it as an image source
      // Apply tint color matching text colors: white for selected, gray for unselected
      const tintColor = isSelected
        ? SELECTED_ICON_COLOR
        : isDark
        ? UNSELECTED_ICON_COLOR_DARK
        : UNSELECTED_ICON_COLOR_LIGHT;

      return (
        <Image
          source={iconSource}
          style={[
            styles.optionIcon,
            { width: iconSize, height: iconSize },
            { tintColor },
          ]}
          resizeMode="contain"
        />
      );
    }

    return null;
  };

  return (
    <View style={styles.section}>
      {title && (
        <Text
          style={[
            styles.sectionTitle,
            { color: isDark ? '#FFFFFF' : '#000000' },
          ]}
        >
          {title}
        </Text>
      )}
      <View style={styles.optionsContainer}>
        {options.map(option => {
          const isSelected = selectedValues.includes(option);
          const icon = getIcon(option, isSelected);

          return (
            <TouchableOpacity
              key={option}
              onPress={() => handleSelect(option)}
              activeOpacity={0.7}
              style={styles.optionButton}
            >
              {isSelected ? (
                <LinearGradient
                  colors={['#A776FC', '#8239FF']}
                  start={{ x: 0.91, y: 0.05 }}
                  end={{ x: 0.15, y: 0.95 }}
                  // style={styles.optionTag}
                >
                  <View style={styles.optionTag}>
                    {icon && <View style={styles.iconContainer}>{icon}</View>}
                    <Text style={[styles.optionText, { color: '#FFFFFF' }]}>
                      {option}
                    </Text>
                  </View>
                </LinearGradient>
              ) : (
                <View
                  style={[
                    styles.optionTag,
                    {
                      backgroundColor: isDark ? '#2E2E2E' : '#FFFFFF',
                    },
                    !isDark && styles.lightShadow,
                  ]}
                >
                  <View style={styles.optionContent}>
                    {icon && <View style={styles.iconContainer}>{icon}</View>}
                    <Text
                      style={[
                        styles.optionText,
                        { color: isDark ? '#B2B2B2' : '#C6C6C6' },
                      ]}
                    >
                      {option}
                    </Text>
                  </View>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 16,
    alignItems: 'center',
  },
  sectionTitle: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.32,
    marginBottom: 12,
    textAlign: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    justifyContent: 'flex-start',
  },
  optionTag: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 10,
    gap: 14,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionIcon: {
    width: 18,
    height: 18,
  },
  lightShadow: {
    shadowColor: '#A4A4A4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 75,
    elevation: 5,
  },
  optionText: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.32,
  },
  optionButton: {
    overflow: 'hidden',
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default MultiSelectSection;
