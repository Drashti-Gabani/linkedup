import { useEffect } from 'react';
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  interpolate,
  Easing,
} from 'react-native-reanimated';
import { wp } from '../utils/responsive';
import { onboardingImages } from '../assets/images';

export interface CardSize {
  width: number;
  height: number;
}

export interface UseInfiniteCarouselOptions {
  /** Animation duration for one complete cycle in ms (default: 20000) */
  duration?: number;
  /** Gap between cards as percentage string (default: '8%') */
  spacing?: string;
  /** Custom card sizes array (uses defaults if not provided) */
  cardSizes?: CardSize[];
}

export interface UseInfiniteCarouselReturn {
  /** Animated style for card at index 0 */
  card0Style: ReturnType<typeof useAnimatedStyle>;
  /** Animated style for card at index 1 */
  card1Style: ReturnType<typeof useAnimatedStyle>;
  /** Animated style for card at index 2 */
  card2Style: ReturnType<typeof useAnimatedStyle>;
  /** Array of card image sources */
  cardImages: typeof CARD_IMAGES;
  /** Array of card sizes */
  cardSizes: CardSize[];
}

// Default card images
const CARD_IMAGES = [
  onboardingImages.carousel1,
  onboardingImages.carousel3,
  onboardingImages.carousel2,
];

// Default card dimensions - all same base size, center enlargement handled by scale
const DEFAULT_CARD_SIZES: CardSize[] = [
  { width: wp('55%'), height: wp('72%') },
  { width: wp('55%'), height: wp('72%') },
  { width: wp('55%'), height: wp('72%') },
];

/**
 * Custom hook for infinite horizontal carousel animation with seamless looping.
 * Creates a "train effect" where cards continuously scroll and wrap around.
 */
export function useInfiniteCarousel(
  options: UseInfiniteCarouselOptions = {},
): UseInfiniteCarouselReturn {
  const {
    duration = 20000,
    spacing = '5%', // Tighter spacing for closer cards
    cardSizes = DEFAULT_CARD_SIZES,
  } = options;

  // Animation progress value
  const translateX = useSharedValue(0);

  // Calculate spacing and distances
  const CARD_SPACING = wp(spacing);
  const TRAIN_UNIT = cardSizes[0].width + CARD_SPACING; // Base card width + spacing
  const TRAVEL_DISTANCE = TRAIN_UNIT * 3; // Total distance for one complete cycle

  // Start the continuous animation
  useEffect(() => {
    translateX.value = 0;
    translateX.value = withRepeat(
      withTiming(TRAVEL_DISTANCE, {
        duration,
        easing: Easing.linear,
      }),
      -1, // Infinite repeats
      false, // Don't reverse
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Helper function to get wrapped position for seamless loop
  const getWrappedPosition = (
    startOffset: number,
    progress: number,
  ): number => {
    'worklet';
    const rawPosition = startOffset + progress;
    const halfRange = TRAVEL_DISTANCE / 2;
    let wrapped = (rawPosition + halfRange) % TRAVEL_DISTANCE;
    if (wrapped < 0) wrapped += TRAVEL_DISTANCE;
    return wrapped - halfRange;
  };

  // Helper to calculate visual effects based on distance from center
  // Center card gets scaled up significantly for better UX focus
  const getCardEffects = (position: number) => {
    'worklet';
    const distanceFromCenter = Math.abs(position);
    const maxDistance = TRAIN_UNIT * 1.2;
    const normalizedDistance = Math.min(distanceFromCenter / maxDistance, 1);

    const zIndex = Math.round(interpolate(normalizedDistance, [0, 1], [3, 1]));
    // Center card scales up to 1.15, side cards scale down to 0.85 (30% size difference)
    const scale = interpolate(normalizedDistance, [0, 1], [1.15, 0.85]);
    const opacity = interpolate(normalizedDistance, [0, 1], [1.0, 0.8]);

    return { zIndex, scale, opacity };
  };

  // Animated styles for each card
  const card0Style = useAnimatedStyle(() => {
    'worklet';
    const position = getWrappedPosition(-TRAIN_UNIT, translateX.value);
    const { zIndex, scale, opacity } = getCardEffects(position);

    return {
      transform: [
        { translateX: position - cardSizes[0].width / 2 },
        { translateY: -cardSizes[0].height / 2 },
        { scale },
      ],
      zIndex,
      opacity,
    };
  });

  const card1Style = useAnimatedStyle(() => {
    'worklet';
    const position = getWrappedPosition(0, translateX.value);
    const { zIndex, scale, opacity } = getCardEffects(position);

    return {
      transform: [
        { translateX: position - cardSizes[1].width / 2 },
        { translateY: -cardSizes[1].height / 2 },
        { scale },
      ],
      zIndex,
      opacity,
    };
  });

  const card2Style = useAnimatedStyle(() => {
    'worklet';
    const position = getWrappedPosition(TRAIN_UNIT, translateX.value);
    const { zIndex, scale, opacity } = getCardEffects(position);

    return {
      transform: [
        { translateX: position - cardSizes[2].width / 2 },
        { translateY: -cardSizes[2].height / 2 },
        { scale },
      ],
      zIndex,
      opacity,
    };
  });

  return {
    card0Style,
    card1Style,
    card2Style,
    cardImages: CARD_IMAGES,
    cardSizes,
  };
}
