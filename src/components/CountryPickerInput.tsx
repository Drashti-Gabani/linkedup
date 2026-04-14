import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CountryPicker, {
  Country,
  CountryCode,
} from 'react-native-country-picker-modal';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../hooks/useTheme';
import { wp, hp } from '../utils/responsive';

// ---------------------------------------------------------------------------
// Helper – convert a CountryCode to a flag emoji
// ---------------------------------------------------------------------------
const getFlagEmoji = (code: CountryCode): string => {
  return code
    .toUpperCase()
    .split('')
    .map(c => String.fromCodePoint(127397 + c.charCodeAt(0)))
    .join('');
};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type CountryPickerVariant = 'phone' | 'country' | 'currency';

export interface CountryPickerInputProps {
  /** Visual style of the picker trigger */
  variant: CountryPickerVariant;

  /** Current ISO 3166-1 alpha-2 country code (e.g. 'IN') */
  countryCode: CountryCode;

  /** Full country object (optional – used by phone/currency variants) */
  country?: Country | null;

  /** Called when the user selects a country */
  onSelect: (country: Country) => void;

  /**
   * When true the trigger is non-interactive and the picker never opens.
   * Use this to lock India as the only option until worldwide release.
   */
  disabled?: boolean;

  /** Extra styles applied to the trigger container */
  style?: ViewStyle;

  /** Country picker modal theme overrides */
  pickerTheme?: object;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
const CountryPickerInput: React.FC<CountryPickerInputProps> = ({
  variant,
  countryCode,
  country,
  onSelect,
  disabled = false,
  style,
  pickerTheme,
}) => {
  const { colors, gradients } = useTheme();
  const [visible, setVisible] = useState(false);

  const openPicker = () => {
    if (!disabled) {
      setVisible(true);
    }
  };

  const handleSelect = (selected: Country) => {
    setVisible(false);
    onSelect(selected);
  };

  // ── Derived display values ────────────────────────────────────────────────
  const flagEmoji = getFlagEmoji(countryCode);
  const callingCode = country?.callingCode?.[0]
    ? `+${country.callingCode[0]}`
    : '+91'; // default India
  const currencyCode = country?.currency?.[0] ?? 'INR'; // default India
  const countryName =
    country
      ? typeof country.name === 'object' && 'common' in country.name
        ? (country.name as { common: string }).common
        : typeof country.name === 'string'
        ? country.name
        : 'Select Country'
      : 'Select Country';

  // ── Shared picker node (always rendered but never visible when disabled) ──
  const pickerNode = (
    <CountryPicker
      countryCode={countryCode}
      withFilter
      withFlag
      withFlagButton={false}
      withCountryNameButton={false}
      withAlphaFilter={false}
      withCallingCode={variant === 'phone'}
      withCurrency={variant === 'currency'}
      withEmoji
      withModal
      onSelect={handleSelect}
      visible={visible}
      onClose={() => setVisible(false)}
      containerButtonStyle={styles.hiddenButton}
      theme={
        pickerTheme ?? {
          fontFamily: 'Sofia Pro',
          fontSize: 16,
          backgroundColor: colors.inputBackground ?? colors.backgroundCard,
          onBackgroundTextColor: colors.fieldText ?? colors.textPrimary,
          primaryColor: colors.accent,
          primaryColorVariant: colors.accentSecondary,
          filterPlaceholderTextColor: colors.placeholder ?? colors.textMuted,
        }
      }
      modalProps={{ animationType: 'slide' }}
    />
  );

  // ── PHONE variant (gradient pill, flag + calling code) ────────────────────
  if (variant === 'phone') {
    return (
      <>
        <View style={[styles.phoneTrigger, style]}>
          <TouchableOpacity
            onPress={openPicker}
            activeOpacity={disabled ? 1 : 0.8}
            disabled={disabled}
          >
            <LinearGradient
              colors={gradients.secondary}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              angle={242}
              style={styles.phoneGradient}
            >
              <View style={styles.phoneContent}>
                <Text style={styles.flag}>{flagEmoji}</Text>
                <Text style={[styles.callingCode, { color: colors.iconSelected }]}>
                  {callingCode}
                </Text>
                {/* Chevron only shown when picker is enabled */}
                {!disabled && (
                  <Svg
                    width={wp('2.66%')}
                    height={wp('1.33%')}
                    viewBox="0 0 10 5"
                    fill="none"
                  >
                    <Path
                      d="M1 1L5 4L9 1"
                      stroke={colors.iconSelected}
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                )}
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        {pickerNode}
      </>
    );
  }

  // ── COUNTRY / CURRENCY variants (border dropdown) ─────────────────────────
  const displayText = variant === 'currency' ? currencyCode : countryName;
  const placeholder =
    variant === 'currency' ? 'INR' : 'Select Country';

  return (
    <>
      <TouchableOpacity
        style={[
          styles.dropdownTrigger,
          {
            backgroundColor:
              colors.inputBackground ?? colors.backgroundCard,
            borderColor: '#DFDFDF',
          },
          style,
        ]}
        onPress={openPicker}
        activeOpacity={disabled ? 1 : 0.7}
        disabled={disabled}
      >
        <Text
          style={[
            styles.dropdownText,
            {
              color:
                country
                  ? colors.fieldText ?? colors.textPrimary
                  : '#CFCFCF',
            },
          ]}
        >
          {country ? displayText : placeholder}
        </Text>

        {/* Chevron only shown when picker is enabled */}
        {!disabled && (
          <Svg width={12} height={8} viewBox="0 0 12 8" fill="none">
            <Path
              d="M1 1L6 6L11 1"
              stroke="#CFCFCF"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        )}
      </TouchableOpacity>
      {pickerNode}
    </>
  );
};

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------
const styles = StyleSheet.create({
  // Phone variant
  phoneTrigger: {
    alignSelf: 'flex-start',
  },
  phoneGradient: {
    height: hp('5.91%'),
    borderRadius: wp('2.9%'),
    justifyContent: 'center',
  },
  phoneContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('1.45%'),
    paddingHorizontal: wp('4.54%'),
  },
  flag: {
    fontSize: wp('5.31%'),
  },
  callingCode: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: wp('4.35%'),
  },

  // Country / Currency variant
  dropdownTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 48,
    borderRadius: 6,
    borderWidth: 1,
    paddingHorizontal: 16,
  },
  dropdownText: {
    fontFamily: 'Comfortaa-Regular',
    fontSize: 15,
    lineHeight: 20,
    flexShrink: 1,
  },

  // Hides the CountryPicker's built-in button trigger
  hiddenButton: {
    width: 0,
    height: 0,
    opacity: 0,
  },
});

export default CountryPickerInput;
