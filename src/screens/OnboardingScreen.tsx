import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Image,
  ImageSourcePropType,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { wp, hp } from '../utils/responsive';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../hooks/useTheme';
import { onboardingImages } from '../assets/images';
import { AuthStackNavigationProp } from '../navigation/types';
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const IMAGE_WIDTH = wp('60%');
const SPACING = wp('5%');
const SLIDE_WIDTH = IMAGE_WIDTH + SPACING;

interface Slide {
  title: string;
  subtitle: string;
  imageLight: ImageSourcePropType;
  imageDark: ImageSourcePropType;
}

interface CarouselItemProps {
  slide: Slide;
  index: number;
  scrollX: Animated.Value;
  isDark: boolean;
}

const CarouselItem: React.FC<CarouselItemProps> = ({
  slide,
  index,
  scrollX,
  isDark,
}) => {
  const inputRange = [
    (index - 1) * SLIDE_WIDTH,
    index * SLIDE_WIDTH,
    (index + 1) * SLIDE_WIDTH,
  ];

  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0.85, 1, 0.85],
    extrapolate: 'clamp',
  });

  const opacity = scrollX.interpolate({
    inputRange,
    outputRange: [0.5, 1, 0.5],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.imageWrapper}>
      <Animated.View style={{ transform: [{ scale }], opacity }}>
        <Image
          source={isDark ? slide.imageDark : slide.imageLight}
          style={styles.carouselImage}
          resizeMode="cover"
        />
      </Animated.View>
    </View>
  );
};

const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation<AuthStackNavigationProp>();
  const scrollViewRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(1);
  const scrollX = useRef(new Animated.Value(0)).current;
  const { colors, isDark } = useTheme();

  const slides: Slide[] = [
    {
      title: 'Algorithm',
      subtitle:
        'Users going through a vetting process to\nensure you never match with bots.',
      imageLight: onboardingImages.carousel3,
      imageDark: onboardingImages.carousel3,
    },
    {
      title: 'Matches',
      subtitle:
        'We match you with people that have a\nlarge array of similar interests.',
      imageLight: onboardingImages.carousel2,
      imageDark: onboardingImages.carousel2,
    },
    {
      title: 'Premium',
      subtitle:
        'Sign up today and enjoy the first month\nof premium benefits on us.',
      imageLight: onboardingImages.carousel1,
      imageDark: onboardingImages.carousel1,
    },
  ];

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const slideWidth = IMAGE_WIDTH + SPACING;
    const index = Math.round(offsetX / slideWidth);
    setActiveIndex(Math.max(0, Math.min(index, slides.length - 1)));
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.carouselContainer}>
        <Animated.ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true, listener: handleScroll },
          )}
          bounces={false}
          decelerationRate="fast"
          snapToInterval={IMAGE_WIDTH + SPACING}
          snapToAlignment="start"
          contentContainerStyle={styles.scrollContent}
        >
          {slides.map((slide, index) => (
            <CarouselItem
              key={index}
              slide={slide}
              index={index}
              scrollX={scrollX}
              isDark={isDark}
            />
          ))}
        </Animated.ScrollView>
      </View>

      <View style={styles.textSection}>
        <View style={styles.headingContainer}>
          <Text style={[styles.titleText, { color: colors.textPrimary }]}>
            {slides[activeIndex].title}
          </Text>
          {!isDark && <View style={styles.underline} />}
        </View>

        <Text style={[styles.subtext, { color: colors.textSecondary }]}>
          {slides[activeIndex].subtitle}
        </Text>
      </View>

      <View style={styles.paginationContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === activeIndex
                ? [styles.activeDot, { backgroundColor: colors.accent }]
                : [
                    styles.inactiveDot,
                    { backgroundColor: colors.backgroundSecondary },
                  ],
            ]}
          />
        ))}
      </View>

      <View style={styles.buttonSection}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.createAccountWrapper}
          onPress={() => navigation.navigate('SignUp')}
        >
          <LinearGradient
            colors={['#9253FF', '#8239FF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            angle={46}
            style={styles.createAccountButton}
          >
            <Text style={styles.createAccountText}>Create Account</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.signInText}>
            Already have an account?{' '}
            <Text style={styles.signInLink}>Sign In</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  carouselContainer: {
    height: hp('40%'),
    marginTop: hp('8.7%'),
  },
  scrollContent: {
    paddingHorizontal: (SCREEN_WIDTH - IMAGE_WIDTH) / 2,
  },
  imageWrapper: {
    width: IMAGE_WIDTH,
    marginRight: SPACING,
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselImage: {
    width: IMAGE_WIDTH,
    height: hp('40%'),
    borderRadius: wp('6%'),
  },
  textSection: {
    alignItems: 'center',
    marginTop: hp('5.6%'),
    paddingHorizontal: wp('11.4%'),
  },
  headingContainer: {
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  titleText: {
    fontFamily: 'Comfortaa-Bold',
    fontWeight: '700',
    fontSize: wp('8.5%'),
    textAlign: 'center',
    letterSpacing: -1.05,
  },
  underline: {
    width: wp('38.6%'),
    height: hp('1.7%'),
    backgroundColor: '#D4BBFF',
    marginTop: hp('-1.2%'),
  },
  paginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('2.7%'),
  },
  dot: {
    height: wp('1.9%'),
    borderRadius: wp('1%'),
    marginHorizontal: wp('1.2%'),
  },
  activeDot: {
    width: wp('5.5%'),
  },
  inactiveDot: {
    width: wp('1.9%'),
  },
  subtext: {
    fontFamily: 'Sofia Pro',
    fontWeight: '400',
    fontSize: wp('4.2%'),
    lineHeight: hp('3.9%'),
    textAlign: 'center',
  },
  buttonSection: {
    position: 'absolute',
    bottom: hp('5%'),
    left: wp('9.7%'),
    right: wp('9.7%'),
    alignItems: 'center',
  },
  createAccountWrapper: {
    width: wp('80.7%'),
    height: hp('6.5%'),
    borderRadius: wp('3.4%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 25,
    elevation: 8,
  },
  createAccountButton: {
    flex: 1,
    borderRadius: wp('3.4%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  createAccountText: {
    fontFamily: 'Comfortaa-Bold',
    fontWeight: '700',
    fontSize: wp('4.8%'),
    color: '#FFFFFF',
    textAlign: 'center',
  },
  signInText: {
    fontFamily: 'Avenir-Regular',
    fontWeight: '400',
    fontSize: wp('3.9%'),
    color: '#A7A7A7',
    textAlign: 'center',
    marginTop: hp('2.3%'),
  },
  signInLink: {
    color: '#A7A7A7',
    textDecorationLine: 'underline',
  },
});

export default OnboardingScreen;
