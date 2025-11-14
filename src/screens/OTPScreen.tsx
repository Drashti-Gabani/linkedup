import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import CountryPicker, {
  CountryCode,
  Country,
} from 'react-native-country-picker-modal';
import { useTheme } from '../hooks/useTheme';
import { wp, hp } from '../utils/responsive';
import { AuthStackNavigationProp } from '../navigation/types';
import BackButton from '../components/BackButton';
import DropdownArrowIcon from '../components/icons/DropdownArrowIcon';
import GradientButton from '../components/GradientButton';

// Helper function to convert country code to flag emoji
const getFlagEmoji = (countryCode: CountryCode): string => {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

const OTPScreen: React.FC = () => {
  const { colors, gradients } = useTheme();
  const navigation = useNavigation<AuthStackNavigationProp>();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState<CountryCode>('US');
  const [country, setCountry] = useState<Country | null>(null);
  const [countryPickerVisible, setCountryPickerVisible] = useState(false);

  const onSelectCountry = (selectedCountry: Country) => {
    setCountryCode(selectedCountry.cca2);
    setCountry(selectedCountry);
    setCountryPickerVisible(false);
  };

  const getCallingCode = () => {
    const code = country?.callingCode?.[0] || '1';
    return `+${code}`;
  };

  const getCountryFlag = () => {
    // Use the current country code to get flag emoji
    return getFlagEmoji(countryCode);
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
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setCountryPickerVisible(true)}
              >
                <LinearGradient
                  colors={gradients.secondary}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  angle={242}
                  style={styles.countryCode}
                >
                  <View style={styles.countryCodeContent}>
                    <Text style={styles.flag}>{getCountryFlag()}</Text>
                    <Text
                      style={[styles.codeText, { color: colors.iconSelected }]}
                    >
                      {getCallingCode()}
                    </Text>
                    <DropdownArrowIcon
                      width={wp('2.66%')}
                      height={wp('1.33%')}
                      color={colors.iconSelected}
                    />
                  </View>
                </LinearGradient>
              </TouchableOpacity>
              <TextInput
                style={[styles.phoneInput, { color: colors.fieldText }]}
                placeholder="800-111-2222"
                placeholderTextColor={colors.placeholder}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
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
          onPress={() => navigation.navigate('OTPVerify')}
          text="Next"
        />

        {/* Country Picker Modal */}
        <CountryPicker
          {...{
            countryCode,
            withFilter: true,
            withFlag: true,
            withFlagButton: false, // Disable default flag button
            withCountryNameButton: false,
            withAlphaFilter: false,
            withCallingCode: true,
            withEmoji: true,
            withModal: true, // Ensure it only shows as modal
            onSelect: onSelectCountry,
            visible: countryPickerVisible,
            onClose: () => setCountryPickerVisible(false),
            theme: undefined, // Use default theme, colors handled by app theme
          }}
          modalProps={{
            animationType: 'slide',
          }}
          containerButtonStyle={{ width: 0, height: 0, opacity: 0 }} // Hide any container button
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
    height: hp('6.65%'), // 60px height
    gap: wp('2.9%'), // Gap between country code and input
    width: wp('80.7%'), // 334px width
    alignItems: 'center', // Center align items vertically
  },
  countryCode: {
    width: wp('31.4%'), // 130.21px width - back to original
    height: hp('5.91%'), // 52.97px height
    borderRadius: wp('2.9%'), // 12px border radius
    justifyContent: 'center', // Center content vertically
  },
  countryCodeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: wp('1.45%'),
    paddingHorizontal: wp('4.54%'),
  },
  flag: {
    fontSize: wp('5.31%'),
  },
  codeGradient: {
    flex: 1,
    justifyContent: 'center',
  },
  codeText: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: wp('4.35%'), // 18px
  },
  dropdownIcon: {
    fontSize: wp('2.66%'),
    // color will be set dynamically
  },
  phoneInput: {
    flex: 1,
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: wp('5.31%'), // 22px
    paddingVertical: 0,
  },
  privacyNote: {
    fontFamily: 'Comfortaa-Regular',
    marginTop: hp('2.5%'), // ~22px spacing from number field (90px in Figma)
    width: wp('80.7%'), // 334px width
  },
});

export default OTPScreen;
