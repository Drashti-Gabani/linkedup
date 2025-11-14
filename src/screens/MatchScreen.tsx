import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../hooks/useTheme';
import { useNavigation } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const MatchScreen: React.FC = () => {
  const navigation = useNavigation();
  const { colors, gradients, isDark } = useTheme();

  const handleKeepSwiping = () => {
    // Navigate back to discover screen
    navigation.goBack();
  };

  const handleSayHello = () => {
    // Navigate to chat screen
    console.log('Navigate to chat');
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />

      {/* Main Content Container */}
      <View style={styles.mainContainer}>
        {/* Hero Images Section */}
        <View style={styles.heroSection}>
          <View style={styles.profileImagesContainer}>
            {/* Left Profile Image */}
            <View style={[styles.profileImageWrapper, styles.leftProfile]}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
                }}
                style={styles.profileImage}
                resizeMode="cover"
              />
            </View>

            {/* Right Profile Image */}
            <View style={[styles.profileImageWrapper, styles.rightProfile]}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
                }}
                style={styles.profileImage}
                resizeMode="cover"
              />
            </View>

            {/* Heart Overlay Image */}
            <View style={styles.heartOverlayContainer}>
              <Image
                source={require('../assets/images/hearts-overlay.png')}
                style={styles.heartOverlay}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>

        {/* Text Content Section */}
        <View style={styles.textSection}>
          <Text
            style={[
              styles.matchHeading,
              {
                color: colors.accent,
              },
            ]}
          >
            It's a match!
          </Text>
          <Text
            style={[
              styles.matchSubtext,
              { color: colors.textMuted },
            ]}
          >
            Don't keep your new match waiting!
          </Text>
        </View>

        {/* Action Buttons Section */}
        <View style={styles.buttonsSection}>
          {/* Say Hello Button */}
          <TouchableOpacity
            style={[styles.button, styles.sayHelloButton]}
            onPress={handleSayHello}
          >
            <LinearGradient
              colors={gradients.primary}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.buttonGradient}
            >
              <Text style={[styles.buttonText, { color: colors.iconSelected }]}>
                Say Hello
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Keep Swiping Button */}
          <TouchableOpacity
            style={[styles.button, styles.keepSwipingButton]}
            onPress={handleKeepSwiping}
          >
            <LinearGradient
              colors={[colors.headerButtonBackground, colors.headerButtonBackground]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.buttonGradient}
            >
              <Text
                style={[
                  styles.buttonText,
                  {
                    color: colors.accent,
                  },
                ]}
              >
                Keep Swiping
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  heroSection: {
    flex: 0.65,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImagesContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImageWrapper: {
    position: 'absolute',
    width: wp('41%'),
    height: hp('28%'),
    borderRadius: 25,
    overflow: 'hidden',
  },
  leftProfile: {
    left: wp('9%'),
    top: hp('20%'),
  },
  rightProfile: {
    left: wp('50%'),
    top: hp('23%'),
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  heartOverlayContainer: {
    position: 'absolute',
    top: hp('-50%'),
    left: 0,
    right: 0,
    bottom: hp('20%'),
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  heartOverlay: {
    width: '130%',
    height: '150%',
  },
  textSection: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp('16%'),
    paddingVertical: hp('2%'),
  },
  matchHeading: {
    fontFamily: 'Oh Chewy',
    fontSize: hp('6%'),
    fontWeight: '400',
    lineHeight: hp('7%'),
    letterSpacing: -1.95,
    textAlign: 'center',
    marginBottom: hp('1%'),
  },
  matchSubtext: {
    fontFamily: 'Sofia Pro',
    fontSize: hp('2%'),
    fontWeight: '400',
    lineHeight: hp('3.1%'),
    letterSpacing: -0.36,
    textAlign: 'center',
  },
  buttonsSection: {
    flex: 0.15,
    justifyContent: 'center',
    paddingHorizontal: wp('13.3%'),
    paddingBottom: hp('5%'),
    gap: hp('2%'),
  },
  button: {
    height: hp('6.5%'),
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keepSwipingButton: {
    overflow: 'hidden',
  },
  sayHelloButton: {
    overflow: 'hidden',
  },
  buttonGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  buttonText: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: hp('2.2%'),
    lineHeight: hp('2.5%'),
    letterSpacing: -0.6,
    textAlign: 'center',
  },
});

export default MatchScreen;
