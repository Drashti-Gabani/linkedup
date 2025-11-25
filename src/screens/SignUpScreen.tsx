import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { AnimatedAppImage } from '../utils/AppImage';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  useAnimatedReaction,
} from 'react-native-reanimated';
import { useTheme } from '../hooks/useTheme';
import { wp, hp } from '../utils/responsive';
import NextButton from '../components/NextButton';
import UserIcon from '../components/icons/UserIcon';
import EmailIcon from '../components/icons/EmailIcon';
import CalendarIcon from '../components/icons/CalendarIcon';
import CheckmarkIcon from '../components/icons/CheckmarkIcon';
import { AuthStackNavigationProp } from '../navigation/types';
import { useNavigation } from '@react-navigation/native';
import ScreenTitle from '../components/ScreenTitle';
import { onboardingImages } from '../assets/images';
import { AppImage } from '../utils/AppImage';

const SignUpScreen: React.FC = () => {
  const navigation = useNavigation<AuthStackNavigationProp>();
  const { colors, isDark } = useTheme();

  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  // Show checkmark when field has value
  const showFirstNameCheck = firstName.length > 0;
  const showEmailCheck = email.length > 0;
  const showBirthdateCheck = birthdate.length > 0;

  // Horizontal train animation
  const translateX = useSharedValue(0);

  // Animation constants
  const ANIMATION_DURATION = 20000; // 20 seconds for one full cycle
  const CARD_IMAGES = [
    onboardingImages.carousel1,
    onboardingImages.carousel3,
    onboardingImages.carousel2,
  ];
  // Card dimensions (extracted as constants for worklet access)
  const CARD0_WIDTH = wp('55%');
  const CARD0_HEIGHT = wp('72%');
  const CARD1_WIDTH = wp('65%');
  const CARD1_HEIGHT = wp('90%');
  const CARD2_WIDTH = wp('55%');
  const CARD2_HEIGHT = wp('72%');
  const CARD_SIZES = [
    { width: CARD0_WIDTH, height: CARD0_HEIGHT },
    { width: CARD1_WIDTH, height: CARD1_HEIGHT },
    { width: CARD2_WIDTH, height: CARD2_HEIGHT },
  ];

  // Calculate spacing and train unit for seamless loop
  const CARD_SPACING = wp('8%'); // Small gap between cards
  const TRAIN_UNIT = CARD1_WIDTH + CARD_SPACING; // Average spacing unit
  const TRAVEL_DISTANCE = TRAIN_UNIT * 3; // Total distance for one cycle

  // Track previous value to detect when we cross the threshold
  const prevValue = useSharedValue(0);

  // Use animated reaction to extend animation before it resets
  useAnimatedReaction(
    () => translateX.value,
    (currentValue, previousValue) => {
      'worklet';
      // When value crosses from below TRAVEL_DISTANCE to at/above it, extend
      // This prevents any visible reset by continuously incrementing the value
      if (
        previousValue !== null &&
        previousValue < TRAVEL_DISTANCE &&
        currentValue >= TRAVEL_DISTANCE
      ) {
        // Extend by another TRAVEL_DISTANCE - value never resets
        translateX.value = withTiming(currentValue + TRAVEL_DISTANCE, {
          duration: ANIMATION_DURATION,
        });
      }
      prevValue.value = currentValue;
    },
    [prevValue],
  );

  // Start the continuous horizontal train animation
  useEffect(() => {
    translateX.value = 0;
    prevValue.value = 0;
    // Start initial animation
    translateX.value = withTiming(TRAVEL_DISTANCE, {
      duration: ANIMATION_DURATION,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Helper function to get wrapped position for seamless loop
  const getWrappedPosition = (baseOffset: number, progress: number): number => {
    'worklet';
    // Use modulo to wrap continuously
    const wrapped =
      ((progress % TRAVEL_DISTANCE) + TRAVEL_DISTANCE) % TRAVEL_DISTANCE;
    return baseOffset + wrapped;
  };

  // Create animated styles for each card with seamless wrapping
  const card0AnimatedStyle = useAnimatedStyle(() => {
    'worklet';
    // Card 0 starts at leftmost position (-2 units)
    // When it reaches right side, it wraps to left seamlessly
    const position = getWrappedPosition(-TRAIN_UNIT * 2, translateX.value);

    // Calculate distance from screen center (0) for effects
    const distanceFromCenter = Math.abs(position);
    const maxDistance = TRAIN_UNIT * 1.5;
    const normalizedDistance = Math.min(distanceFromCenter / maxDistance, 1);

    // Center card (closest to 0) should be in front
    const zIndex = Math.round(interpolate(normalizedDistance, [0, 1], [3, 1]));
    const scale = interpolate(normalizedDistance, [0, 1], [1.0, 0.9]);
    const opacity = interpolate(normalizedDistance, [0, 1], [1.0, 0.85]);

    return {
      transform: [
        { translateX: position - CARD0_WIDTH / 2 },
        { translateY: -CARD0_HEIGHT / 2 },
        { scale },
      ],
      zIndex,
      opacity,
    };
  });

  const card1AnimatedStyle = useAnimatedStyle(() => {
    'worklet';
    // Card 1 starts at center-left position (-1 unit)
    const position = getWrappedPosition(-TRAIN_UNIT, translateX.value);

    const distanceFromCenter = Math.abs(position);
    const maxDistance = TRAIN_UNIT * 1.5;
    const normalizedDistance = Math.min(distanceFromCenter / maxDistance, 1);

    const zIndex = Math.round(interpolate(normalizedDistance, [0, 1], [3, 1]));
    const scale = interpolate(normalizedDistance, [0, 1], [1.0, 0.9]);
    const opacity = interpolate(normalizedDistance, [0, 1], [1.0, 0.85]);

    return {
      transform: [
        { translateX: position - CARD1_WIDTH / 2 },
        { translateY: -CARD1_HEIGHT / 2 },
        { scale },
      ],
      zIndex,
      opacity,
    };
  });

  const card2AnimatedStyle = useAnimatedStyle(() => {
    'worklet';
    // Card 2 starts at center position (0)
    // When it moves right and wraps, it seamlessly continues from left
    const position = getWrappedPosition(0, translateX.value);

    const distanceFromCenter = Math.abs(position);
    const maxDistance = TRAIN_UNIT * 1.5;
    const normalizedDistance = Math.min(distanceFromCenter / maxDistance, 1);

    const zIndex = Math.round(interpolate(normalizedDistance, [0, 1], [3, 1]));
    const scale = interpolate(normalizedDistance, [0, 1], [1.0, 0.9]);
    const opacity = interpolate(normalizedDistance, [0, 1], [1.0, 0.85]);

    return {
      transform: [
        { translateX: position - CARD2_WIDTH / 2 },
        { translateY: -CARD2_HEIGHT / 2 },
        { scale },
      ],
      zIndex,
      opacity,
    };
  });

  const handleNext = () => {
    navigation.navigate('GenderSelection');
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <KeyboardAvoidingView
      style={[
        styles.keyboardAvoidingView,
        { backgroundColor: colors.background },
      ]}
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
        <View
          style={[styles.container, { backgroundColor: colors.background }]}
        >
          {/* Profile Photos Section - Circular Rotation Animation */}
          <View style={styles.profilePhotosContainer}>
            <Animated.View
              style={[
                styles.profilePhotoWrapper,
                {
                  width: CARD_SIZES[0].width,
                  height: CARD_SIZES[0].height,
                },
                card0AnimatedStyle,
              ]}
            >
              <AppImage
                source={CARD_IMAGES[0]}
                style={[
                  styles.profilePhoto,
                  {
                    width: CARD_SIZES[0].width,
                    height: CARD_SIZES[0].height,
                  },
                ]}
                resizeMode="cover"
              />
            </Animated.View>
            <Animated.View
              style={[
                styles.profilePhotoWrapper,
                {
                  width: CARD_SIZES[1].width,
                  height: CARD_SIZES[1].height,
                },
                card1AnimatedStyle,
              ]}
            >
              <AppImage
                source={CARD_IMAGES[1]}
                style={[
                  styles.profilePhoto,
                  {
                    width: CARD_SIZES[1].width,
                    height: CARD_SIZES[1].height,
                  },
                ]}
                resizeMode="cover"
              />
            </Animated.View>
            <Animated.View
              style={[
                styles.profilePhotoWrapper,
                {
                  width: CARD_SIZES[2].width,
                  height: CARD_SIZES[2].height,
                },
                card2AnimatedStyle,
              ]}
            >
              <AppImage
                source={CARD_IMAGES[2]}
                style={[
                  styles.profilePhoto,
                  {
                    width: CARD_SIZES[2].width,
                    height: CARD_SIZES[2].height,
                  },
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
                  <View style={styles.inputGroup}>
                    <Text
                      style={[
                        styles.labelText,
                        { color: colors.accentTertiary },
                      ]}
                    >
                      FIRST NAME
                    </Text>
                    <View
                      style={[
                        styles.inputWrapper,
                        { backgroundColor: colors.fieldBackground },
                        focusedInput === 'firstName' && [
                          styles.inputWrapperFocused,
                          { borderColor: colors.accent },
                        ],
                        !isDark &&
                          focusedInput !== 'firstName' && [
                            styles.inputWrapperLight,
                            { borderColor: colors.borderLight },
                          ],
                      ]}
                    >
                      <UserIcon
                        width={13}
                        height={14}
                        color={colors.inputIcon}
                      />
                      <TextInput
                        style={[styles.input, { color: colors.textPrimary }]}
                        placeholder="Name"
                        placeholderTextColor={colors.placeholder}
                        value={firstName}
                        onChangeText={setFirstName}
                        onFocus={() => setFocusedInput('firstName')}
                        onBlur={() => setFocusedInput(null)}
                      />
                      {showFirstNameCheck && (
                        <CheckmarkIcon width={10} height={8} />
                      )}
                    </View>
                  </View>

                  {/* Email Input */}
                  <View style={styles.inputGroup}>
                    <Text
                      style={[
                        styles.labelText,
                        { color: colors.accentTertiary },
                      ]}
                    >
                      EMAIL
                    </Text>
                    <View
                      style={[
                        styles.inputWrapper,
                        { backgroundColor: colors.fieldBackground },
                        focusedInput === 'email' && [
                          styles.inputWrapperFocused,
                          { borderColor: colors.accent },
                        ],
                        !isDark &&
                          focusedInput !== 'email' && [
                            styles.inputWrapperLight,
                            { borderColor: colors.borderLight },
                          ],
                      ]}
                    >
                      <EmailIcon
                        width={16}
                        height={12}
                        color={colors.inputIcon}
                      />
                      <TextInput
                        style={[styles.input, { color: colors.textPrimary }]}
                        placeholder="jordan@defects.cc"
                        placeholderTextColor={colors.placeholder}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onFocus={() => setFocusedInput('email')}
                        onBlur={() => setFocusedInput(null)}
                      />
                      {showEmailCheck && (
                        <CheckmarkIcon width={10} height={8} />
                      )}
                    </View>
                  </View>

                  {/* Birthdate Input */}
                  <View style={styles.inputGroup}>
                    <Text
                      style={[
                        styles.labelText,
                        { color: colors.accentTertiary },
                      ]}
                    >
                      BIRTHDATE
                    </Text>
                    <View
                      style={[
                        styles.inputWrapper,
                        { backgroundColor: colors.fieldBackground },
                        focusedInput === 'birthdate' && [
                          styles.inputWrapperFocused,
                          { borderColor: colors.accent },
                        ],
                        !isDark &&
                          focusedInput !== 'birthdate' && [
                            styles.inputWrapperLight,
                            { borderColor: colors.borderLight },
                          ],
                      ]}
                    >
                      <CalendarIcon
                        width={13}
                        height={14}
                        color={colors.inputIcon}
                      />
                      <TextInput
                        style={[styles.input, { color: colors.textPrimary }]}
                        placeholder="dd/mm/yy"
                        placeholderTextColor={colors.placeholder}
                        value={birthdate}
                        onChangeText={setBirthdate}
                        onFocus={() => setFocusedInput('birthdate')}
                        onBlur={() => setFocusedInput(null)}
                      />
                      {showBirthdateCheck && (
                        <CheckmarkIcon width={10} height={8} />
                      )}
                    </View>
                  </View>
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
    height: 72,
    position: 'relative',
  },
  labelText: {
    fontFamily: 'Comfortaa-Regular',
    fontSize: 11,
    textTransform: 'uppercase',
    position: 'absolute',
    top: 0,
    left: 17,
    zIndex: 1,
  },
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
  inputWrapperLight: {
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  inputWrapperFocused: {
    borderWidth: 1.5,
  },
  input: {
    fontFamily: 'Comfortaa-SemiBold',
    fontSize: 16,
    lineHeight: 20,
    paddingVertical: 0,
    flex: 1,
  },
  privacyText: {
    fontFamily: 'Comfortaa-Regular',
    fontSize: 16,
    lineHeight: 17.84,
    textAlign: 'left',
  },
});

export default SignUpScreen;
