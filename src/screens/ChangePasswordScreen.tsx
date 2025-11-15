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
import { useTheme } from '../hooks/useTheme';
import { wp, hp } from '../utils/responsive';
import GradientButton from '../components/GradientButton';
import BackButton from '../components/BackButton';
import EyeIcon from '../components/icons/EyeIcon';
import GradientText from '../components/GradientText';
import { SettingsScreenNavigationProp } from '../navigation/types';
import { useNavigation } from '@react-navigation/native';

interface PasswordErrors {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

const ChangePasswordScreen: React.FC = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const { colors, isDark, gradients } = useTheme();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] =
    useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [errors, setErrors] = useState<PasswordErrors>({});

  // Validation functions
  const validateCurrentPassword = (password: string): string | undefined => {
    if (!password.trim()) {
      return 'Current password is required';
    }
    return undefined;
  };

  const validateNewPassword = (password: string): string | undefined => {
    if (!password.trim()) {
      return 'New password is required';
    }
    if (password.length < 8) {
      return 'Password must be at least 8 characters';
    }
    if (!/(?=.*[a-z])/.test(password)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/(?=.*\d)/.test(password)) {
      return 'Password must contain at least one number';
    }
    if (password === currentPassword) {
      return 'New password must be different from current password';
    }
    return undefined;
  };

  const validateConfirmPassword = (password: string): string | undefined => {
    if (!password.trim()) {
      return 'Please confirm your new password';
    }
    if (password !== newPassword) {
      return 'Passwords do not match';
    }
    return undefined;
  };

  const validateForm = (): boolean => {
    const newErrors: PasswordErrors = {};

    const currentPasswordError = validateCurrentPassword(currentPassword);
    if (currentPasswordError) {
      newErrors.currentPassword = currentPasswordError;
    }

    const newPasswordError = validateNewPassword(newPassword);
    if (newPasswordError) {
      newErrors.newPassword = newPasswordError;
    }

    const confirmPasswordError = validateConfirmPassword(confirmPassword);
    if (confirmPasswordError) {
      newErrors.confirmPassword = confirmPasswordError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // TODO: Implement password change API call
      console.log('Password change submitted');
      // Navigate back after successful password change
      navigation.goBack();
    }
  };

  const handleCurrentPasswordChange = (text: string) => {
    setCurrentPassword(text);
    if (errors.currentPassword) {
      setErrors(prev => ({ ...prev, currentPassword: undefined }));
    }
  };

  const handleNewPasswordChange = (text: string) => {
    setNewPassword(text);
    if (errors.newPassword) {
      setErrors(prev => ({ ...prev, newPassword: undefined }));
    }
  };

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    if (errors.confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: undefined }));
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
              <BackButton
                onPress={() => navigation.goBack()}
                size="medium"
                style={styles.backButton}
              />
              <Text
                style={[
                  styles.headerTitle,
                  {
                    color: isDark ? colors.textPrimary : colors.textQuaternary,
                  },
                ]}
              >
                Change Password
              </Text>
              <View style={styles.headerSpacer} />
            </View>

            {/* Content Section */}
            <View style={styles.content}>
              {/* Input Fields */}
              <View style={styles.inputsContainer}>
                {/* Current Password Input */}
                <View style={styles.inputGroup}>
                  <GradientText
                    colors={gradients.secondary}
                    style={styles.labelText}
                  >
                    CURRENT PASSWORD
                  </GradientText>
                  <View
                    style={[
                      styles.inputWrapper,
                      {
                        backgroundColor: isDark
                          ? colors.inputBackground
                          : '#F5F7F9',
                      },
                      focusedInput === 'currentPassword'
                        ? [
                            styles.inputWrapperFocused,
                            { borderColor: colors.accent },
                          ]
                        : errors.currentPassword
                        ? [styles.inputWrapperError, { borderColor: '#FF3B30' }]
                        : !isDark
                        ? [styles.inputWrapperLight, { borderColor: '#E8EAED' }]
                        : { borderColor: 'transparent' },
                    ]}
                  >
                    <TextInput
                      style={[styles.input, { color: colors.textPrimary }]}
                      placeholder="Current password"
                      placeholderTextColor={colors.placeholder}
                      value={currentPassword}
                      onChangeText={handleCurrentPasswordChange}
                      secureTextEntry={!isCurrentPasswordVisible}
                      onFocus={() => setFocusedInput('currentPassword')}
                      onBlur={() => setFocusedInput(null)}
                    />
                    <TouchableOpacity
                      onPress={() =>
                        setIsCurrentPasswordVisible(!isCurrentPasswordVisible)
                      }
                      style={styles.eyeIconButton}
                    >
                      <EyeIcon
                        width={24}
                        height={24}
                        color={colors.inputIconSecondary}
                      />
                    </TouchableOpacity>
                  </View>
                  {errors.currentPassword && (
                    <Text style={styles.errorText}>
                      {errors.currentPassword}
                    </Text>
                  )}
                </View>

                {/* New Password Input */}
                <View style={styles.inputGroup}>
                  <GradientText
                    colors={gradients.secondary}
                    style={styles.labelText}
                  >
                    NEW PASSWORD
                  </GradientText>
                  <View
                    style={[
                      styles.inputWrapper,
                      {
                        backgroundColor: isDark
                          ? colors.inputBackground
                          : '#F5F7F9',
                      },
                      focusedInput === 'newPassword'
                        ? [
                            styles.inputWrapperFocused,
                            { borderColor: colors.accent },
                          ]
                        : errors.newPassword
                        ? [styles.inputWrapperError, { borderColor: '#FF3B30' }]
                        : !isDark
                        ? [styles.inputWrapperLight, { borderColor: '#E8EAED' }]
                        : { borderColor: 'transparent' },
                    ]}
                  >
                    <TextInput
                      style={[styles.input, { color: colors.textPrimary }]}
                      placeholder="New password"
                      placeholderTextColor={colors.placeholder}
                      value={newPassword}
                      onChangeText={handleNewPasswordChange}
                      secureTextEntry={!isNewPasswordVisible}
                      onFocus={() => setFocusedInput('newPassword')}
                      onBlur={() => setFocusedInput(null)}
                    />
                    <TouchableOpacity
                      onPress={() =>
                        setIsNewPasswordVisible(!isNewPasswordVisible)
                      }
                      style={styles.eyeIconButton}
                    >
                      <EyeIcon
                        width={24}
                        height={24}
                        color={colors.inputIconSecondary}
                      />
                    </TouchableOpacity>
                  </View>
                  {errors.newPassword && (
                    <Text style={styles.errorText}>{errors.newPassword}</Text>
                  )}
                  {!errors.newPassword && newPassword.length > 0 && (
                    <Text style={styles.helperText}>
                      Must be at least 8 characters with uppercase, lowercase,
                      and number
                    </Text>
                  )}
                </View>

                {/* Confirm Password Input */}
                <View style={styles.inputGroup}>
                  <GradientText
                    colors={gradients.secondary}
                    style={styles.labelText}
                  >
                    CONFIRM NEW PASSWORD
                  </GradientText>
                  <View
                    style={[
                      styles.inputWrapper,
                      {
                        backgroundColor: isDark
                          ? colors.inputBackground
                          : '#F5F7F9',
                      },
                      focusedInput === 'confirmPassword'
                        ? [
                            styles.inputWrapperFocused,
                            { borderColor: colors.accent },
                          ]
                        : errors.confirmPassword
                        ? [styles.inputWrapperError, { borderColor: '#FF3B30' }]
                        : !isDark
                        ? [styles.inputWrapperLight, { borderColor: '#E8EAED' }]
                        : { borderColor: 'transparent' },
                    ]}
                  >
                    <TextInput
                      style={[styles.input, { color: colors.textPrimary }]}
                      placeholder="Confirm new password"
                      placeholderTextColor={colors.placeholder}
                      value={confirmPassword}
                      onChangeText={handleConfirmPasswordChange}
                      secureTextEntry={!isConfirmPasswordVisible}
                      onFocus={() => setFocusedInput('confirmPassword')}
                      onBlur={() => setFocusedInput(null)}
                    />
                    <TouchableOpacity
                      onPress={() =>
                        setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                      }
                      style={styles.eyeIconButton}
                    >
                      <EyeIcon
                        width={24}
                        height={24}
                        color={colors.inputIconSecondary}
                      />
                    </TouchableOpacity>
                  </View>
                  {errors.confirmPassword && (
                    <Text style={styles.errorText}>
                      {errors.confirmPassword}
                    </Text>
                  )}
                </View>
              </View>

              {/* Spacer for Button */}
              <View style={styles.buttonSpacer} />
            </View>
          </SafeAreaView>
        </View>

        {/* Change Password Button */}
        <View style={styles.buttonContainer}>
          <GradientButton onPress={handleSubmit} text="Change Password" />
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
    justifyContent: 'space-between',
    paddingHorizontal: wp('9.7%'),
    paddingTop: hp('2%'),
    paddingBottom: hp('2%'),
  },
  backButton: {
    position: 'relative',
    top: 0,
    left: 0,
  },
  headerTitle: {
    fontFamily: 'Comfortaa-Medium',
    fontSize: 22,
    lineHeight: 31,
    letterSpacing: 0.98,
    flex: 1,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    paddingHorizontal: wp('9.7%'),
    marginTop: hp('2%'),
  },
  inputsContainer: {
    gap: 12,
    marginBottom: hp('1.2%'),
  },
  inputGroup: {
    minHeight: 72,
    position: 'relative',
  },
  labelText: {
    fontFamily: 'Comfortaa-Medium',
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
    borderWidth: 1,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
    position: 'relative',
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
  inputWrapperError: {
    borderWidth: 1.5,
  },
  input: {
    fontFamily: 'Comfortaa-SemiBold',
    fontSize: 16,
    lineHeight: 20,
    paddingVertical: 0,
    flex: 1,
    zIndex: 1,
  },
  eyeIconButton: {
    padding: 4,
    zIndex: 1,
  },
  buttonContainer: {
    marginBottom: hp('5%'),
  },
  errorText: {
    fontFamily: 'Comfortaa-Regular',
    fontSize: 12,
    color: '#FF3B30',
    marginTop: 4,
    marginLeft: 17,
  },
  helperText: {
    fontFamily: 'Comfortaa-Regular',
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 4,
    marginLeft: 17,
  },
  buttonSpacer: {
    height: hp('8%'),
  },
});

export default ChangePasswordScreen;
