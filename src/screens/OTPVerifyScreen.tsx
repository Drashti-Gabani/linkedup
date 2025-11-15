import React, { useState, useRef } from 'react';
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
import { useTheme } from '../hooks/useTheme';
import { wp, hp } from '../utils/responsive';
import { AuthStackNavigationProp } from '../navigation/types';
import BackButton from '../components/BackButton';
import GradientButton from '../components/GradientButton';

const OTPVerifyScreen: React.FC = () => {
  const { colors, gradients } = useTheme();
  const navigation = useNavigation<AuthStackNavigationProp>();

  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleOtpChange = (value: string, index: number) => {
    if (value.length > 1) {
      value = value.charAt(value.length - 1);
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleContinue = () => {
    // Handle OTP verification logic
    console.log('OTP:', otp.join(''));
    // Navigate to RelationshipType screen after verification
    navigation.navigate('RelationshipType');
  };

  const handleResend = () => {
    // Handle resend OTP logic
    console.log('Resending OTP...');
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
                  Enter the 4{'\n'}digit code.
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
                  Enter the 4{'\n'}digit code.
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
              Enter the 4 digit code sent to your device to verify your account.
            </Text>
          </View>

          {/* Middle Section - OTP Input Boxes */}
          <View style={styles.middleSection}>
            <View style={styles.otpContainer}>
              {[0, 1, 2, 3].map(index => {
                const isFilled = otp[index] !== '';

                return (
                  <View key={index} style={styles.otpBoxWrapper}>
                    {isFilled ? (
                      <LinearGradient
                        colors={gradients.secondary}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        angle={242}
                        style={[styles.otpBox, styles.otpBoxFilled]}
                      >
                        <TextInput
                          ref={ref => {
                            inputRefs.current[index] = ref;
                          }}
                          style={[
                            styles.otpInput,
                            { color: colors.iconSelected },
                          ]}
                          value={otp[index]}
                          onChangeText={value => handleOtpChange(value, index)}
                          onKeyPress={e => handleKeyPress(e, index)}
                          keyboardType="number-pad"
                          maxLength={1}
                          selectTextOnFocus
                        />
                      </LinearGradient>
                    ) : (
                      <View
                        style={[
                          styles.otpBox,
                          styles.otpBoxEmptyLight,
                          {
                            backgroundColor: colors.fieldBackground,
                            borderColor: colors.otpBoxEmptyBorder,
                          },
                        ]}
                      >
                        <TextInput
                          ref={ref => {
                            inputRefs.current[index] = ref;
                          }}
                          style={[
                            styles.otpInput,
                            { color: colors.otpBoxText },
                          ]}
                          value={otp[index]}
                          onChangeText={value => handleOtpChange(value, index)}
                          onKeyPress={e => handleKeyPress(e, index)}
                          keyboardType="number-pad"
                          maxLength={1}
                          selectTextOnFocus
                        />
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          </View>
        </View>
        <GradientButton onPress={handleContinue} text="Next" />
        {/* Resend Code */}
        <View style={styles.resendSection}>
          <TouchableOpacity onPress={handleResend} style={styles.resendButton}>
            <Text style={[styles.resendText, { color: colors.textMuted }]}>
              Didn't get a code?{' '}
              <Text style={[styles.resendLink, { color: colors.accent }]}>
                Resend
              </Text>
            </Text>
          </TouchableOpacity>
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
    fontWeight: '400',
    marginTop: hp('3%'), // ~43px spacing from heading (129px in Figma)
  },
  middleSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    minHeight: hp('17.3%'), // Ensure minimum height for OTP boxes
    paddingBottom: hp('10%'), // Space for resend text and fixed Next button
  },
  otpContainer: {
    flexDirection: 'row',
    gap: wp('3.62%'), // 15px gap between boxes
    justifyContent: 'flex-start',
    width: wp('79.47%'), // 329px container width
  },
  otpBoxWrapper: {
    width: wp('17.15%'), // 71px box width
    height: wp('17.15%'), // 71px box height
  },
  otpBox: {
    width: '100%',
    height: '100%',
    borderRadius: wp('4.83%'), // 20px border radius
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpBoxGradient: {
    width: '100%',
    height: '100%',
    borderRadius: wp('4.83%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpBoxFilled: {
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.55,
    shadowRadius: 55,
    elevation: 10,
  },
  otpBoxEmptyLight: {
    borderWidth: 1,
  },
  otpBoxEmptyDark: {
    // Gradient will be applied via LinearGradient
  },
  otpInput: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: wp('8.45%'), // 35px
    textAlign: 'center',
    width: '100%',
    height: '100%',
  },
  resendSection: {
    alignItems: 'center',
    paddingTop: hp('2%'),
  },
  resendButton: {
    alignItems: 'center',
  },
  resendText: {
    fontFamily: 'Comfortaa-SemiBold',
    fontSize: wp('3.87%'), // 16px
    lineHeight: wp('4.83%'), // 20px line height
    textAlign: 'center',
  },
  resendLink: {
    fontFamily: 'Comfortaa-SemiBold',
    fontSize: wp('3.87%'),
  },
});

export default OTPVerifyScreen;
