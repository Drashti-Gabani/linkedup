import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../hooks/useTheme';
import { hp, wp } from '../utils/responsive';

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
  const { isDark, colors, gradients } = useTheme();

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
      // Use consistent icon size (18px) to ensure uniform block sizing
      const iconSize = 18;

      // If it's a React component, render it
      if (
        React.isValidElement(iconSource) ||
        typeof iconSource === 'function'
      ) {
        return typeof iconSource === 'function' ? iconSource() : iconSource;
      }

      // Otherwise, treat it as an image source
      // Apply tint color: white for selected, primary purple for unselected (as per Figma)
      const tintColor = isSelected ? colors.iconSelected : colors.iconPrimary;

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
        <Text style={[styles.sectionTitle, { color: colors.sectionTitle }]}>
          {title}
        </Text>
      )}
      <View style={styles.optionsContainer}>
        {options.map(option => {
          const isSelected = selectedValues.includes(option);
          const icon = getIcon(option, isSelected);

          // Compute unselected container style to avoid inline style warning
          const unselectedContainerStyle = {
            backgroundColor: isDark ? colors.card : colors.background,
            borderWidth: isDark ? 0 : 1,
            borderColor: isDark ? 'transparent' : colors.searchBorder,
            shadowOpacity: isDark ? 0.2 : 0.3,
            shadowColor: colors.shadowLight,
            shadowRadius: isDark ? 75 : 6,
            shadowOffset: { width: 0, height: isDark ? 4 : 3 },
            elevation: isDark ? 4 : 5,
          };

          // Compute selected gradient style
          const selectedGradientStyle = {
            borderWidth: isDark ? 0 : 1,
            borderColor: 'transparent',
            shadowColor: colors.shadowPink,
          };

          // Compute text color
          const textColor = isSelected
            ? colors.iconSelected
            : isDark
            ? colors.textDisabled
            : colors.textSecondary;

          return (
            <TouchableOpacity
              key={option}
              onPress={() => handleSelect(option)}
              activeOpacity={0.7}
              style={styles.optionButton}
            >
              {isSelected ? (
                <LinearGradient
                  colors={gradients.secondary}
                  start={{ x: 0.8, y: 0 }}
                  end={{ x: 0.2, y: 1 }}
                  style={[styles.selectedGradient, selectedGradientStyle]}
                >
                  <View style={styles.optionTag}>
                    {icon && <View style={styles.iconContainer}>{icon}</View>}
                    <Text
                      style={[styles.optionText, { color: textColor }]}
                      numberOfLines={1}
                    >
                      {option}
                    </Text>
                  </View>
                </LinearGradient>
              ) : (
                <View
                  style={[styles.unselectedContainer, unselectedContainerStyle]}
                >
                  <View style={styles.optionTag}>
                    {icon && <View style={styles.iconContainer}>{icon}</View>}
                    <Text
                      style={[styles.optionText, { color: textColor }]}
                      numberOfLines={1}
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
    marginBottom: 12,
    textAlign: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'flex-start',
  },
  optionButton: {
    overflow: 'hidden',
    borderRadius: 10,
  },
  selectedGradient: {
    borderRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 75,
    elevation: 8,
  },
  unselectedContainer: {
    borderRadius: 10,
  },
  optionTag: {
    flexDirection: 'row',
    paddingVertical: hp(1.7),
    paddingHorizontal: wp(7),
    borderRadius: 10,
    gap: 14,
    alignItems: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionIcon: {
    // Icons will size naturally based on their content
  },
  optionText: {
    fontFamily: 'Sofia Pro',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: -0.32,
    flexShrink: 0,
  },
});

export default MultiSelectSection;
