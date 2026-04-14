import React, { useRef, forwardRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextInputProps,
  TextStyle,
  StyleProp,
} from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { wp, hp } from '../utils/responsive';
import CheckmarkIcon from './icons/CheckmarkIcon';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface AppTextInputProps extends Omit<TextInputProps, 'style'> {
  /** Optional raw style for the underlying TextInput (useful for variant='unstyled') */
  style?: StyleProp<TextStyle>;

  /** Floating label displayed above the input box */
  label?: string;

  /** Error message shown in red below the input. Also turns border red. */
  error?: string;

  /** Icon rendered on the left side of the input */
  leftIcon?: React.ReactNode;

  /**
   * Custom element rendered on the right side of the input row.
   * Use this for password visibility toggles, clear buttons, etc.
   * When provided, the automatic checkmark is hidden.
   */
  rightElement?: React.ReactNode;

  /** When true shows the green checkmark on the right (ignored when rightElement is set) */
  showCheckmark?: boolean;

  /** Whether the input is currently focused (for controlled focus styling) */
  isFocused?: boolean;

  /** Extra style applied to the outer container (label + input + error) */
  containerStyle?: ViewStyle;

  /** Extra style applied to the inner input row wrapper */
  inputWrapperStyle?: ViewStyle;

  /** When true renders a multiline textarea-style input */
  multiline?: boolean;

  /** Allows rendering just a pure TextInput without formatting wrappers */
  variant?: 'default' | 'unstyled';
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
const AppTextInput = forwardRef<TextInput, AppTextInputProps>(
  (
    {
      label,
      error,
      leftIcon,
      rightElement,
      showCheckmark,
      isFocused,
      containerStyle,
      inputWrapperStyle,
      multiline = false,
      variant = 'default',
      style,
      onFocus,
      onBlur,
      ...rest
    },
    ref,
  ) => {
    const backupRef = useRef<TextInput>(null);
    const inputRef = (ref as any) || backupRef;
    const { colors, isDark } = useTheme();

    if (variant === 'unstyled') {
      return (
        <TextInput
          ref={inputRef}
          style={[{ color: colors.textPrimary }, style]}
          placeholderTextColor={colors.placeholder}
          multiline={multiline}
          onFocus={onFocus}
          onBlur={onBlur}
          {...rest}
        />
      );
    }

    // ── Border style resolution ──────────────────────────────────────────────
    const getBorderStyle = (): ViewStyle => {
      if (error) {
        return { borderWidth: 1.5, borderColor: ERROR_COLOR };
      }
      if (isFocused) {
        return { borderWidth: 1.5, borderColor: colors.accent };
      }
      if (!isDark) {
        return { borderWidth: 1, borderColor: colors.borderLight };
      }
      return {};
    };

    const wrapperStyle: ViewStyle[] = [
      multiline ? styles.multilineWrapper : styles.inputWrapper,
      { backgroundColor: colors.fieldBackground },
      getBorderStyle(),
      inputWrapperStyle ?? {},
    ];

    return (
      <TouchableOpacity
        style={[styles.container, containerStyle]}
        activeOpacity={1}
        onPress={() => inputRef.current?.focus()}
      >
        {/* Floating label */}
        {label ? (
          <Text style={[styles.label, { color: colors.accentTertiary }]}>
            {label}
          </Text>
        ) : null}

        {/* Input row */}
        <View style={wrapperStyle}>
          {/* Left icon */}
          {leftIcon ? (
            <View style={multiline ? styles.iconTopAligned : styles.iconCenter}>
              {leftIcon}
            </View>
          ) : null}

          {/* TextInput */}
          <TextInput
            ref={inputRef}
            style={[
              multiline ? styles.multilineInput : styles.input,
              { color: colors.textPrimary },
            ]}
            placeholderTextColor={colors.placeholder}
            multiline={multiline}
            onFocus={onFocus}
            onBlur={onBlur}
            {...rest}
          />

          {/* Right element (e.g. eye icon for password) — takes priority */}
          {rightElement ? rightElement : null}

          {/* Checkmark — single-line only, hidden when rightElement provided */}
          {!multiline && !rightElement && showCheckmark ? (
            <CheckmarkIcon width={10} height={8} />
          ) : null}

          {/* Checkmark for multiline — absolutely positioned top-right */}
          {multiline && showCheckmark ? (
            <View style={styles.multilineCheckmark}>
              <CheckmarkIcon width={10} height={8} />
            </View>
          ) : null}
        </View>

        {/* Error message */}
        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : null}
      </TouchableOpacity>
    );
  },
);

AppTextInput.displayName = 'AppTextInput';


// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const ERROR_COLOR = '#FF4D4D';

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },

  // Floating label
  label: {
    fontFamily: 'Comfortaa-Regular',
    fontSize: 11,
    textTransform: 'uppercase',
    position: 'absolute',
    top: 0,
    left: 17,
    zIndex: 1,
  },

  // Single-line wrapper
  inputWrapper: {
    marginTop: 24,
    height: 48,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    gap: 14,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },

  // Multiline wrapper
  multilineWrapper: {
    marginTop: 24,
    minHeight: 100,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 14,
    gap: 14,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
    position: 'relative',
  },

  // Icon alignment helpers
  iconCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconTopAligned: {
    paddingTop: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  // Single-line input text
  input: {
    fontFamily: 'Comfortaa-SemiBold',
    fontSize: 16,
    lineHeight: 20,
    paddingVertical: 0,
    flex: 1,
  },

  // Multiline input text
  multilineInput: {
    fontFamily: 'Comfortaa-SemiBold',
    fontSize: 16,
    lineHeight: 20,
    paddingVertical: 0,
    paddingTop: 0,
    flex: 1,
    minHeight: 72,
    maxHeight: 120,
  },

  // Checkmark position in multiline
  multilineCheckmark: {
    position: 'absolute',
    top: 14,
    right: 18,
  },

  // Error message
  errorText: {
    fontFamily: 'Comfortaa-Regular',
    fontSize: wp('3.2%'),
    color: ERROR_COLOR,
    marginTop: hp('0.7%'),
    paddingLeft: 4,
  },
});

export default AppTextInput;
