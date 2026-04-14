import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../hooks/useTheme';

export interface AppSearchBarProps extends Omit<TextInputProps, 'style'> {
  containerStyle?: StyleProp<ViewStyle>;
}

const AppSearchBar: React.FC<AppSearchBarProps> = ({
  containerStyle,
  ...rest
}) => {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.searchContainer,
        {
          backgroundColor: colors.searchBackground,
          borderColor: colors.searchBorder,
        },
        containerStyle,
      ]}
    >
      <Svg width={23} height={20} viewBox="0 0 23 20" fill="none">
        <Path
          d="M9.5 16.5C13.6421 16.5 17 13.1421 17 9C17 4.85786 13.6421 1.5 9.5 1.5C5.35786 1.5 2 4.85786 2 9C2 13.1421 5.35786 16.5 9.5 16.5Z"
          stroke={colors.searchIcon}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M21 18.5L15 13.5"
          stroke={colors.searchIcon}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
      <TextInput
        style={[styles.searchInput, { color: colors.fieldText }]}
        placeholderTextColor={colors.placeholder}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderRadius: 15,
    borderWidth: 1,
    paddingHorizontal: 23,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Sk-Modernist',
    fontSize: 14,
    lineHeight: 21,
    padding: 0,
  },
});

export default AppSearchBar;
