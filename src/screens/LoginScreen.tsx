import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
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
import EyeIcon from '../components/icons/EyeIcon';
import AppTextInput from '../components/AppTextInput';
import { AuthStackNavigationProp } from '../navigation/types';
import { useNavigation } from '@react-navigation/native';
import ScreenTitle from '../components/ScreenTitle';
import { AppImage } from '../utils/AppImage';

// ---------------------------------------------------------------------------
// Validation helpers
// ---------------------------------------------------------------------------
const formatPhoneNumber = (digits: string): string => {
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
};

const validateLogin = (phone: string, password: string) => {
  const errors: { phone?: string; password?: string } = {};
  const digits = phone.replace(/\D/g, '');
  if (!digits) {
    errors.phone = 'Phone number is required';
  } else if (digits.length !== 10) {
    errors.phone = 'Enter a valid 10-digit phone number';
  }
  if (!password) {
    errors.password = 'Password is required';
  } else if (password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }
  return errors;
};

// ---------------------------------------------------------------------------
// Screen
// ---------------------------------------------------------------------------
const LoginScreen: React.FC = () => {
  const navigation = useNavigation<AuthStackNavigationProp>();
  const { colors } = useTheme();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ phone?: string; password?: string }>({});
  const [submitted, setSubmitted] = useState(false);

  // Infinite carousel animation
  const { card0Style, card1Style, card2Style, cardImages, cardSizes } =
    useInfiniteCarousel();

  // Show checkmark only when the field is fully valid
  const showPhoneCheck = phoneNumber.replace(/\D/g, '').length === 10;
  const showPasswordCheck = password.length >= 8;

  const handlePhoneChange = (text: string) => {
    const digits = text.replace(/\D/g, '').slice(0, 10);
    setPhoneNumber(formatPhoneNumber(digits));
    if (submitted) setErrors(prev => ({ ...prev, phone: undefined }));
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (submitted) setErrors(prev => ({ ...prev, password: undefined }));
  };

  const handleSignUp = () => navigation.navigate('SignUp');

  const handleNext = () => {
    setSubmitted(true);
    const validationErrors = validateLogin(phoneNumber, password);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // TODO: replace with real auth call
    navigation.navigate('OTPVerify');
  };

  return (
    <KeyboardAvoidingView
      style={[styles.keyboardAvoidingView, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={[styles.container, { backgroundColor: colors.background }]}>
          {/* Profile Photos Section */}
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
                style={[styles.profilePhoto, { width: cardSizes[0].width, height: cardSizes[0].height }]}
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
                style={[styles.profilePhoto, { width: cardSizes[1].width, height: cardSizes[1].height }]}
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
                style={[styles.profilePhoto, { width: cardSizes[2].width, height: cardSizes[2].height }]}
                resizeMode="cover"
              />
            </Animated.View>
          </View>

          <View style={styles.contentWrapper}>
            <SafeAreaView style={styles.safeArea}>
              <View style={styles.content}>
                {/* Title */}
                <View style={styles.titleSection}>
                  <ScreenTitle
                    title="Login"
                    titleSize="large"
                    containerMarginBottom={hp('1%')}
                  />
                  <View style={styles.signUpWrapper}>
                    <Text style={[styles.signUpText, { color: colors.textMuted }]}>
                      Don't have an account?{' '}
                    </Text>
                    <TouchableOpacity onPress={handleSignUp} activeOpacity={0.7}>
                      <Text style={[styles.signUpLink, { color: colors.accentTertiary }]}>
                        Sign Up
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Input Fields */}
                <View style={styles.inputsContainer}>
                  {/* Phone Number */}
                  <AppTextInput
                    label="Phone Number"
                    placeholder="800-111-2222"
                    value={phoneNumber}
                    onChangeText={handlePhoneChange}
                    keyboardType="phone-pad"
                    returnKeyType="next"
                    maxLength={12}
                    leftIcon={<UserIcon width={13} height={14} color={colors.inputIcon} />}
                    showCheckmark={showPhoneCheck}
                    isFocused={focusedInput === 'phone'}
                    onFocus={() => setFocusedInput('phone')}
                    onBlur={() => setFocusedInput(null)}
                    error={errors.phone}
                    containerStyle={styles.inputGroup}
                  />

                  {/* Password */}
                  <View style={styles.passwordGroup}>
                    <AppTextInput
                      label="Password"
                      placeholder="Password"
                      value={password}
                      onChangeText={handlePasswordChange}
                      secureTextEntry={!isPasswordVisible}
                      returnKeyType="done"
                      showCheckmark={showPasswordCheck}
                      isFocused={focusedInput === 'password'}
                      onFocus={() => setFocusedInput('password')}
                      onBlur={() => setFocusedInput(null)}
                      error={errors.password}
                      containerStyle={styles.inputGroup}
                      rightElement={
                        <TouchableOpacity
                          onPress={() => setIsPasswordVisible(v => !v)}
                          style={styles.eyeIconButton}
                          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                        >
                          <EyeIcon
                            width={24}
                            height={24}
                            color={colors.inputIconSecondary}
                          />
                        </TouchableOpacity>
                      }
                    />
                    <TouchableOpacity
                      onPress={() => navigation.navigate('ForgotPassword')}
                      style={styles.forgotPasswordLink}
                    >
                      <Text style={[styles.forgotPasswordText, { color: colors.accentTertiary }]}>
                        Forgot Password?
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.buttonSpacer} />
              </View>

              {/* Next Button */}
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

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------
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
  signUpWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    paddingHorizontal: wp('5%'),
    maxWidth: '100%',
    marginTop: hp('2.2%'),
  },
  signUpText: {
    fontFamily: 'Comfortaa-SemiBold',
    fontSize: 15,
    lineHeight: 20,
    textAlign: 'center',
  },
  signUpLink: {
    fontFamily: 'Comfortaa-SemiBold',
    fontSize: 15,
    lineHeight: 20,
  },
  inputsContainer: {
    gap: 12,
    marginBottom: hp('1.2%'),
  },
  inputGroup: {
    position: 'relative',
  },
  passwordGroup: {
    position: 'relative',
  },
  eyeIconButton: {
    padding: 4,
  },
  forgotPasswordLink: {
    alignSelf: 'flex-end',
    marginTop: 8,
    paddingRight: 4,
  },
  forgotPasswordText: {
    fontFamily: 'Comfortaa-SemiBold',
    fontSize: 13,
    lineHeight: 18,
  },
});

export default LoginScreen;
