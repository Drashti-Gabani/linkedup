import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { useTheme } from '../hooks/useTheme';
import { wp, hp } from '../utils/responsive';
import { AuthStackNavigationProp } from '../navigation/types';
import GradientText from '../components/GradientText';

const WelcomeScreen: React.FC = () => {
  const { colors, gradients, isDark } = useTheme();
  const navigation = useNavigation<AuthStackNavigationProp>();

  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');

  const handleNext = () => {
    console.log('User data:', { firstName, email, birthdate });
    navigation.navigate('GenderSelection');
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const showText = true;

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={['top']}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Decorative Images */}
        <View style={styles.imagesContainer}>
          <Image
            source={require('../assets/images/relationship-card-bg.png')}
            style={styles.decorativeImage}
            resizeMode="cover"
          />
        </View>

        {/* Title Section */}
        <View style={styles.titleContainer}>
          <Text style={[styles.welcomeTitle, { color: colors.textPrimary }]}>
            Welcome
          </Text>
          <View style={styles.subtitleContainer}>
            {!isDark && (
              <View
                style={[
                  styles.subtitleHighlight,
                  { backgroundColor: colors.underline },
                ]}
              />
            )}
            <Text style={[styles.subtitle, { color: colors.textMuted }]}>
              Sign up today for free!{' '}
              <Text
                style={[styles.subtitleSecondary, { color: colors.textMuted }]}
              >
                or{' '}
              </Text>
              <Text
                style={[styles.loginLink, { color: colors.textMuted }]}
                onPress={handleLogin}
              >
                Login
              </Text>
            </Text>
          </View>
        </View>

        {/* Input Fields */}
        <View style={styles.formContainer}>
          {/* First Name */}
          <View style={styles.inputGroup}>
            <GradientText style={styles.inputLabel}>FIRST NAME</GradientText>
            <View
              style={[
                styles.inputContainer,
                { backgroundColor: colors.inputBackground },
                firstName &&
                  (isDark
                    ? [
                        styles.inputContainerFocusedDark,
                        { borderColor: colors.accent },
                      ]
                    : [
                        styles.inputContainerFocused,
                        { borderColor: colors.border },
                      ]),
              ]}
            >
              <Svg
                width={13}
                height={14}
                viewBox="0 0 13 14"
                style={styles.inputIcon}
              >
                <Path
                  d="M6.5 7C8.433 7 10 5.433 10 3.5S8.433 0 6.5 0 3 1.567 3 3.5 4.567 7 6.5 7ZM6.5 8.75C4.083 8.75 0 9.958 0 12.25V14h13v-1.75c0-2.292-4.083-3.5-6.5-3.5Z"
                  fill={
                    firstName
                      ? isDark
                        ? colors.accentSecondary
                        : colors.accentPrimary
                      : colors.inputIcon
                  }
                />
              </Svg>
              <TextInput
                style={[styles.input, { color: colors.inputText }]}
                placeholder="Name"
                placeholderTextColor={colors.placeholder}
                value={firstName}
                onChangeText={setFirstName}
              />
              <Svg
                width={8}
                height={6}
                viewBox="0 0 8 6"
                style={styles.inputChevron}
              >
                <Path
                  d="M1 1L4 4L7 1"
                  stroke={colors.inputIcon}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </View>
          </View>

          {/* Email */}
          <View style={styles.inputGroup}>
            <GradientText style={styles.inputLabel}>EMAIL</GradientText>
            <View
              style={[
                styles.inputContainer,
                { backgroundColor: colors.inputBackground },
                email &&
                  (isDark
                    ? [
                        styles.inputContainerFocusedDark,
                        { borderColor: colors.accent },
                      ]
                    : [
                        styles.inputContainerFocused,
                        { borderColor: colors.border },
                      ]),
              ]}
            >
              <Svg
                width={16}
                height={12}
                viewBox="0 0 16 12"
                style={styles.inputIcon}
              >
                <Path
                  d="M14.4 0H1.6C.72 0 .008.72.008 1.6L0 11.2C0 12.08.72 12.8 1.6 12.8h12.8c.88 0 1.6-.72 1.6-1.6V1.6C16 .72 15.28 0 14.4 0Zm0 3.2L8 7.2 1.6 3.2V1.6L8 5.6l6.4-4v1.6Z"
                  fill={
                    email
                      ? isDark
                        ? colors.accentSecondary
                        : colors.accentPrimary
                      : colors.inputIcon
                  }
                />
              </Svg>
              <TextInput
                style={[styles.input, { color: colors.inputText }]}
                placeholder="jordan@defects.cc"
                placeholderTextColor={colors.placeholder}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <Svg
                width={8}
                height={6}
                viewBox="0 0 8 6"
                style={styles.inputChevron}
              >
                <Path
                  d="M1 1L4 4L7 1"
                  stroke={
                    email
                      ? isDark
                        ? colors.accent
                        : colors.inputIcon
                      : colors.inputIcon
                  }
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </View>
          </View>

          {/* Birthdate */}
          <View style={styles.inputGroup}>
            <GradientText style={styles.inputLabel}>BIRTHDATE</GradientText>
            <View
              style={[
                styles.inputContainer,
                { backgroundColor: colors.inputBackground },
              ]}
            >
              <Svg
                width={13}
                height={14}
                viewBox="0 0 13 14"
                style={styles.inputIcon}
              >
                <Path
                  d="M11.375 1.75h-.875V.875a.875.875 0 00-1.75 0V1.75h-4.5V.875a.875.875 0 00-1.75 0V1.75h-.875A1.75 1.75 0 000 3.5v9.625A1.75 1.75 0 001.75 14.875h9.625a1.75 1.75 0 001.75-1.75V3.5a1.75 1.75 0 00-1.75-1.75ZM11.375 13.125H1.75V5.25h9.625v7.875Z"
                  fill={colors.inputIcon}
                />
              </Svg>
              <TextInput
                style={[styles.input, { color: colors.inputText }]}
                placeholder="dd/mm/yy"
                placeholderTextColor={colors.placeholder}
                value={birthdate}
                onChangeText={setBirthdate}
              />
              <Svg
                width={8}
                height={6}
                viewBox="0 0 8 6"
                style={styles.inputChevron}
              >
                <Path
                  d="M1 1L4 4L7 1"
                  stroke={colors.inputIcon}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </View>
          </View>
        </View>

        {/* Privacy Notice */}
        <Text
          style={[
            styles.privacyText,
            {
              fontSize: isDark ? 12 : 16,
              lineHeight: isDark ? 13.4 : 17.84,
              color: colors.textMuted,
            },
          ]}
        >
          Your personal information is safe with us and we'll not show your date
          of birth or email to other users.
        </Text>

        {/* Next Button Container */}
        <View style={styles.nextButtonContainer}>
          <View style={styles.nextButtonWrapper}>
            {showText && (
              <TouchableOpacity
                onPress={handleNext}
                activeOpacity={0.7}
                style={styles.nextTextContainer}
              >
                <MaskedView
                  maskElement={<Text style={styles.nextTextMask}>Next</Text>}
                >
                  <LinearGradient
                    colors={gradients.secondary}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.nextTextGradient}
                  >
                    <Text style={[styles.nextText, { opacity: 0 }]}>Next</Text>
                  </LinearGradient>
                </MaskedView>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={handleNext}
              activeOpacity={0.7}
              style={styles.nextArrowButton}
            >
              <LinearGradient
                colors={gradients.secondary}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                angle={242}
                style={styles.nextArrowGradient}
              >
                <Svg width={15} height={15} viewBox="0 0 13 13" fill="none">
                  <Path
                    d="M1 6.31034H11.6207M11.6207 6.31034L6.31034 1M11.6207 6.31034L6.31034 11.6207"
                    stroke={colors.iconSelected}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
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
    paddingBottom: hp('10%'),
  },
  imagesContainer: {
    position: 'absolute',
    top: -104,
    left: -123,
    width: 660.46,
    height: 417.65,
    overflow: 'hidden',
    borderRadius: 25,
  },
  decorativeImage: {
    width: '100%',
    height: '100%',
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: hp('35.27%'),
    paddingHorizontal: wp('18.6%'),
    marginBottom: hp('4.46%'),
  },
  welcomeTitle: {
    fontFamily: 'Comfortaa-Bold',
    fontWeight: '700',
    fontSize: 40,
    lineHeight: 32,
    textAlign: 'center',
    marginBottom: 21,
  },
  subtitleContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  subtitleHighlight: {
    position: 'absolute',
    width: 173,
    height: 14,
    top: 6,
  },
  subtitle: {
    fontFamily: 'Comfortaa-SemiBold',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'center',
  },
  subtitleSecondary: {},
  loginLink: {
    textDecorationLine: 'underline',
  },
  formContainer: {
    paddingHorizontal: wp('9.66%'),
    gap: 18,
  },
  inputGroup: {
    position: 'relative',
    marginBottom: 0,
  },
  inputLabel: {
    fontFamily: 'Comfortaa-Medium',
    fontSize: 10,
    fontWeight: '500',
    lineHeight: 15,
    letterSpacing: 0.5,
    marginLeft: 17,
    marginBottom: 9,
  },
  inputContainer: {
    height: 72,
    borderRadius: 10,
    paddingTop: 24,
    paddingHorizontal: 17,
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  inputContainerFocused: {},
  inputContainerFocusedDark: {},
  inputIcon: {
    marginRight: 19,
  },
  input: {
    flex: 1,
    fontFamily: 'Comfortaa-SemiBold',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 20,
    paddingVertical: 0,
  },
  inputChevron: {
    marginLeft: 8,
  },
  privacyText: {
    fontFamily: 'Comfortaa',
    fontWeight: '400',
    textAlign: 'left',
    paddingHorizontal: wp('9.66%'),
    marginTop: hp('2.9%'),
    marginBottom: hp('2.68%'),
  },
  nextButtonContainer: {
    width: '100%',
    alignItems: 'flex-end',
    paddingHorizontal: wp('6%'),
    marginTop: hp('2%'),
    paddingBottom: hp('5%'),
  },
  nextButtonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  nextTextContainer: {
    marginRight: 15,
  },
  nextTextMask: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.66,
    backgroundColor: 'transparent',
  },
  nextTextGradient: {
    paddingVertical: 2,
  },
  nextText: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.66,
  },
  nextArrowButton: {
    width: 48,
    height: 48,
  },
  nextArrowGradient: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WelcomeScreen;
