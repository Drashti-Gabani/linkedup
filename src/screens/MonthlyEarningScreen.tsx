import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Country, CountryCode } from 'react-native-country-picker-modal';
import { useTheme } from '../hooks/useTheme';
import { wp, hp } from '../utils/responsive';
import { AuthStackNavigationProp } from '../navigation/types';
import SelectionSection from '../components/SelectionSection';
import BackButton from '../components/BackButton';
import NextButton from '../components/NextButton';
import ScreenTitle from '../components/ScreenTitle';
import CountryPickerInput from '../components/CountryPickerInput';

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
  const [countryCode, setCountryCode] = useState<CountryCode>('IN');
  const [country, setCountry] = useState<Country | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState('INR');

  const handleCurrencySelect = (selected: Country) => {
    setCountryCode(selected.cca2);
    setCountry(selected);
    setSelectedCurrency(selected.currency?.[0] || selected.cca2);
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={false}
      >
        <BackButton onPress={() => navigation.goBack()} size="medium" />
        <View style={styles.content}>
          <ScreenTitle
            title="Monthly Earning"
            subtitle="Select a range"
            highlightWidth={88}
          />

          {/* Currency locked to INR — disabled until worldwide release */}
          <CountryPickerInput
            variant="currency"
            countryCode={countryCode}
            country={country}
            onSelect={handleCurrencySelect}
            disabled
            style={styles.currencyPicker}
          />

          {/* Salary Range Selection */}

          <SelectionSection
            title=""
            options={SALARY_RANGES}
            selectedValue={selectedRange}
            onSelect={setSelectedRange}
          />

          {/* Don't Show Checkbox */}
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setDontShow(!dontShow)}
            activeOpacity={0.7}
          >
            <View
              style={[styles.checkbox, { borderColor: colors.checkboxBorder }]}
            >
              {dontShow && <View style={styles.checkboxInner} />}
            </View>
            <Text
              style={[styles.checkboxLabel, { color: colors.textDisabled }]}
            >
              Don't show on my profile
            </Text>
          </TouchableOpacity>
        </View>

        <NextButton
          onPress={handleNext}
          showText={true}
          textLabel="Next"
          size="medium"
        />
      </ScrollView>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: hp('12%'),
  },
  content: {
    paddingHorizontal: wp('10%'),
  },
  currencyPicker: {
    marginBottom: hp('2%'),
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  pickerButton: {
    display: 'none',
  },
});

export default MonthlyEarningScreen;
