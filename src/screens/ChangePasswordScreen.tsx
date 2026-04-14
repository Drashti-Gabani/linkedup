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
import EyeIcon from '../components/icons/EyeIcon';
import { SettingsScreenNavigationProp } from '../navigation/types';
import { useNavigation } from '@react-navigation/native';
import AppTextInput from '../components/AppTextInput';

interface PINErrors {
  currentPIN?: string;
  newPIN?: string;
  confirmPIN?: string;
}

const ChangePasswordScreen: React.FC = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const { colors, isDark, gradients } = useTheme();

  const [currentPIN, setCurrentPIN] = useState('');
  const [newPIN, setNewPIN] = useState('');
  const [confirmPIN, setConfirmPIN] = useState('');
  const [isCurrentPINVisible, setIsCurrentPINVisible] = useState(false);
  const [isNewPINVisible, setIsNewPINVisible] = useState(false);
  const [isConfirmPINVisible, setIsConfirmPINVisible] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [errors, setErrors] = useState<PINErrors>({});

  // Validation functions
  const validateCurrentPIN = (pin: string): string | undefined => {
    if (!pin.trim()) {
      return 'Current PIN is required';
    }
    return undefined;
  };

  const validateNewPIN = (pin: string): string | undefined => {
    if (!pin.trim()) {
      return 'New PIN is required';
    }
    if (pin.length < 4) {
      return 'PIN must be at least 4 digits';
    }
    if (!/^\d+$/.test(pin)) {
      return 'PIN must contain only numbers';
    }
    if (pin === currentPIN) {
      return 'New PIN must be different from current PIN';
    }
    return undefined;
  };

  const validateConfirmPIN = (pin: string): string | undefined => {
    if (!pin.trim()) {
      return 'Please confirm your new PIN';
    }
    if (pin !== newPIN) {
      return 'PINs do not match';
    }
    return undefined;
  };

  const validateForm = (): boolean => {
    const newErrors: PINErrors = {};

    const currentPINError = validateCurrentPIN(currentPIN);
    if (currentPINError) {
      newErrors.currentPIN = currentPINError;
    }

    const newPINError = validateNewPIN(newPIN);
    if (newPINError) {
      newErrors.newPIN = newPINError;
    }

    const confirmPINError = validateConfirmPIN(confirmPIN);
    if (confirmPINError) {
      newErrors.confirmPIN = confirmPINError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // TODO: Implement PIN change API call
      console.log('PIN change submitted');
      // Navigate back after successful PIN change
      navigation.goBack();
    }
  };

  const handleCurrentPINChange = (text: string) => {
    setCurrentPIN(text);
    if (errors.currentPIN) {
      setErrors(prev => ({ ...prev, currentPIN: undefined }));
    }
  };

  const handleNewPINChange = (text: string) => {
    setNewPIN(text);
    if (errors.newPIN) {
      setErrors(prev => ({ ...prev, newPIN: undefined }));
    }
  };

  const handleConfirmPINChange = (text: string) => {
    setConfirmPIN(text);
    if (errors.confirmPIN) {
      setErrors(prev => ({ ...prev, confirmPIN: undefined }));
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
                Change PIN
              </Text>
              <View style={styles.backButtonContainer} />
            </View>

            {/* Content Section */}
            <View style={styles.content}>
              {/* Input Fields */}
              <View style={styles.inputsContainer}>
                {/* Current PIN Input */}
                {/* Current PIN Input */}
                <AppTextInput
                  label="CURRENT PIN"
                  placeholder="Current PIN"
                  value={currentPIN}
                  onChangeText={handleCurrentPINChange}
                  secureTextEntry={!isCurrentPINVisible}
                  keyboardType="numeric"
                  returnKeyType="done"
                  isFocused={focusedInput === 'currentPIN'}
                  onFocus={() => setFocusedInput('currentPIN')}
                  onBlur={() => setFocusedInput(null)}
                  error={errors.currentPIN}
                  containerStyle={styles.inputGroup}
                  rightElement={
                    <TouchableOpacity
                      onPress={() => setIsCurrentPINVisible(!isCurrentPINVisible)}
                      style={styles.eyeIconButton}
                    >
                      <EyeIcon
                        width={24}
                        height={24}
                        color={colors.inputIconSecondary}
                      />
                    </TouchableOpacity>
                  }
                />

                {/* New PIN Input */}
                {/* New PIN Input */}
                <View style={styles.inputGroupWrapper}>
                  <AppTextInput
                    label="NEW PIN"
                    placeholder="New PIN"
                    value={newPIN}
                    onChangeText={handleNewPINChange}
                    secureTextEntry={!isNewPINVisible}
                    keyboardType="numeric"
                    returnKeyType="done"
                    isFocused={focusedInput === 'newPIN'}
                    onFocus={() => setFocusedInput('newPIN')}
                    onBlur={() => setFocusedInput(null)}
                    error={errors.newPIN}
                    containerStyle={styles.inputGroup}
                    rightElement={
                      <TouchableOpacity
                        onPress={() => setIsNewPINVisible(!isNewPINVisible)}
                        style={styles.eyeIconButton}
                      >
                        <EyeIcon
                          width={24}
                          height={24}
                          color={colors.inputIconSecondary}
                        />
                      </TouchableOpacity>
                    }
                  />
                  {!errors.newPIN && newPIN.length > 0 && (
                    <Text style={styles.helperText}>
                      Must be at least 4 digits
                    </Text>
                  )}
                </View>

                {/* Confirm PIN Input */}
                {/* Confirm PIN Input */}
                <AppTextInput
                  label="CONFIRM NEW PIN"
                  placeholder="Confirm new PIN"
                  value={confirmPIN}
                  onChangeText={handleConfirmPINChange}
                  secureTextEntry={!isConfirmPINVisible}
                  keyboardType="numeric"
                  returnKeyType="done"
                  isFocused={focusedInput === 'confirmPIN'}
                  onFocus={() => setFocusedInput('confirmPIN')}
                  onBlur={() => setFocusedInput(null)}
                  error={errors.confirmPIN}
                  containerStyle={styles.inputGroup}
                  rightElement={
                    <TouchableOpacity
                      onPress={() => setIsConfirmPINVisible(!isConfirmPINVisible)}
                      style={styles.eyeIconButton}
                    >
                      <EyeIcon
                        width={24}
                        height={24}
                        color={colors.inputIconSecondary}
                      />
                    </TouchableOpacity>
                  }
                />
              </View>

              {/* Spacer for Button */}
              <View style={styles.buttonSpacer} />
            </View>
          </SafeAreaView>
        </View>

        {/* Change PIN Button */}
        <View style={styles.buttonContainer}>
          <GradientButton onPress={handleSubmit} text="Change PIN" />
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
  inputsContainer: {
    gap: 12,
    marginBottom: hp('1.2%'),
  },
  inputGroupWrapper: {
    position: 'relative',
  },
  inputGroup: {
    position: 'relative',
  },
  eyeIconButton: {
    padding: 4,
  },
  buttonContainer: {
    marginBottom: hp('5%'),
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
