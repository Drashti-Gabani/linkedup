import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
  interpolate,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import { User } from '../data/mockUsers';
import { discoverControls } from '../assets/images';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;

interface SwipeableCardProps {
  user: User;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onSuperLike: () => void;
  onViewProfile?: () => void;
}

const SwipeableCard: React.FC<SwipeableCardProps> = ({
  user,
  onSwipeLeft,
  onSwipeRight,
  onSuperLike,
  onViewProfile,
}) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const handlePhotoChange = (direction: 'next' | 'prev') => {
    if (direction === 'next' && currentPhotoIndex < user.photos.length - 1) {
      setCurrentPhotoIndex(currentPhotoIndex + 1);
    } else if (direction === 'prev' && currentPhotoIndex > 0) {
      setCurrentPhotoIndex(currentPhotoIndex - 1);
    }
  };

  const handleReject = () => {
    translateX.value = withSpring(-SCREEN_WIDTH * 1.5, {
      damping: 20,
      stiffness: 90,
    });
    opacity.value = withTiming(0, { duration: 300 });
    runOnJS(onSwipeLeft)();
  };

  const handleLike = () => {
    translateX.value = withSpring(SCREEN_WIDTH * 1.5, {
      damping: 20,
      stiffness: 90,
    });
    opacity.value = withTiming(0, { duration: 300 });
    runOnJS(onSwipeRight)();
  };

  const handleSuperLike = () => {
    translateY.value = withSpring(-SCREEN_WIDTH * 1.5, {
      damping: 20,
      stiffness: 90,
    });
    opacity.value = withTiming(0, { duration: 300 });
    runOnJS(onSuperLike)();
  };

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
      if (absY > absX && absY > 50) {
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
        const targetX =
          event.translationX > 0 ? SCREEN_WIDTH * 1.5 : -SCREEN_WIDTH * 1.5;
        translateX.value = withSpring(targetX, {
          damping: 20,
          stiffness: 90,
        });
        opacity.value = withTiming(0, { duration: 300 });
        runOnJS(event.translationX > 0 ? onSwipeRight : onSwipeLeft)();
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
      [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
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

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.card, animatedStyle]}>
        <ImageBackground
          source={{ uri: user.photos[currentPhotoIndex] }}
          style={styles.photo}
          imageStyle={styles.photoImage}
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
                paddingBottom: 50,
                paddingHorizontal: 30,
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
            <Svg width={12} height={12} viewBox="0 0 12 12" fill="none">
              <Path
                d="M6 1C3.8 1 2 2.8 2 5c0 2.2 4 6 4 6s4-3.8 4-6c0-2.2-1.8-4-4-4zm0 5.5c-.8 0-1.5-.7-1.5-1.5S5.2 3.5 6 3.5 7.5 4.2 7.5 5 6.8 6.5 6 6.5z"
                fill="#FFFFFF"
                stroke="#FFFFFF"
                strokeWidth={2}
              />
            </Svg>
            <Text style={styles.distance}>{user.distance}</Text>
          </View>
        </ImageBackground>

        {/* Control buttons - outside the image */}
        <View style={styles.controls}>
          {/* Reject Button */}
          <TouchableOpacity
            style={[styles.controlButtonCircle, styles.smallCircle]}
            onPress={handleReject}
            activeOpacity={0.7}
          >
            <Image
              source={discoverControls.dislike}
              style={styles.smallIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>

          {/* Super Like Button */}
          <TouchableOpacity
            style={[styles.controlButtonCircle, styles.largeCircle]}
            onPress={handleSuperLike}
            activeOpacity={0.7}
          >
            <Image
              source={discoverControls.like}
              style={styles.superlikeIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>

          {/* Like Button */}
          <TouchableOpacity
            style={[styles.controlButtonCircle, styles.smallCircle]}
            onPress={handleLike}
            activeOpacity={0.7}
          >
            <Image
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
    width: SCREEN_WIDTH - 54,
    height: 622,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  photo: {
    width: '100%',
    height: 584,
    borderRadius: 30,
    overflow: 'hidden',
  },
  photoImage: {
    borderRadius: 30,
  },
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    zIndex: 1,
  },
  pageIndicators: {
    position: 'absolute',
    top: 234,
    right: 11,
    flexDirection: 'column',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 15,
    padding: 17,
    paddingHorizontal: 11,
    backdropFilter: 'blur(25px)',
  },
  pageIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
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
    top: 23,
    left: 29,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    paddingVertical: 13,
    paddingHorizontal: 12,
    gap: 8,
    backdropFilter: 'blur(10px)',
  },
  distance: {
    fontFamily: 'Sofia Pro',
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: -0.45,
  },
  userInfo: {
    marginBottom: 10,
  },
  name: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: 30,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.9,
    lineHeight: 33,
    marginBottom: 5,
  },
  occupation: {
    fontFamily: 'Sofia Pro',
    fontSize: 16,
    fontWeight: '400',
    color: '#FFFFFF',
    lineHeight: 25,
  },
  moreButton: {
    position: 'absolute',
    right: 5,
    bottom: 110,
    padding: 10,
    gap: 7,
  },
  moreDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.4,
    borderColor: '#FFFFFF',
  },
  controls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    paddingBottom: 10,
  },
  controlButtonCircle: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#D7D7D7',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.5,
    shadowRadius: 22.5,
    elevation: 10,
  },
  smallCircle: {
    width: 63,
    height: 63,
    borderRadius: 31.5,
  },
  largeCircle: {
    width: 86,
    height: 86,
    borderRadius: 43,
  },
  smallIcon: {
    width: 21,
    height: 21,
  },
  superlikeIcon: {
    width: 40,
    height: 40,
  },
  largeIcon: {
    width: 25,
    height: 25,
  },
});

export default SwipeableCard;
