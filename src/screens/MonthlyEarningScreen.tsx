import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Polygon } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import CountryPicker, {
  Country,
  CountryCode,
} from 'react-native-country-picker-modal';
import { useTheme } from '../hooks/useTheme';
import { wp, hp } from '../utils/responsive';
import { AuthStackNavigationProp } from '../navigation/types';
import SelectionSection from '../components/SelectionSection';
import BackButton from '../components/BackButton';
import NextButton from '../components/NextButton';

const SALARY_RANGES = [
  'Below 50,000',
  '50,000 – 100,000',
  '100,000 – 150,000',
  '150,000 – 200,000',
  '200,000 – 300,000',
  '300,000 – 500,000',
  'Above 500,000',
];

const MonthlyEarningScreen: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<AuthStackNavigationProp>();

  const [selectedRange, setSelectedRange] = useState<string | null>(
    'Below 50,000',
  );
  const [dontShow, setDontShow] = useState(false);
  const [showCurrencyPicker, setShowCurrencyPicker] = useState(false);
  const [countryCode, setCountryCode] = useState<CountryCode>('US');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  const handleCurrencySelect = (country: Country) => {
    setCountryCode(country.cca2);
    setSelectedCurrency(country.currency?.[0] || country.cca2);
  };

  const handleNext = () => {
    console.log('Monthly Earning:', {
      range: selectedRange,
      currency: selectedCurrency,
      countryCode,
      dontShow,
    });

    navigation.navigate('ProfessionalExperience');
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <BackButton onPress={() => navigation.goBack()} size="medium" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.highlight} />
            <Text
              style={[styles.title, { color: colors.heading }]}
            >
              Monthly Earning
            </Text>
            <Text style={[styles.subtitle, { color: colors.subheading }]}>
              Select a range
            </Text>
          </View>

          {/* Currency Selector */}
          <TouchableOpacity
            style={[
              styles.currencySelector,
              { backgroundColor: colors.inputBackground },
            ]}
            onPress={() => setShowCurrencyPicker(true)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.currencySelectorText,
                { color: colors.inputIconSecondary },
              ]}
            >
              {selectedCurrency || 'Select Currency'}
            </Text>
            <Svg width={15} height={14} viewBox="0 0 15 14">
              <Polygon
                points="7.5,14 0,0 15,0"
                fill={colors.fieldText}
              />
            </Svg>
          </TouchableOpacity>

          {/* Salary Range Selection */}
          <View style={styles.salarySection}>
            <SelectionSection
              title=""
              options={SALARY_RANGES}
              selectedValue={selectedRange}
              onSelect={setSelectedRange}
            />
          </View>

          {/* Don't Show Checkbox */}
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setDontShow(!dontShow)}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.checkbox,
                { borderColor: colors.checkboxBorder },
              ]}
            >
              {dontShow && <View style={styles.checkboxInner} />}
            </View>
            <Text style={[styles.checkboxLabel, { color: colors.textDisabled }]}>
              Don't show
            </Text>
          </TouchableOpacity>
        </View>

        {/* Next Button Container */}
        <View style={styles.nextButtonWrapper}>
          <View style={styles.nextButtonInner}>
            <NextButton
              onPress={handleNext}
              showText={true}
              textLabel="Next"
              size="medium"
              style={styles.nextButtonOverride}
            />
          </View>
        </View>
      </ScrollView>

      {/* Currency Picker Modal */}
      <CountryPicker
        countryCode={countryCode}
        withFilter
        withFlag
        withCurrency={true}
        withCountryNameButton={false}
        withAlphaFilter={false}
        withCallingCode={false}
        withEmoji
        onSelect={abc => console.log('country selected', abc)}
        visible={showCurrencyPicker}
        onClose={() => setShowCurrencyPicker(false)}
        containerButtonStyle={styles.pickerButton}
        theme={{
          fontFamily: 'Sofia Pro',
          fontSize: 16,
          backgroundColor: colors.inputBackground,
          onBackgroundTextColor: colors.fieldText,
          primaryColor: colors.accent,
          primaryColorVariant: colors.accentSecondary,
          filterPlaceholderTextColor: colors.placeholder,
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: hp('5%'),
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    paddingHorizontal: wp('11%'),
    paddingTop: hp('12%'),
    paddingBottom: hp('2%'),
  },
  header: {
    alignItems: 'center',
    marginBottom: hp('3%'),
    position: 'relative',
  },
  highlight: {
    position: 'absolute',
    backgroundColor: '#F2F2F2',
    width: 88,
    height: 18,
    top: '15%',
  },
  title: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: -0.52,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Sofia Pro',
    fontSize: 17,
    lineHeight: 28,
    textAlign: 'center',
    letterSpacing: -0.34,
  },
  currencySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 48,
    borderRadius: 6,
    paddingHorizontal: 16,
    marginBottom: hp('2%'),
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.07,
    shadowRadius: 64,
    elevation: 5,
  },
  currencySelectorText: {
    fontFamily: 'Comfortaa-Regular',
    fontSize: 15,
    lineHeight: 20,
    color: '#D0C9D6',
  },
  salarySection: {
    marginBottom: hp('2%'),
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('1%'),
  },
  checkbox: {
    width: 19,
    height: 19,
    borderRadius: 4,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkboxInner: {
    width: 11,
    height: 11,
    backgroundColor: '#8239FF',
  },
  checkboxLabel: {
    fontFamily: 'Sofia Pro',
    fontSize: 18,
    lineHeight: 30,
    letterSpacing: -0.36,
  },
  nextButtonWrapper: {
    paddingVertical: hp('3%'),
    paddingHorizontal: wp('6%'),
    alignItems: 'flex-end',
  },
  nextButtonInner: {
    width: '100%',
    alignItems: 'flex-end',
  },
  nextButtonOverride: {
    position: 'relative',
    bottom: 0,
    right: 0,
  },
  pickerButton: {
    display: 'none',
  },
});

export default MonthlyEarningScreen;
