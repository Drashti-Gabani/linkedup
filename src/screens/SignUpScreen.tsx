import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../hooks/useTheme';
import { wp, hp } from '../utils/responsive';
import NextButton from '../components/NextButton';
import UserIcon from '../components/icons/UserIcon';
import EmailIcon from '../components/icons/EmailIcon';
import CalendarIcon from '../components/icons/CalendarIcon';
import CheckmarkIcon from '../components/icons/CheckmarkIcon';
import { AuthStackNavigationProp } from '../navigation/types';
import { useNavigation } from '@react-navigation/native';

const SignUpScreen: React.FC = () => {
  const navigation = useNavigation<AuthStackNavigationProp>();
  const { colors, mode } = useTheme();
  const isDark = mode === 'dark';

  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const inputBgColor = isDark ? '#2E2E2E' : '#F7F8FA';
  const titleColor = isDark ? '#FFFFFF' : '#171717';
  const labelColor = '#7B61FF';
  const inputTextColor = isDark ? '#FFFFFF' : '#171717';

  // Show checkmark when field has value
  const showFirstNameCheck = firstName.length > 0;
  const showEmailCheck = email.length > 0;
  const showBirthdateCheck = birthdate.length > 0;

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
          {/* Profile Photos Section - Overlapping Diagonal Layout */}
          <View style={styles.profilePhotosContainer}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces',
              }}
              style={[styles.profilePhoto, styles.profilePhotoLeft]}
              resizeMode="cover"
            />
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop&crop=faces',
              }}
              style={[styles.profilePhoto, styles.profilePhotoCenter]}
              resizeMode="cover"
            />
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=faces',
              }}
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
                  <View style={styles.titleWrapper}>
                    <Text style={[styles.welcomeTitle, { color: titleColor }]}>
                      Welcome
                    </Text>
                    {!isDark && <View style={styles.underline} />}
                  </View>

                  <View style={styles.subtitleWrapper}>
                    <Text style={styles.subtitleText}>
                      Sign up today for free! or{' '}
                    </Text>
                    <TouchableOpacity onPress={handleLogin} activeOpacity={0.7}>
                      <Text style={[styles.loginLink, { color: labelColor }]}>
                        Login
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Input Fields */}
                <View style={styles.inputsContainer}>
                  {/* First Name Input */}
                  <View style={styles.inputGroup}>
                    <Text style={[styles.labelText, { color: labelColor }]}>
                      FIRST NAME
                    </Text>
                    <View
                      style={[
                        styles.inputWrapper,
                        { backgroundColor: inputBgColor },
                        focusedInput === 'firstName' &&
                          styles.inputWrapperFocused,
                        !isDark &&
                          focusedInput !== 'firstName' &&
                          styles.inputWrapperLight,
                      ]}
                    >
                      <UserIcon width={13} height={14} color="#A8A8A8" />
                      <TextInput
                        style={[styles.input, { color: inputTextColor }]}
                        placeholder="Name"
                        placeholderTextColor="#A8A8A8"
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
                    <Text style={[styles.labelText, { color: labelColor }]}>
                      EMAIL
                    </Text>
                    <View
                      style={[
                        styles.inputWrapper,
                        { backgroundColor: inputBgColor },
                        focusedInput === 'email' && styles.inputWrapperFocused,
                        !isDark &&
                          focusedInput !== 'email' &&
                          styles.inputWrapperLight,
                      ]}
                    >
                      <EmailIcon width={16} height={12} color="#A8A8A8" />
                      <TextInput
                        style={[styles.input, { color: inputTextColor }]}
                        placeholder="jordan@defects.cc"
                        placeholderTextColor="#A8A8A8"
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
                    <Text style={[styles.labelText, { color: labelColor }]}>
                      BIRTHDATE
                    </Text>
                    <View
                      style={[
                        styles.inputWrapper,
                        { backgroundColor: inputBgColor },
                        focusedInput === 'birthdate' &&
                          styles.inputWrapperFocused,
                        !isDark &&
                          focusedInput !== 'birthdate' &&
                          styles.inputWrapperLight,
                      ]}
                    >
                      <CalendarIcon width={13} height={14} color="#A8A8A8" />
                      <TextInput
                        style={[styles.input, { color: inputTextColor }]}
                        placeholder="dd/mm/yy"
                        placeholderTextColor="#A8A8A8"
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
                <Text style={[styles.privacyText, { color: colors.muted }]}>
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  profilePhotoLeft: {
    left: '50%',
    marginLeft: -wp('90%'),
    zIndex: 1,
    // transform: [{ rotate: '-24deg' }],
  },
  profilePhotoCenter: {
    left: '50%',
    marginLeft: -wp('32.5%'),
    zIndex: 3,
    width: wp('65%'),
    height: wp('90%'),
    // transform: [{ rotate: '-24deg' }],
  },
  profilePhotoRight: {
    left: '50%',
    marginLeft: wp('35%'),
    zIndex: 2,
    // transform: [{ rotate: '-24deg' }],
  },
  content: {
    paddingHorizontal: wp('9.7%'),
    marginTop: hp('42%'),
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: hp('4.5%'),
  },
  titleWrapper: {
    alignItems: 'center',
    position: 'relative',
    justifyContent: 'center',
    marginBottom: hp('2%'),
  },
  welcomeTitle: {
    fontFamily: 'Comfortaa-Bold',
    fontWeight: '700',
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
    backgroundColor: '#F2F2F2',
    position: 'absolute',
    top: 21,
  },
  subtitleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitleText: {
    fontFamily: 'Comfortaa',
    fontWeight: '600',
    fontSize: 16,
    color: '#A7A7A7',
    lineHeight: 20,
    textAlign: 'center',
  },
  loginLink: {
    fontFamily: 'Comfortaa',
    fontWeight: '600',
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
    fontFamily: 'Comfortaa',
    fontWeight: '500',
    fontSize: 10,
    lineHeight: 15,
    letterSpacing: 0.5,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  inputWrapperLight: {
    borderWidth: 1,
    borderColor: '#F7F8FA',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  inputWrapperFocused: {
    borderWidth: 1.5,
    borderColor: '#9253FF',
  },
  input: {
    fontFamily: 'Comfortaa',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 20,
    paddingVertical: 0,
    flex: 1,
  },
  privacyText: {
    fontFamily: 'Comfortaa',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 17.84,
    textAlign: 'left',
  },
});

export default SignUpScreen;
