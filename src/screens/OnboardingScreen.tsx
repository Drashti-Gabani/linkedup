import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ImageSourcePropType,
  Animated,
} from 'react-native';
import { AnimatedAppImage } from '../utils/AppImage';
import { useNavigation } from '@react-navigation/native';
import { wp, hp } from '../utils/responsive';
import { useTheme } from '../hooks/useTheme';
import { onboardingImages } from '../assets/images';
import { AuthStackNavigationProp } from '../navigation/types';
import GradientButton from '../components/GradientButton';
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const IMAGE_WIDTH = wp('60%');
const SPACING = wp('5%');
const SLIDE_WIDTH = IMAGE_WIDTH + SPACING;
const AUTO_SCROLL_DURATION = 3000; // 3 seconds per slide
const SCROLL_ANIMATION_DURATION = 800; // 800ms for smooth scroll animation

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
        <AnimatedAppImage
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
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const { colors, isDark } = useTheme();
  const autoScrollTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isScrollingRef = useRef(false);
  const currentScrollIndexRef = useRef(0);
  const isUserScrollingRef = useRef(false);
  const manualScrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const originalSlides: Slide[] = [
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

  // Create infinite loop by duplicating slides
  const slides: Slide[] = [
    ...originalSlides,
    ...originalSlides,
    ...originalSlides,
  ];

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const slideWidth = SLIDE_WIDTH;

    // Calculate which slide index we're at based on scroll position
    const index = Math.round(offsetX / slideWidth);
    const realIndex = index % originalSlides.length;

    // Update content immediately when index changes - syncs with image position
    if (realIndex !== activeIndex) {
      setActiveIndex(realIndex);
    }

    // Only handle infinite loop reset during auto-scroll, not manual scrolling
    // This prevents infinite loops when user manually scrolls
    if (!isUserScrollingRef.current && !isScrollingRef.current) {
      const resetThreshold = originalSlides.length * 2;

      if (index >= resetThreshold) {
        // Reset to middle set without animation for seamless loop
        currentScrollIndexRef.current = originalSlides.length;
        scrollViewRef.current?.scrollTo({
          x: currentScrollIndexRef.current * SLIDE_WIDTH,
          animated: false,
        });
        setActiveIndex(0);
      } else if (index < originalSlides.length) {
        // If scrolled back to beginning, jump to end of middle set
        currentScrollIndexRef.current = originalSlides.length * 2 - 1;
        scrollViewRef.current?.scrollTo({
          x: currentScrollIndexRef.current * SLIDE_WIDTH,
          animated: false,
        });
        setActiveIndex(originalSlides.length - 1);
      } else {
        currentScrollIndexRef.current = index;
      }
    } else {
      // During manual scroll, just update the current index without resetting
      // Keep it within safe bounds to prevent issues
      if (index >= originalSlides.length && index < originalSlides.length * 2) {
        currentScrollIndexRef.current = index;
      }
    }
  };

  // Auto-scroll animation with infinite loop
  useEffect(() => {
    const startAutoScroll = () => {
      // Start from the middle set of slides for seamless loop
      currentScrollIndexRef.current = originalSlides.length;
      scrollViewRef.current?.scrollTo({
        x: currentScrollIndexRef.current * SLIDE_WIDTH,
        animated: false,
      });

      // Set initial active index
      setActiveIndex(0);

      const scrollToNext = () => {
        // Don't auto-scroll if user is manually scrolling
        if (isScrollingRef.current || isUserScrollingRef.current) return;

        isScrollingRef.current = true;
        currentScrollIndexRef.current += 1;

        // Calculate the real index for content update
        const realIndex = currentScrollIndexRef.current % originalSlides.length;

        // Calculate scroll position
        const scrollPosition = currentScrollIndexRef.current * SLIDE_WIDTH;

        // If we've scrolled past the second set of slides, reset to first set
        if (currentScrollIndexRef.current >= originalSlides.length * 2) {
          currentScrollIndexRef.current = originalSlides.length;
          scrollViewRef.current?.scrollTo({
            x: currentScrollIndexRef.current * SLIDE_WIDTH,
            animated: false,
          });
          // Update content immediately after reset
          setActiveIndex(0);
          setTimeout(() => {
            isScrollingRef.current = false;
          }, 100);
        } else {
          // Smooth scroll to next position
          // Content will update via handleScroll callback as image moves
          scrollViewRef.current?.scrollTo({
            x: scrollPosition,
            animated: true,
          });

          // Reset scrolling flag after animation completes
          setTimeout(() => {
            isScrollingRef.current = false;
          }, SCROLL_ANIMATION_DURATION);
        }
      };

      // Auto-scroll every AUTO_SCROLL_DURATION
      autoScrollTimerRef.current = setInterval(
        scrollToNext,
        AUTO_SCROLL_DURATION,
      );
    };

    // Small delay before starting auto-scroll to ensure layout is ready
    const initTimer = setTimeout(startAutoScroll, 1000);

    return () => {
      clearTimeout(initTimer);
      if (autoScrollTimerRef.current) {
        clearInterval(autoScrollTimerRef.current);
      }
      if (manualScrollTimeoutRef.current) {
        clearTimeout(manualScrollTimeoutRef.current);
      }
    };
  }, []);

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
            { useNativeDriver: false, listener: handleScroll },
          )}
          onScrollBeginDrag={() => {
            // User started manual scrolling - pause auto-scroll
            isUserScrollingRef.current = true;
            // Clear any pending manual scroll timeout
            if (manualScrollTimeoutRef.current) {
              clearTimeout(manualScrollTimeoutRef.current);
            }
          }}
          onScrollEndDrag={event => {
            // User released - will continue with momentum
            // Don't do anything here, let momentum handle it
          }}
          onMomentumScrollEnd={event => {
            // User finished scrolling - snap to nearest and handle loop reset if needed
            const offsetX = event.nativeEvent.contentOffset.x;
            const slideWidth = SLIDE_WIDTH;
            const index = Math.round(offsetX / slideWidth);

            // Handle loop reset if user scrolled to boundaries
            const resetThreshold = originalSlides.length * 2;
            let finalIndex = index;
            let snapPosition = index * slideWidth;

            if (index >= resetThreshold) {
              // Reset to middle set
              finalIndex = originalSlides.length;
              snapPosition = finalIndex * slideWidth;
              currentScrollIndexRef.current = finalIndex;
              scrollViewRef.current?.scrollTo({
                x: snapPosition,
                animated: false,
              });
              setActiveIndex(0);
            } else if (index < originalSlides.length) {
              // Reset to end of middle set
              finalIndex = originalSlides.length * 2 - 1;
              snapPosition = finalIndex * slideWidth;
              currentScrollIndexRef.current = finalIndex;
              scrollViewRef.current?.scrollTo({
                x: snapPosition,
                animated: false,
              });
              setActiveIndex(originalSlides.length - 1);
            } else {
              // Normal position - just snap to center
              currentScrollIndexRef.current = index;
              scrollViewRef.current?.scrollTo({
                x: snapPosition,
                animated: true,
              });
            }

            // Resume auto-scroll after a short delay
            if (manualScrollTimeoutRef.current) {
              clearTimeout(manualScrollTimeoutRef.current);
            }
            manualScrollTimeoutRef.current = setTimeout(() => {
              isUserScrollingRef.current = false;
            }, 500);
          }}
          bounces={false}
          decelerationRate={0.88}
          snapToInterval={SLIDE_WIDTH}
          snapToAlignment="start"
          contentContainerStyle={styles.scrollContent}
        >
          {slides.map((slide, index) => (
            <CarouselItem
              key={`slide-${index}`}
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
            {originalSlides[activeIndex].title}
          </Text>
          {!isDark && (
            <View
              style={[
                styles.underline,
                { backgroundColor: colors.accentUnderline },
              ]}
            />
          )}
        </View>

        <Text style={[styles.subtext, { color: colors.textSecondary }]}>
          {originalSlides[activeIndex].subtitle}
        </Text>
      </View>

      <View style={styles.paginationContainer}>
        {originalSlides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === activeIndex
                ? [styles.activeDot, { backgroundColor: colors.signInLink }]
                : [styles.inactiveDot, { backgroundColor: colors.dotInactive }],
            ]}
          />
        ))}
      </View>

      <View style={styles.buttonSection}>
        <View>
          <GradientButton
            onPress={() => navigation.navigate('SignUp')}
            text="Create Account"
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={[styles.signInText, { color: colors.signInText }]}>
            Already have an account?{' '}
            <Text style={[{ color: colors.signInLink }]}>Sign In</Text>
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
    paddingRight: (SCREEN_WIDTH - IMAGE_WIDTH) / 2 + SLIDE_WIDTH * 2,
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
    left: wp('0%'),
    right: wp('0%'),
  },
  createAccountButton: {
    flex: 1,
    borderRadius: wp('3.4%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  createAccountText: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: wp('4.8%'),
    textAlign: 'center',
  },
  signInText: {
    fontFamily: 'Avenir-Regular',
    fontWeight: '400',
    fontSize: wp('3.9%'),
    textAlign: 'center',
    marginTop: hp('2.3%'),
  },
});

export default OnboardingScreen;
