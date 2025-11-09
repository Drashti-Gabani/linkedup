import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../hooks/useTheme';
import { wp, hp } from '../utils/responsive';
import GradientText from '../components/GradientText';
import NextButton from '../components/NextButton';
import UserIcon from '../components/icons/UserIcon';
import EyeIcon from '../components/icons/EyeIcon';
import CheckmarkIcon from '../components/icons/CheckmarkIcon';
import { AuthStackNavigationProp } from '../navigation/types';
import { useNavigation } from '@react-navigation/native';

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<AuthStackNavigationProp>();
  const { colors, mode } = useTheme();
  const isDark = mode === 'dark';

  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const inputBgColor = isDark ? '#2E2E2E' : '#F5F7F9';
  const titleColor = isDark ? '#FFFFFF' : '#171717';

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Background Images Section */}
      <View style={styles.imagesContainer}>
        <Image
          source={{
            uri: 'https://api.builder.io/api/v1/image/assets/TEMP/9c09591d9ac73c636ccc177f3aceeb8e02010eb7?width=539',
          }}
          style={[styles.image, styles.imageLeft]}
          resizeMode="cover"
        />
        <Image
          source={{
            uri: isDark
              ? 'https://api.builder.io/api/v1/image/assets/TEMP/9f35b55846043c7cb2b1239ed1df98c0749774ab?width=631'
              : 'https://api.builder.io/api/v1/image/assets/TEMP/17e09e4c285a2020923038573ea335a22e359699?width=631',
          }}
          style={[styles.image, styles.imageCenter]}
          resizeMode="cover"
        />
        <Image
          source={{
            uri: 'https://api.builder.io/api/v1/image/assets/TEMP/6e78e50205bca901219564801e7aea1ba8157105?width=539',
          }}
          style={[styles.image, styles.imageRight]}
          resizeMode="cover"
        />
      </View>

      <SafeAreaView style={styles.safeArea} edges={['bottom']}>
        {/* Content Section */}
        <View style={styles.content}>
          {/* Title Section */}
          <View style={styles.titleSection}>
            <View style={styles.titleWrapper}>
              <Text style={[styles.loginTitle, { color: titleColor }]}>
                Login
              </Text>
              {!isDark && <View style={styles.underline} />}
            </View>

            <View style={styles.signUpWrapper}>
              <Text style={styles.signUpText}>Don't have an account? </Text>
              <GradientText
                colors={['#9253FF', '#8239FF']}
                style={styles.signUpLink}
              >
                Sign Up
              </GradientText>
            </View>
          </View>

          {/* Input Fields */}
          <View style={styles.inputsContainer}>
            {/* Phone Number Input */}
            <View style={styles.inputGroup}>
              <GradientText
                colors={['#9253FF', '#8239FF']}
                style={styles.labelText}
              >
                Phone Number
              </GradientText>
              <View
                style={[
                  styles.inputWrapper,
                  { backgroundColor: inputBgColor },
                  !isDark && styles.inputWrapperLight,
                ]}
              >
                <UserIcon width={13} height={14} color="#A8A8A8" />
                <TextInput
                  style={[styles.input, { color: '#A8A8A8' }]}
                  placeholder="Phone number"
                  placeholderTextColor="#A8A8A8"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  keyboardType="phone-pad"
                />
                {phoneNumber.length > 0 && (
                  <CheckmarkIcon width={8} height={6} />
                )}
              </View>
            </View>

            {/* Password Input */}
            <View style={styles.inputGroup}>
              <GradientText
                colors={['#9253FF', '#8239FF']}
                style={styles.labelText}
              >
                Password
              </GradientText>
              <View
                style={[
                  styles.inputWrapper,
                  { backgroundColor: inputBgColor },
                  !isDark && styles.inputWrapperLight,
                ]}
              >
                <TextInput
                  style={[styles.input, { color: '#A8A8A8', flex: 1 }]}
                  placeholder="Password"
                  placeholderTextColor="#A8A8A8"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!isPasswordVisible}
                />
                <TouchableOpacity
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  style={styles.eyeIconButton}
                >
                  <EyeIcon width={24} height={24} color="#D0C9D6" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Next Button */}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  imagesContainer: {
    position: 'absolute',
    top: -hp('14%'),
    left: -wp('63%'),
    width: wp('215%'),
    height: hp('51.6%'),
    transform: [{ rotate: '-9.693deg' }],
  },
  image: {
    position: 'absolute',
    borderRadius: 36,
  },
  imageLeft: {
    width: wp('65%'),
    height: hp('44%'),
    left: wp('1.5%'),
    top: hp('15.4%'),
  },
  imageCenter: {
    width: wp('76%'),
    height: hp('51.6%'),
    left: wp('68.6%'),
    top: hp('5.5%'),
  },
  imageRight: {
    width: wp('65%'),
    height: hp('44%'),
    left: wp('149.5%'),
    top: hp('3.7%'),
  },
  content: {
    paddingHorizontal: wp('9.7%'),
    marginTop: hp('52.8%'),
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: hp('4.5%'),
  },
  titleWrapper: {
    alignItems: 'center',
    position: 'relative',
    height: hp('7.6%'),
    justifyContent: 'center',
  },
  loginTitle: {
    fontFamily: 'Comfortaa-Bold',
    fontWeight: '700',
    fontSize: 30,
    lineHeight: 32,
    textAlign: 'center',
  },
  underline: {
    width: 80,
    height: 11,
    backgroundColor: '#F2F2F2',
    position: 'absolute',
    top: 21,
  },
  signUpWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('2.2%'),
  },
  signUpText: {
    fontFamily: 'Comfortaa',
    fontWeight: '600',
    fontSize: 15,
    color: '#A7A7A7',
    lineHeight: 20,
  },
  signUpLink: {
    fontFamily: 'Comfortaa-Bold',
    fontWeight: '700',
    fontSize: 15,
    lineHeight: 20,
  },
  inputsContainer: {
    gap: 12,
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
  },
  inputWrapperLight: {
    borderWidth: 1,
    borderColor: '#F5F7F9',
  },
  input: {
    fontFamily: 'Comfortaa',
    fontWeight: '600',
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
