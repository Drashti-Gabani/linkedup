import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../hooks/useTheme';
import { wp, hp } from '../utils/responsive';
import NextButton from '../components/NextButton';
import UserIcon from '../components/icons/UserIcon';
import EyeIcon from '../components/icons/EyeIcon';
import CheckmarkIcon from '../components/icons/CheckmarkIcon';
import { AuthStackNavigationProp } from '../navigation/types';
import { useNavigation } from '@react-navigation/native';
import ScreenTitle from '../components/ScreenTitle';
import { onboardingImages } from '../assets/images';

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<AuthStackNavigationProp>();
  const { colors, isDark } = useTheme();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  // Show checkmark when field has value
  const showPhoneCheck = phoneNumber.length > 0;
  const showPasswordCheck = password.length > 0;

  const handleSignUp = () => {
    navigation.navigate('SignUp');
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
          {/* Profile Photos Section - Overlapping Diagonal Layout */}
          <View style={styles.profilePhotosContainer}>
            <Image
              source={onboardingImages.carousel1}
              style={[styles.profilePhoto, styles.profilePhotoLeft]}
              resizeMode="cover"
            />
            <Image
              source={onboardingImages.carousel3}
              style={[styles.profilePhoto, styles.profilePhotoCenter]}
              resizeMode="cover"
            />
            <Image
              source={onboardingImages.carousel2}
              style={[styles.profilePhoto, styles.profilePhotoRight]}
              resizeMode="cover"
            />
          </View>

          <View style={styles.contentWrapper}>
            <SafeAreaView style={styles.safeArea}>
              {/* Content Section */}
              <View style={styles.content}>
                {/* Title Section */}
                <View style={styles.titleSection}>
                  <ScreenTitle
                    title="Login"
                    titleSize="large"
                    containerMarginBottom={hp('1%')}
                  />

                  <View style={styles.signUpWrapper}>
                    <Text
                      style={[styles.signUpText, { color: colors.textMuted }]}
                    >
                      Don't have an account?{' '}
                    </Text>
                    <TouchableOpacity
                      onPress={handleSignUp}
                      activeOpacity={0.7}
                    >
                      <Text
                        style={[
                          styles.signUpLink,
                          { color: colors.accentTertiary },
                        ]}
                      >
                        Sign Up
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Input Fields */}
                <View style={styles.inputsContainer}>
                  {/* Phone Number Input */}
                  <View style={styles.inputGroup}>
                    <Text
                      style={[
                        styles.labelText,
                        { color: colors.accentTertiary },
                      ]}
                    >
                      PHONE NUMBER
                    </Text>
                    <View
                      style={[
                        styles.inputWrapper,
                        { backgroundColor: colors.inputBackground },
                        focusedInput === 'phoneNumber' && [
                          styles.inputWrapperFocused,
                          { borderColor: colors.accent },
                        ],
                        !isDark &&
                          focusedInput !== 'phoneNumber' && [
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
                        placeholder="Phone number"
                        placeholderTextColor={colors.placeholder}
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                        keyboardType="phone-pad"
                        onFocus={() => setFocusedInput('phoneNumber')}
                        onBlur={() => setFocusedInput(null)}
                      />
                      {showPhoneCheck && (
                        <CheckmarkIcon width={10} height={8} />
                      )}
                    </View>
                  </View>

                  {/* Password Input */}
                  <View style={styles.inputGroup}>
                    <Text
                      style={[
                        styles.labelText,
                        { color: colors.accentTertiary },
                      ]}
                    >
                      PASSWORD
                    </Text>
                    <View
                      style={[
                        styles.inputWrapper,
                        { backgroundColor: colors.inputBackground },
                        focusedInput === 'password' && [
                          styles.inputWrapperFocused,
                          { borderColor: colors.accent },
                        ],
                        !isDark &&
                          focusedInput !== 'password' && [
                            styles.inputWrapperLight,
                            { borderColor: colors.borderLight },
                          ],
                      ]}
                    >
                      <TextInput
                        style={[styles.input, { color: colors.textPrimary }]}
                        placeholder="Password"
                        placeholderTextColor={colors.placeholder}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!isPasswordVisible}
                        onFocus={() => setFocusedInput('password')}
                        onBlur={() => setFocusedInput(null)}
                      />
                      <TouchableOpacity
                        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                        style={styles.eyeIconButton}
                      >
                        <EyeIcon
                          width={24}
                          height={24}
                          color={colors.inputIconSecondary}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                {/* Spacer for Next Button */}
                <View style={styles.buttonSpacer} />
              </View>

              {/* Next Button - Fixed at bottom */}
              <NextButton
                onPress={() => {
                  navigation.navigate('OTP');
                }}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '-10deg' }],
    zIndex: 1,
    overflow: 'visible',
  },
  profilePhoto: {
    position: 'absolute',
    width: wp('55%'),
    height: wp('72%'),
    borderRadius: 25,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  profilePhotoLeft: {
    left: '50%',
    marginLeft: -wp('90%'),
    zIndex: 1,
  },
  profilePhotoCenter: {
    left: '50%',
    marginLeft: -wp('32.5%'),
    zIndex: 3,
    width: wp('65%'),
    height: wp('90%'),
  },
  profilePhotoRight: {
    left: '50%',
    marginLeft: wp('35%'),
    zIndex: 2,
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
  eyeIconButton: {
    padding: 4,
  },
});

export default LoginScreen;
