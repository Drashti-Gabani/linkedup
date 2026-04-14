import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';
import { useTheme } from '../hooks/useTheme';
import { useInfiniteCarousel } from '../hooks/useInfiniteCarousel';
import { wp, hp } from '../utils/responsive';
import NextButton from '../components/NextButton';
import UserIcon from '../components/icons/UserIcon';
import EmailIcon from '../components/icons/EmailIcon';
import DatePickerInput from '../components/DatePickerInput';
import { AuthStackNavigationProp } from '../navigation/types';
import { useNavigation } from '@react-navigation/native';
import ScreenTitle from '../components/ScreenTitle';
import { AppImage } from '../utils/AppImage';
import AppTextInput from '../components/AppTextInput';

// ---------------------------------------------------------------------------
// Validation helpers
// ---------------------------------------------------------------------------
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_REGEX = /^[a-zA-Z\s'-]+$/;

type SignUpErrors = {
  firstName?: string;
  email?: string;
  birthdate?: string;
  bio?: string;
};

const validateSignUp = (
  firstName: string,
  email: string,
  birthdate: string,
  bio: string,
): SignUpErrors => {
  const errors: SignUpErrors = {};
  if (!firstName.trim()) {
    errors.firstName = 'First name is required';
  } else if (!NAME_REGEX.test(firstName.trim())) {
    errors.firstName = 'First name can only contain letters';
  }
  if (!email.trim()) {
    errors.email = 'Email is required';
  } else if (!EMAIL_REGEX.test(email.trim())) {
    errors.email = 'Enter a valid email address';
  }
  if (!birthdate) {
    errors.birthdate = 'Date of birth is required';
  }
  if (!bio.trim()) {
    errors.bio = 'Tell us a little about yourself';
  }
  return errors;
};

const SignUpScreen: React.FC = () => {
  const navigation = useNavigation<AuthStackNavigationProp>();
  const { colors, isDark } = useTheme();

  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [bio, setBio] = useState('');
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [errors, setErrors] = useState<SignUpErrors>({});
  const [submitted, setSubmitted] = useState(false);

  // Refs for scrolling
  const scrollViewRef = useRef<ScrollView>(null);
  const bioInputRef = useRef<TextInput>(null);

  // Checkmarks only when field is genuinely valid
  const showFirstNameCheck = firstName.trim().length > 0 && NAME_REGEX.test(firstName.trim());
  const showEmailCheck = EMAIL_REGEX.test(email.trim());
  const showBirthdateCheck = birthdate.length > 0;
  const showBioCheck = bio.trim().length > 0;

  // Infinite carousel animation
  const { card0Style, card1Style, card2Style, cardImages, cardSizes } =
    useInfiniteCarousel();

  // Clear error for a field as the user types (only after first submit attempt)
  const clearError = (field: keyof SignUpErrors) => {
    if (submitted) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handleNext = () => {
    setSubmitted(true);
    const validationErrors = validateSignUp(firstName, email, birthdate, bio);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    navigation.navigate('OTP');
  };

  const handleLogin = () => navigation.navigate('Login');

  const handleBioFocus = () => {
    setFocusedInput('bio');
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleBioBlur = () => setFocusedInput(null);

  const handleBioSubmit = () => bioInputRef.current?.blur();

  return (
    <KeyboardAvoidingView
      style={[
        styles.keyboardAvoidingView,
        { backgroundColor: colors.background },
      ]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View
          style={[styles.container, { backgroundColor: colors.background }]}
        >
          {/* Profile Photos Section - Infinite Carousel */}
          <View style={styles.profilePhotosContainer}>
            <Animated.View
              style={[
                styles.profilePhotoWrapper,
                { width: cardSizes[0].width, height: cardSizes[0].height },
                card0Style,
              ]}
            >
              <AppImage
                source={cardImages[0]}
                style={[
                  styles.profilePhoto,
                  { width: cardSizes[0].width, height: cardSizes[0].height },
                ]}
                resizeMode="cover"
              />
            </Animated.View>
            <Animated.View
              style={[
                styles.profilePhotoWrapper,
                { width: cardSizes[1].width, height: cardSizes[1].height },
                card1Style,
              ]}
            >
              <AppImage
                source={cardImages[1]}
                style={[
                  styles.profilePhoto,
                  { width: cardSizes[1].width, height: cardSizes[1].height },
                ]}
                resizeMode="cover"
              />
            </Animated.View>
            <Animated.View
              style={[
                styles.profilePhotoWrapper,
                { width: cardSizes[2].width, height: cardSizes[2].height },
                card2Style,
              ]}
            >
              <AppImage
                source={cardImages[2]}
                style={[
                  styles.profilePhoto,
                  { width: cardSizes[2].width, height: cardSizes[2].height },
                ]}
                resizeMode="cover"
              />
            </Animated.View>
          </View>

          <View style={styles.contentWrapper}>
            <SafeAreaView style={styles.safeArea}>
              {/* Content Section */}
              <View style={styles.content}>
                {/* Title Section */}
                <View style={styles.titleSection}>
                  <ScreenTitle
                    title="Welcome"
                    titleSize="large"
                    containerMarginBottom={hp('1%')}
                  />

                  <View style={styles.subtitleWrapper}>
                    <Text
                      style={[styles.subtitleText, { color: colors.textMuted }]}
                      numberOfLines={1}
                      ellipsizeMode="clip"
                    >
                      Sign up today for free! or{' '}
                      <Text
                        style={[
                          styles.loginLink,
                          { color: colors.accentTertiary },
                        ]}
                        onPress={handleLogin}
                      >
                        Login
                      </Text>
                    </Text>
                  </View>
                </View>

                {/* Input Fields */}
                <View style={styles.inputsContainer}>
                  {/* First Name Input */}
                  <AppTextInput
                    label="FIRST NAME"
                    placeholder="First Name"
                    value={firstName}
                    onChangeText={v => { setFirstName(v); clearError('firstName'); }}
                    leftIcon={<UserIcon width={13} height={14} color={colors.inputIcon} />}
                    showCheckmark={showFirstNameCheck}
                    isFocused={focusedInput === 'firstName'}
                    onFocus={() => setFocusedInput('firstName')}
                    onBlur={() => setFocusedInput(null)}
                    error={errors.firstName}
                    containerStyle={styles.inputGroup}
                  />

                  {/* Email Input */}
                  <AppTextInput
                    label="EMAIL"
                    placeholder="jordan@defects.cc"
                    value={email}
                    onChangeText={v => { setEmail(v); clearError('email'); }}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    leftIcon={<EmailIcon width={16} height={12} color={colors.inputIcon} />}
                    showCheckmark={showEmailCheck}
                    isFocused={focusedInput === 'email'}
                    onFocus={() => setFocusedInput('email')}
                    onBlur={() => setFocusedInput(null)}
                    error={errors.email}
                    containerStyle={styles.inputGroup}
                  />

                  {/* Birthdate Input */}
                  <View style={styles.inputGroup}>
                    <DatePickerInput
                      value={birthdate}
                      onChange={v => { setBirthdate(v); clearError('birthdate'); }}
                      placeholder="dd/mm/yy"
                      label="BIRTHDATE"
                      showCheckmark={showBirthdateCheck}
                      isFocused={focusedInput === 'birthdate'}
                      onFocus={() => setFocusedInput('birthdate')}
                      onBlur={() => setFocusedInput(null)}
                      containerStyle={styles.datePickerContainer}
                      inputWrapperStyle={styles.datePickerInputWrapper}
                      error={errors.birthdate}
                    />
                  </View>

                  {/* Bio Input */}
                  <AppTextInput
                    ref={bioInputRef}
                    label="BIO"
                    placeholder="Tell us about yourself..."
                    value={bio}
                    onChangeText={v => { setBio(v); clearError('bio'); }}
                    multiline
                    maxLength={300}
                    returnKeyType="done"
                    blurOnSubmit={true}
                    numberOfLines={4}
                    textAlignVertical="top"
                    showCheckmark={showBioCheck}
                    isFocused={focusedInput === 'bio'}
                    onFocus={handleBioFocus}
                    onBlur={handleBioBlur}
                    onSubmitEditing={handleBioSubmit}
                    error={errors.bio}
                    containerStyle={styles.bioInputGroup}
                  />
                </View>

                {/* Privacy Notice */}
                <Text style={[styles.privacyText, { color: colors.textMuted }]}>
                  Your personal information is safe with us and we'll not show
                  your date of birth or email to other users.
                </Text>

                {/* Spacer for Next Button */}
                <View style={styles.buttonSpacer} />
              </View>

              {/* Next Button - Fixed at bottom */}
              <NextButton
                onPress={handleNext}
                showText={true}
                textLabel="Next"
                size="medium"
              />
            </SafeAreaView>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: hp('100%'),
    position: 'relative',
  },
  contentWrapper: {
    flex: 1,
    position: 'relative',
    zIndex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollViewContent: {
    flexGrow: 1,
    backgroundColor: 'transparent',
  },
  buttonSpacer: {
    height: hp('8%'),
  },
  profilePhotosContainer: {
    position: 'absolute',
    top: hp('2%'),
    left: 0,
    right: 0,
    width: '100%',
    height: hp('35%'),
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '-10deg' }],
    zIndex: 1,
    overflow: 'visible',
  },
  profilePhotoWrapper: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    left: '50%',
    top: '50%',
  },
  profilePhoto: {
    borderRadius: 25,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  content: {
    paddingHorizontal: wp('9.7%'),
    marginTop: hp('42%'),
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: hp('4.5%'),
    width: '100%',
    paddingHorizontal: wp('2%'),
  },
  titleWrapper: {
    alignItems: 'center',
    position: 'relative',
    justifyContent: 'center',
    marginBottom: hp('2%'),
  },
  welcomeTitle: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: 40,
    lineHeight: 32,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  underline: {
    width: 173,
    height: 14,
    position: 'absolute',
    top: 21,
  },
  subtitleWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp('2%'),
    width: '100%',
  },
  subtitleText: {
    fontFamily: 'Comfortaa-SemiBold',
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'center',
    flexShrink: 1,
  },
  loginLink: {
    fontFamily: 'Comfortaa-SemiBold',
    fontSize: 16,
    lineHeight: 20,
  },
  inputsContainer: {
    gap: 12,
    marginBottom: hp('1.2%'),
  },
  inputGroup: {
    position: 'relative',
  },
  bioInputGroup: {
    position: 'relative',
  },
  privacyText: {
    fontFamily: 'Comfortaa-Regular',
    fontSize: 16,
    lineHeight: 17.84,
    textAlign: 'left',
  },
  datePickerContainer: {
    position: 'relative',
  },
  datePickerInputWrapper: {
    marginTop: 24,
  },
});


export default SignUpScreen;
