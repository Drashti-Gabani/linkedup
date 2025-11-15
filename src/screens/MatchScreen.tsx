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
import GradientText from '../components/GradientText';
import { useTheme } from '../hooks/useTheme';
import { useNavigation } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const MatchScreen: React.FC = () => {
  const navigation = useNavigation();
  const { mode } = useTheme();
  const isDark = mode === 'dark';

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
        { backgroundColor: isDark ? '#181818' : '#FFFFFF' },
      ]}
    >
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={isDark ? '#181818' : '#FFFFFF'}
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
                source={
                  isDark
                    ? require('../assets/images/hearts-overlay-dark.png')
                    : require('../assets/images/hearts-overlay.png')
                }
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
                color: isDark ? '#FFFFFF' : '#9253FF',
              },
            ]}
          >
            It's a match!
          </Text>
          <Text
            style={[
              styles.matchSubtext,
              { color: isDark ? '#FFFFFF' : '#A7A7A7' },
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
            {isDark ? (
              <View
                style={[styles.buttonGradient, { backgroundColor: '#FFFFFF' }]}
              >
                <GradientText
                  colors={['#A776FC', '#8239FF']}
                  start={{ x: 0, y: 1 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.buttonText}
                >
                  Say Hello
                </GradientText>
              </View>
            ) : (
              <LinearGradient
                colors={['#9253FF', '#8239FF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.buttonGradient}
              >
                <Text style={[styles.buttonText, { color: '#FFFFFF' }]}>
                  Say Hello
                </Text>
              </LinearGradient>
            )}
          </TouchableOpacity>

          {/* Keep Swiping Button */}
          <TouchableOpacity
            style={[styles.button, styles.keepSwipingButton]}
            onPress={handleKeepSwiping}
          >
            <LinearGradient
              colors={isDark ? ['#A776FC', '#8239FF'] : ['#FFF4F6', '#FFF4F6']}
              start={isDark ? { x: 0, y: 1 } : { x: 0, y: 0 }}
              end={isDark ? { x: 1, y: 0 } : { x: 1, y: 0 }}
              style={styles.buttonGradient}
            >
              <Text
                style={[
                  styles.buttonText,
                  {
                    color: isDark ? '#FFFFFF' : '#A776FC',
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
    left: wp('8%'),
    top: hp('20%'),
  },
  rightProfile: {
    left: wp('52%'),
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
    fontFamily: 'Chewy',
    fontSize: hp('6%'),
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
    fontFamily: 'Comfortaa',
    fontSize: hp('2.2%'),
    fontWeight: '700',
    lineHeight: hp('2.5%'),
    letterSpacing: -0.6,
    textAlign: 'center',
  },
});

export default MatchScreen;
