import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Country, CountryCode } from 'react-native-country-picker-modal';
import { useTheme } from '../hooks/useTheme';
import { wp, hp } from '../utils/responsive';
import { AuthStackNavigationProp } from '../navigation/types';
import BackButton from '../components/BackButton';
import GradientButton from '../components/GradientButton';
import CountryPickerInput from '../components/CountryPickerInput';
import AppTextInput from '../components/AppTextInput';

const OTPScreen: React.FC = () => {
  const { colors, gradients } = useTheme();
  const navigation = useNavigation<AuthStackNavigationProp>();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState<CountryCode>('IN');
  const [country, setCountry] = useState<Country | null>(null);
  const [error, setError] = useState('');

  const onSelectCountry = (selectedCountry: Country) => {
    setCountryCode(selectedCountry.cca2);
    setCountry(selectedCountry);
  };

  // Format digits as xxx-xxx-xxxx
  const formatPhoneNumber = (digits: string): string => {
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  };

  const handlePhoneChange = (text: string) => {
    // Strip everything except digits
    const digits = text.replace(/\D/g, '').slice(0, 10);
    setPhoneNumber(formatPhoneNumber(digits));

    // Clear error as user types
    if (error) setError('');
  };

  const getRawDigits = () => phoneNumber.replace(/\D/g, '');

  const isValid = getRawDigits().length === 10;

  const handleNext = () => {
    if (!isValid) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }
    navigation.navigate('OTPVerify');
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        bounces={false}
      >
        <BackButton onPress={() => navigation.goBack()} size="medium" />

        {/* Main Content Container - using flexbox */}
        <View style={styles.mainContainer}>
          {/* Top Section - Heading and Description */}
          <View style={styles.topSection}>
            {/* Heading */}
            <MaskedView
              style={styles.headingContainer}
              maskElement={
                <Text style={[styles.heading, { color: 'white' }]}>
                  Can I get{'\n'}those digits?
                </Text>
              }
            >
              <LinearGradient
                colors={gradients.secondary}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                angle={242}
                style={styles.headingGradient}
              >
                <Text style={[styles.heading, { color: 'transparent' }]}>
                  Can I get{'\n'}those digits?
                </Text>
              </LinearGradient>
            </MaskedView>

            {/* Description */}
            <Text
              style={[
                styles.description,
                {
                  color: colors.textMuted,
                },
              ]}
            >
              Please enter your mobile number for verification to ensure a
              secure and authentic experience on our platform
            </Text>
          </View>

          {/* Middle Section - Phone Input and Privacy Note */}
          <View style={styles.middleSection}>
            {/* Phone Number Input */}
            <View style={styles.numberField}>
              {/* Locked to India — disabled until worldwide release */}
              <CountryPickerInput
                variant="phone"
                countryCode={countryCode}
                country={country}
                onSelect={onSelectCountry}
                disabled
              />
              <AppTextInput
                value={phoneNumber}
                onChangeText={handlePhoneChange}
                placeholder="800-111-2222"
                keyboardType="phone-pad"
                returnKeyType="done"
                maxLength={12}
                error={error}
                inputWrapperStyle={styles.phoneInputWrapper}
                containerStyle={styles.phoneInputContainer}
              />
            </View>

            {/* Privacy Note */}
            <Text
              style={[
                styles.privacyNote,
                {
                  color: colors.textMuted,
                },
              ]}
            >
              Don't worry — your number stays private and won't be shown to
              anyone else
            </Text>
          </View>
        </View>

        <GradientButton
          onPress={handleNext}
          text="Next"
          disabled={!isValid}
        />


      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: hp('5%'),
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: wp('10%'), // x: 40 in Figma
    paddingTop: hp('19.2%'), // y: 172 from top (246 - 73 = 173px)
  },
  topSection: {
    flex: 0,
  },
  headingContainer: {
    alignSelf: 'flex-start',
  },
  headingGradient: {
    width: '100%',
  },
  heading: {
    fontFamily: 'Poppins-Bold',
    fontWeight: '700',
    fontSize: wp('10.87%'), // 45px
    lineHeight: wp('12.2%'),
  },
  description: {
    fontFamily: 'Comfortaa-Regular',
    marginTop: hp('4.8%'), // ~43px spacing from heading (155px in Figma)
    width: wp('80.7%'), // 334px in Figma
  },
  middleSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: hp('1%'), // Small padding
    paddingBottom: hp('15%'), // Space for fixed Next button
  },
  numberField: {
    flexDirection: 'row',
    gap: wp('2.9%'),
    width: wp('80.7%'),
    alignItems: 'flex-start', // allow error message to flow below
  },


  phoneInputContainer: {
    flex: 1,
  },
  phoneInputWrapper: {
    marginTop: 0,       // no label so no top offset needed
    height: hp('5.91%'),
    borderRadius: wp('2.9%'),
    paddingHorizontal: wp('4.35%'),
    justifyContent: 'center',
  },
  privacyNote: {
    fontFamily: 'Comfortaa-Regular',
    marginTop: hp('2.5%'),
    width: wp('80.7%'),
  },
});


export default OTPScreen;
