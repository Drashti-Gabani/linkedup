import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { AppImage } from '../utils/AppImage';
import { AppImageBackground } from '../utils/AppImageBackground';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  withRepeat,
  runOnJS,
  interpolate,
  Easing,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import { User } from '../data/mockUsers';
import { discoverControls } from '../assets/images';
import { wp, hp } from '../utils/responsive';
import { useTheme } from '../hooks/useTheme';

const SCREEN_WIDTH = wp(100);
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;

interface SwipeableCardProps {
  user: User;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onSuperLike: () => void;
  onViewProfile?: () => void;
  isDark: boolean;
}

const SwipeableCard: React.FC<SwipeableCardProps> = ({
  user,
  onSwipeLeft,
  onSwipeRight,
  onSuperLike,
  onViewProfile,
  isDark,
}) => {
  const { colors } = useTheme();
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);

  // Get control button circle style based on isDark
  const controlButtonCircleStyle = getControlButtonCircleStyle(isDark);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);
  const imageOpacity = useSharedValue(0);
  const shimmerTranslate = useSharedValue(-wp(200));

  // Calculate responsive values outside worklets (worklets can't call non-worklet functions)
  const SWIPE_OUT_DISTANCE = wp(150);
  const HALF_SCREEN_WIDTH = wp(50);
  const TAP_MAX_DISTANCE = wp(2.7);
  const VERTICAL_SWIPE_THRESHOLD = hp(6.6);

  // Reset loading state when photo index changes
  useEffect(() => {
    setIsImageLoading(true);
  }, [currentPhotoIndex]);

  // Shimmer animation
  useEffect(() => {
    if (isImageLoading) {
      shimmerTranslate.value = -wp(200);
      shimmerTranslate.value = withRepeat(
        withTiming(wp(200), {
          duration: 1500,
          easing: Easing.linear,
        }),
        -1,
        false,
      );
    } else {
      shimmerTranslate.value = -wp(200);
    }
  }, [isImageLoading, shimmerTranslate]);

  const handleImageLoadStart = () => {
    setIsImageLoading(true);
    imageOpacity.value = 0;
  };

  const handleImageLoad = () => {
    setIsImageLoading(false);
    shimmerTranslate.value = -wp(200);
    imageOpacity.value = withTiming(1, { duration: 300 });
  };

  const handleImageError = () => {
    setIsImageLoading(false);
    shimmerTranslate.value = -wp(200);
    imageOpacity.value = withTiming(1, { duration: 300 });
  };

  const handlePhotoChange = (direction: 'next' | 'prev') => {
    if (direction === 'next' && currentPhotoIndex < user.photos.length - 1) {
      setCurrentPhotoIndex(currentPhotoIndex + 1);
    } else if (direction === 'prev' && currentPhotoIndex > 0) {
      setCurrentPhotoIndex(currentPhotoIndex - 1);
    }
  };

  const handleReject = () => {
    translateX.value = withSpring(-SWIPE_OUT_DISTANCE, {
      damping: 20,
      stiffness: 90,
    });
    opacity.value = withTiming(0, { duration: 400 }, finished => {
      'worklet';
      if (finished) {
        runOnJS(onSwipeLeft)();
      }
    });
  };

  const handleLike = () => {
    translateX.value = withSpring(SWIPE_OUT_DISTANCE, {
      damping: 20,
      stiffness: 90,
    });
    opacity.value = withTiming(0, { duration: 400 }, finished => {
      'worklet';
      if (finished) {
        runOnJS(onSwipeRight)();
      }
    });
  };

  const handleSuperLike = () => {
    translateY.value = withSpring(-SWIPE_OUT_DISTANCE, {
      damping: 20,
      stiffness: 90,
    });
    opacity.value = withTiming(0, { duration: 400 }, finished => {
      'worklet';
      if (finished) {
        runOnJS(onSuperLike)();
      }
    });
  };

  // Tap gesture for opening profile on image tap
  const tapGesture = Gesture.Tap()
    .maxDistance(TAP_MAX_DISTANCE) // Only trigger if finger doesn't move much (actual tap, not swipe)
    .onEnd(() => {
      'worklet';
      if (onViewProfile) {
        runOnJS(onViewProfile)();
      }
    });

  // Combined gesture for card swipe and photo navigation
  const panGesture = Gesture.Pan()
    .onStart(() => {
      'worklet';
    })
    .onUpdate(event => {
      'worklet';
      const absX = Math.abs(event.translationX);
      const absY = Math.abs(event.translationY);

      // Only move card for horizontal swipes
      if (absX > absY) {
        translateX.value = event.translationX;
        translateY.value = event.translationY * 0.3;
      }
      // Don't move card for vertical swipes (photo navigation)
    })
    .onEnd(event => {
      'worklet';
      const absX = Math.abs(event.translationX);
      const absY = Math.abs(event.translationY);

      // Vertical swipe - change photo (lower threshold for faster response)
      if (absY > absX && absY > VERTICAL_SWIPE_THRESHOLD) {
        if (event.translationY < 0) {
          // Swipe up - next photo
          runOnJS(handlePhotoChange)('next');
        } else {
          // Swipe down - previous photo
          runOnJS(handlePhotoChange)('prev');
        }
        // Reset position
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
      // Horizontal swipe - accept/reject card
      else if (absX > absY && absX > SWIPE_THRESHOLD) {
        const isRightSwipe = event.translationX > 0;
        const targetX = isRightSwipe ? SWIPE_OUT_DISTANCE : -SWIPE_OUT_DISTANCE;
        translateX.value = withSpring(targetX, {
          damping: 20,
          stiffness: 90,
        });
        opacity.value = withTiming(0, { duration: 400 }, finished => {
          'worklet';
          if (finished) {
            runOnJS(isRightSwipe ? onSwipeRight : onSwipeLeft)();
          }
        });
      }
      // Didn't meet threshold - bounce back
      else {
        translateX.value = withSpring(0, {
          damping: 15,
          stiffness: 150,
        });
        translateY.value = withSpring(0, {
          damping: 15,
          stiffness: 150,
        });
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translateX.value,
      [-HALF_SCREEN_WIDTH, 0, HALF_SCREEN_WIDTH],
      [-15, 0, 15],
    );

    const cardScale = interpolate(
      Math.abs(translateX.value),
      [0, SWIPE_THRESHOLD],
      [1, 0.95],
    );

    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotate}deg` },
        { scale: cardScale },
      ],
      opacity: opacity.value,
    };
  });

  const shimmerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: shimmerTranslate.value }],
    };
  });

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: imageOpacity.value,
    };
  });

  // Combine tap and pan gestures - tap works for quick taps, pan for swipes
  const composedGesture = Gesture.Simultaneous(tapGesture, panGesture);

  return (
    <GestureDetector gesture={composedGesture}>
      <Animated.View style={[styles.card, animatedStyle]}>
        {/* Loading placeholder with shimmer effect */}
        {isImageLoading && (
          <View style={styles.loadingContainer}>
            <LinearGradient
              colors={[
                colors.backgroundCard || '#F5F5F5',
                colors.backgroundSecondary || '#F2F2F2',
                colors.backgroundCard || '#F5F5F5',
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.loadingGradient}
            />
            <Animated.View
              style={[styles.shimmerOverlay, shimmerStyle]}
              pointerEvents="none"
            >
              <LinearGradient
                colors={
                  Platform.select({
                    ios: [
                      'transparent',
                      'rgba(255, 255, 255, 0.3)',
                      'transparent',
                    ],
                    android: [
                      'transparent',
                      'rgba(255, 255, 255, 0.5)',
                      'transparent',
                    ],
                  }) || [
                    'transparent',
                    'rgba(255, 255, 255, 0.5)',
                    'transparent',
                  ]
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.shimmerGradient}
              />
            </Animated.View>
            {/* Skeleton elements for better UX */}
            <View style={styles.skeletonContent}>
              <View style={styles.skeletonTopBar} />
              <View style={styles.skeletonBottomSection}>
                <View style={styles.skeletonName} />
                <View style={styles.skeletonOccupation} />
              </View>
            </View>
          </View>
        )}

        <Animated.View style={[styles.photo, imageAnimatedStyle]}>
          <AppImageBackground
            source={{ uri: user.photos[currentPhotoIndex] }}
            style={styles.photo}
            imageStyle={styles.photoImage}
            onLoadStart={handleImageLoadStart}
            onLoad={handleImageLoad}
            onError={handleImageError}
          >
            {/* Top gradient for location badge visibility */}
            <LinearGradient
              colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0)']}
              locations={[0.3, 1]}
              style={styles.topGradient}
            />

            {/* Side page indicators */}
            <View style={styles.pageIndicators}>
              {user.photos.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.pageIndicator,
                    index === currentPhotoIndex && styles.pageIndicatorActive,
                  ]}
                />
              ))}
            </View>

            {/* Gradient overlay */}
            <LinearGradient
              colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']}
              locations={[0.61, 1]}
              style={styles.gradient}
            >
              <View
                style={{
                  paddingBottom: hp(6.7),
                  paddingHorizontal: wp(7),
                }}
              >
                {/* User info */}
                <TouchableOpacity
                  style={styles.userInfo}
                  onPress={onViewProfile}
                  activeOpacity={0.8}
                >
                  <Text style={styles.name}>{`${user.name}, ${user.age}`}</Text>
                  <Text style={styles.occupation}>{user.occupation}</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>

            {/* Location badge */}
            <View style={styles.locationBadge}>
              <Svg
                width={wp(3.2)}
                height={wp(3.2)}
                viewBox="0 0 12 12"
                fill="none"
              >
                <Path
                  d="M6 1C3.8 1 2 2.8 2 5c0 2.2 4 6 4 6s4-3.8 4-6c0-2.2-1.8-4-4-4zm0 5.5c-.8 0-1.5-.7-1.5-1.5S5.2 3.5 6 3.5 7.5 4.2 7.5 5 6.8 6.5 6 6.5z"
                  fill="#FFFFFF"
                  stroke="#FFFFFF"
                  strokeWidth={2}
                />
              </Svg>
              <Text style={styles.distance}>{user.distance}</Text>
            </View>
          </AppImageBackground>
        </Animated.View>

        {/* Control buttons - outside the image */}
        <View style={styles.controls}>
          {/* Reject Button */}
          <TouchableOpacity
            style={[controlButtonCircleStyle, styles.smallCircle]}
            onPress={handleReject}
            activeOpacity={0.7}
          >
            <AppImage
              source={discoverControls.dislike}
              style={styles.smallIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>

          {/* Super Like Button */}
          <TouchableOpacity
            style={[controlButtonCircleStyle, styles.largeCircle]}
            onPress={handleSuperLike}
            activeOpacity={0.7}
          >
            <AppImage
              source={discoverControls.like}
              style={styles.superlikeIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>

          {/* Like Button */}
          <TouchableOpacity
            style={[controlButtonCircleStyle, styles.smallCircle]}
            onPress={handleLike}
            activeOpacity={0.7}
          >
            <AppImage
              source={discoverControls.superlike}
              style={styles.largeIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  card: {
    width: wp(87),
    height: hp(65.2),
    borderRadius: wp(8),
  },
  photo: {
    width: '100%',
    height: hp(65.2),
    borderRadius: wp(8),
    overflow: 'hidden',
  },
  photoImage: {
    borderRadius: wp(8),
  },
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: hp(13.2),
    borderTopLeftRadius: wp(8),
    borderTopRightRadius: wp(8),
    zIndex: 1,
  },
  pageIndicators: {
    position: 'absolute',
    top: hp(26.1),
    right: wp(7.2),
    flexDirection: 'column',
    gap: hp(1.1),
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: wp(4),
    padding: hp(2.2),
    paddingHorizontal: wp(2.9),
  },
  pageIndicator: {
    width: wp(2.1),
    height: wp(2.1),
    borderRadius: wp(1.1),
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  pageIndicatorActive: {
    backgroundColor: '#FFFFFF',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    justifyContent: 'flex-end',
  },
  locationBadge: {
    position: 'absolute',
    top: hp(2.6),
    left: wp(7),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: wp(2.7),
    paddingVertical: hp(1.7),
    paddingHorizontal: wp(3.2),
    gap: wp(2.1),
  },
  distance: {
    fontFamily: 'Sofia Pro',
    fontSize: wp(4),
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: -0.45,
  },
  userInfo: {
    marginBottom: hp(1.3),
  },
  name: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: wp(8),
    color: '#FFFFFF',
    letterSpacing: -0.9,
    lineHeight: hp(4.4),
    marginBottom: hp(0.7),
  },
  occupation: {
    fontFamily: 'Sofia Pro',
    fontSize: wp(4.3),
    fontWeight: '400',
    color: '#FFFFFF',
    lineHeight: hp(3.3),
  },
  moreButton: {
    position: 'absolute',
    right: wp(1.3),
    bottom: hp(14.6),
    padding: wp(2.7),
    gap: hp(0.9),
  },
  moreDot: {
    width: wp(1.1),
    height: wp(1.1),
    borderRadius: wp(0.5),
    backgroundColor: '#FFFFFF',
    borderWidth: 1.4,
    borderColor: '#FFFFFF',
  },
  controls: {
    position: 'absolute',
    bottom: -hp(4),
    left: 0,
    right: 0,
    height: hp(9.6),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: wp(2.7),
    paddingBottom: 0,
    zIndex: 10,
  },
  smallCircle: {
    width: wp(15.2),
    height: wp(15.2),
    borderRadius: wp(7.6),
  },
  largeCircle: {
    width: wp(20.8),
    height: wp(20.8),
    borderRadius: wp(10.4),
  },
  smallIcon: {
    width: wp(5.6),
    height: wp(5.6),
  },
  superlikeIcon: {
    width: wp(10.7),
    height: wp(10.7),
  },
  largeIcon: {
    width: wp(6.7),
    height: wp(6.7),
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    borderRadius: wp(8),
    overflow: 'hidden',
    zIndex: 1,
  },
  loadingGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  shimmerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: wp(200), // Wider to ensure full coverage during animation
    height: '100%',
    ...Platform.select({
      android: {
        elevation: 0,
        renderToHardwareTextureAndroid: true,
      },
    }),
  },
  shimmerGradient: {
    width: '100%',
    height: '100%',
    ...Platform.select({
      android: {
        opacity: 1,
      },
    }),
  },
  skeletonContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
    paddingHorizontal: wp(7),
    paddingTop: hp(2.6),
    paddingBottom: hp(6.7),
  },
  skeletonTopBar: {
    width: wp(30),
    height: hp(3),
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: wp(2.7),
  },
  skeletonBottomSection: {
    gap: hp(0.7),
  },
  skeletonName: {
    width: wp(50),
    height: hp(4.4),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: wp(1),
  },
  skeletonOccupation: {
    width: wp(40),
    height: hp(3.3),
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: wp(1),
  },
});

// Helper function to get control button circle style based on isDark
const getControlButtonCircleStyle = (isDark: boolean) => {
  return {
    backgroundColor: '#FFFFFF',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    ...Platform.select({
      ios: {
        shadowColor: '#D7D7D7',
        shadowOffset: { width: 0, height: hp(2.6) },
        shadowOpacity: isDark ? 0.5 : 0.9,
        shadowRadius: isDark ? wp(6) : wp(4),
      },
      android: {
        elevation: 12, // Higher elevation for better visibility on Android
      },
    }),
  };
};

export default SwipeableCard;
