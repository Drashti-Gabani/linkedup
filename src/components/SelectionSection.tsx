import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Path, Circle } from 'react-native-svg';
import { useTheme } from '../hooks/useTheme';

/**
 * Icon configuration interface for SelectionSection
 * Supports both image sources and React components
 */
export interface IconConfig {
  default: any; // Image source or React component for unselected state
  selected?: any; // Image source or React component for selected state (optional)
  size?: number; // Icon size in pixels (default: 18)
}

/**
 * SelectionSection Component
 *
 * A reusable selection component with optional icon support.
 * Icons are automatically tinted:
 * - Default/Unselected: Primary color (#8239FF)
 * - Selected: White (#FFFFFF) - works in both light and dark modes
 *
 * @example
 * ```tsx
 * <SelectionSection
 *   title="I am"
 *   options={['Male', 'Female', 'Non Binary']}
 *   selectedValue={selectedGender}
 *   onSelect={handleSelect}
 *   iconMap={genderIcons}
 * />
 * ```
 */
export interface SelectionSectionProps {
  title: string;
  options: string[];
  selectedValue: string | null;
  onSelect: (value: string) => void;
  renderIcon?: (option: string, isSelected: boolean) => React.ReactNode;
  iconMap?: Record<string, IconConfig>;
}

const SelectionSection: React.FC<SelectionSectionProps> = ({
  title,
  options,
  selectedValue,
  onSelect,
  renderIcon,
  iconMap,
}) => {
  const { colors, gradients } = useTheme();

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
      // Apply tint color: primary for default, white for selected
      return (
        <Image
          source={iconSource}
          style={[
            styles.optionIcon,
            { width: iconSize, height: iconSize },
            {
              tintColor: isSelected ? colors.iconSelected : colors.iconPrimary,
            },
          ]}
          resizeMode="contain"
        />
      );
    }

    return null;
  };

  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: colors.sectionTitle }]}>
        {title}
      </Text>
      <View style={styles.optionsContainer}>
        {options.map(option => {
          const isSelected = selectedValue === option;
          const icon = getIcon(option, isSelected);

          return (
            <TouchableOpacity
              key={option}
              style={styles.optionButton}
              onPress={() => onSelect(option)}
              activeOpacity={0.7}
            >
              <LinearGradient
                colors={
                  isSelected ? gradients.secondary : [colors.card, colors.card]
                }
                start={{ x: 0.9, y: 0.1 }}
                end={{ x: 0.1, y: 0.9 }}
                style={[
                  !isSelected && [
                    styles.lightShadow,
                    { shadowColor: colors.shadowMedium },
                  ],
                ]}
              >
                <View style={styles.optionGradient}>
                  {icon && <View style={styles.iconContainer}>{icon}</View>}
                  <Text
                    style={[
                      styles.optionLabel,
                      {
                        color: isSelected
                          ? colors.iconSelected
                          : colors.textSecondary,
                      },
                    ]}
                  >
                    {option}
                  </Text>
                  {isSelected && (
                    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                      <Circle
                        cx="12"
                        cy="12"
                        r="11"
                        fill={colors.iconSelected}
                      />
                      <Path
                        d="M7 12L10.5 15.5L17 9"
                        stroke={colors.iconPrimary}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </Svg>
                  )}
                </View>
              </LinearGradient>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 32,
    alignItems: 'center',
  },
  sectionTitle: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: 20,
    letterSpacing: -0.4,
    marginBottom: 16,
  },
  optionsContainer: {
    width: '100%',
    gap: 10,
  },
  optionButton: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  optionGradient: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 18,
  },
  iconContainer: {
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionIcon: {
    width: 18,
    height: 18,
  },
  lightShadow: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 2,
  },
  optionLabel: {
    fontFamily: 'Sofia Pro',
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
});

export default SelectionSection;
