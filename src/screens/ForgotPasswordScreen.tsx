import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../hooks/useTheme';
import { wp, hp } from '../utils/responsive';
import GradientButton from '../components/GradientButton';
import EmailIcon from '../components/icons/EmailIcon';
import { AuthStackNavigationProp } from '../navigation/types';
import { useNavigation } from '@react-navigation/native';
import AppTextInput from '../components/AppTextInput';

interface EmailErrors {
  email?: string;
}

const ForgotPasswordScreen: React.FC = () => {
  const navigation = useNavigation<AuthStackNavigationProp>();
  const { colors, isDark, gradients } = useTheme();

  const [email, setEmail] = useState('');
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [errors, setErrors] = useState<EmailErrors>({});

  // Show checkmark when field has value
  const showEmailCheck = email.length > 0;

  // Validation functions
  const validateEmail = (emailValue: string): string | undefined => {
    if (!emailValue.trim()) {
      return 'Email is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
      return 'Please enter a valid email address';
    }
    return undefined;
  };

  const validateForm = (): boolean => {
    const newErrors: EmailErrors = {};

    const emailError = validateEmail(email);
    if (emailError) {
      newErrors.email = emailError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    navigation.goBack();
    // if (validateForm()) {
    //   // TODO: Implement forgot password API call
    //   console.log('Forgot password submitted for:', email);
    //   // Show success message or navigate to confirmation screen
    // }
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: undefined }));
    }
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
          <SafeAreaView style={styles.safeArea}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.backButtonContainer}>
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => navigation.goBack()}
                >
                  <View
                    style={[
                      styles.headerButtonContainer,
                      { backgroundColor: colors.headerButtonBackground },
                    ]}
                  >
                    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                      <Path
                        d="M15 18L9 12L15 6"
                        stroke={colors.headerButtonIcon}
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </Svg>
                  </View>
                </TouchableOpacity>
              </View>
              <Text
                style={[
                  styles.headerTitle,
                  {
                    color: isDark ? colors.textPrimary : colors.textQuaternary,
                  },
                ]}
              >
                Forgot PIN
              </Text>
              <View style={styles.backButtonContainer} />
            </View>

            {/* Content Section */}
            <View style={styles.content}>
              {/* Description Text */}
              <Text
                style={[styles.descriptionText, { color: colors.textMuted }]}
              >
                Enter your email address and we'll send you a link to reset your
                password.
              </Text>

              {/* Input Fields */}
              <View style={styles.inputsContainer}>
                {/* Email Input */}
                <AppTextInput
                  label="EMAIL"
                  placeholder="Email address"
                  value={email}
                  onChangeText={handleEmailChange}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="done"
                  leftIcon={<EmailIcon width={16} height={12} color={colors.inputIcon} />}
                  showCheckmark={showEmailCheck}
                  isFocused={focusedInput === 'email'}
                  onFocus={() => setFocusedInput('email')}
                  onBlur={() => setFocusedInput(null)}
                  error={errors.email}
                  containerStyle={styles.inputGroup}
                />
              </View>

              {/* Spacer for Button */}
              <View style={styles.buttonSpacer} />
            </View>
          </SafeAreaView>
        </View>

        {/* Send Link Button */}
        <View style={styles.buttonContainer}>
          <GradientButton onPress={handleSubmit} text="Send Link" />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp('9.7%'),
    paddingTop: hp('2%'),
    paddingBottom: hp('2%'),
  },
  backButtonContainer: {
    width: wp('11.6%'),
    height: hp('6%'),
  },
  backButton: {
    width: '100%',
    height: '100%',
  },
  headerButtonContainer: {
    flex: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Comfortaa-Medium',
    fontSize: 22,
    lineHeight: 31,
    letterSpacing: 0.98,
    flex: 1,
    textAlign: 'center',
  },
  content: {
    paddingHorizontal: wp('9.7%'),
    marginTop: hp('2%'),
  },
  descriptionText: {
    fontFamily: 'Comfortaa-Regular',
    fontSize: 15,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: hp('2%'),
    paddingHorizontal: wp('2%'),
  },
  inputsContainer: {
    gap: 12,
    marginBottom: hp('1.2%'),
  },
  inputGroup: {
    position: 'relative',
  },
  buttonContainer: {
    marginBottom: hp('5%'),
  },
  buttonSpacer: {
    height: hp('8%'),
  },
});

export default ForgotPasswordScreen;
