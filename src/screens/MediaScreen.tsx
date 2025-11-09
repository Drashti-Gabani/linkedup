import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import {
  launchImageLibrary,
  launchCamera,
  ImagePickerResponse,
  MediaType,
} from 'react-native-image-picker';
import { useTheme } from '../hooks/useTheme';
import { wp, hp } from '../utils/responsive';
import { AuthStackNavigationProp } from '../navigation/types';
import BackButton from '../components/BackButton';
import NextButton from '../components/NextButton';

interface PhotoItem {
  uri: string;
  id: string;
}

const MAX_PHOTOS = 4;
const GRID_POSITIONS = [
  { row: 0, col: 0 }, // Top Left
  { row: 0, col: 1 }, // Top Right
  { row: 1, col: 0 }, // Bottom Left
  { row: 1, col: 1 }, // Bottom Right
];

const MediaScreen: React.FC = () => {
  const { mode } = useTheme();
  const navigation = useNavigation<AuthStackNavigationProp>();
  const isDark = mode === 'dark';

  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const photosRef = useRef(photos);

  useEffect(() => {
    photosRef.current = photos;
  }, [photos]);

  // Photo dimensions from Figma: 151x196
  const photoWidth = wp('36.5%'); // ~151px on 414px screen
  const photoHeight = hp('21.8%'); // ~196px on 896px screen
  const photoGap = wp('3.9%'); // ~16px gap between photos

  const handleImagePicker = (index: number) => {
    Alert.alert(
      'Select Photo',
      'Choose an option',
      [
        { text: 'Camera', onPress: () => openCamera(index) },
        { text: 'Gallery', onPress: () => openGallery(index) },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true },
    );
  };

  const openCamera = (index: number) => {
    launchCamera(
      {
        mediaType: 'photo' as MediaType,
        quality: 0.8,
        saveToPhotos: false,
      },
      (response: ImagePickerResponse) => {
        if (response.assets && response.assets[0]) {
          handleImageSelected(response.assets[0].uri || '', index);
        }
      },
    );
  };

  const openGallery = (index: number) => {
    launchImageLibrary(
      {
        mediaType: 'photo' as MediaType,
        quality: 0.8,
        selectionLimit: 1,
      },
      (response: ImagePickerResponse) => {
        if (response.assets && response.assets[0]) {
          handleImageSelected(response.assets[0].uri || '', index);
        }
      },
    );
  };

  const handleImageSelected = (uri: string, index: number) => {
    if (photos.length < MAX_PHOTOS && index >= photos.length) {
      // Adding new photo
      setPhotos([...photos, { uri, id: Date.now().toString() }]);
    } else if (index < photos.length) {
      // Replacing existing photo
      const newPhotos = [...photos];
      newPhotos[index] = { uri, id: photos[index].id };
      setPhotos(newPhotos);
    }
  };

  const swapPhotos = (fromIndex: number, toIndex: number) => {
    if (
      fromIndex === toIndex ||
      toIndex < 0 ||
      toIndex >= photosRef.current.length
    ) {
      return;
    }

    setPhotos(prevPhotos => {
      if (fromIndex === toIndex || toIndex >= prevPhotos.length) {
        return prevPhotos;
      }
      const newPhotos = [...prevPhotos];
      const [removed] = newPhotos.splice(fromIndex, 1);
      newPhotos.splice(toIndex, 0, removed);
      return newPhotos;
    });
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView
        style={[
          styles.container,
          { backgroundColor: isDark ? '#181818' : '#FFFFFF' },
        ]}
      >
        <BackButton onPress={() => navigation.goBack()} size="medium" />

        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text
              style={[
                styles.title,
                {
                  color: isDark ? '#FFFFFF' : '#444444',
                  fontSize: isDark ? 26 : 32,
                },
              ]}
            >
              Media
            </Text>
            <Text
              style={[
                styles.subtitle,
                { color: isDark ? '#888888' : '#B2B2B2' },
              ]}
            >
              Add your best photos to get a higher amount of daily matches.
            </Text>
          </View>

          {/* Photo Grid - 2x2 layout matching Figma */}
          <View
            style={[styles.photoGrid, { width: photoWidth * 2 + photoGap }]}
          >
            {/* Render filled photo slots */}
            {photos.map((photo, index) => (
              <DraggablePhoto
                key={photo.id}
                photo={photo}
                index={index}
                isCover={index === 0}
                photoWidth={photoWidth}
                photoHeight={photoHeight}
                photoGap={photoGap}
                isDark={isDark}
                photosLength={photos.length}
                onImagePicker={handleImagePicker}
                onSwap={swapPhotos}
              />
            ))}

            {/* Render empty slots */}
            {Array.from({ length: MAX_PHOTOS - photos.length }).map((_, i) => {
              const slotIndex = photos.length + i;
              return (
                <EmptyPhotoSlot
                  key={`empty-${i}`}
                  index={slotIndex}
                  isCover={slotIndex === 0}
                  photoWidth={photoWidth}
                  photoHeight={photoHeight}
                  photoGap={photoGap}
                  isDark={isDark}
                  onImagePicker={handleImagePicker}
                />
              );
            })}
          </View>
        </View>

        <NextButton
          onPress={() => navigation.navigate('Interests')}
          showText={true}
          textLabel="Next"
          size="medium"
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

interface DraggablePhotoProps {
  photo: PhotoItem;
  index: number;
  isCover: boolean;
  photoWidth: number;
  photoHeight: number;
  photoGap: number;
  isDark: boolean;
  photosLength: number;
  onImagePicker: (index: number) => void;
  onSwap: (fromIndex: number, toIndex: number) => void;
}

const DraggablePhoto: React.FC<DraggablePhotoProps> = ({
  photo,
  index,
  isCover,
  photoWidth,
  photoHeight,
  photoGap,
  isDark,
  photosLength,
  onImagePicker,
  onSwap,
}) => {
  const getPositionForIndex = (idx: number) => {
    const pos = GRID_POSITIONS[idx];
    return {
      left: pos.col * (photoWidth + photoGap),
      top: pos.row * (photoHeight + photoGap),
    };
  };

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const zIndex = useSharedValue(1);
  const startPosition = useSharedValue({ x: 0, y: 0 });
  const targetIndex = useSharedValue(index);

  const position = getPositionForIndex(index);

  // Reset position when index changes (after swap)
  useEffect(() => {
    translateX.value = 0;
    translateY.value = 0;
    scale.value = 1;
    zIndex.value = 1;
    targetIndex.value = index;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const tapGesture = Gesture.Tap().onEnd(() => {
    'worklet';
    runOnJS(onImagePicker)(index);
  });

  const panGesture = Gesture.Pan()
    .minDistance(10) // Require 10px movement before pan starts, allowing taps to work
    .onStart(() => {
      'worklet';
      startPosition.value = { x: translateX.value, y: translateY.value };
      targetIndex.value = index;
      zIndex.value = 10;
      scale.value = withSpring(1.05, {
        damping: 15,
        stiffness: 200,
      });
    })
    .onUpdate(event => {
      'worklet';
      translateX.value = startPosition.value.x + event.translationX;
      translateY.value = startPosition.value.y + event.translationY;

      // Calculate absolute position in the grid
      const absoluteX = position.left + translateX.value;
      const absoluteY = position.top + translateY.value;

      // Determine target row and column based on absolute position
      let newRow = 0;
      let newCol = 0;

      // Calculate row
      if (absoluteY < photoHeight + photoGap / 2) {
        newRow = 0;
      } else {
        newRow = 1;
      }

      // Calculate column
      if (absoluteX < photoWidth + photoGap / 2) {
        newCol = 0;
      } else {
        newCol = 1;
      }

      const calculatedTargetIndex = newRow * 2 + newCol;

      // Only update target if it's valid and different
      if (
        calculatedTargetIndex !== targetIndex.value &&
        calculatedTargetIndex >= 0 &&
        calculatedTargetIndex < photosLength
      ) {
        targetIndex.value = calculatedTargetIndex;
      }
    })
    .onEnd(() => {
      'worklet';
      const finalTargetIndex = targetIndex.value;

      // Only swap if target is different and valid
      if (
        finalTargetIndex !== index &&
        finalTargetIndex >= 0 &&
        finalTargetIndex < photosLength
      ) {
        runOnJS(onSwap)(index, finalTargetIndex);
      }

      // Reset to original position (will be updated by re-render after swap)
      translateX.value = withSpring(0, {
        damping: 15,
        stiffness: 150,
      });
      translateY.value = withSpring(0, {
        damping: 15,
        stiffness: 150,
      });
      zIndex.value = withSpring(1);
      scale.value = withSpring(1, {
        damping: 15,
        stiffness: 150,
      });
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
      ],
      zIndex: zIndex.value,
    };
  });

  const imageSource =
    typeof photo.uri === 'string' ? { uri: photo.uri } : photo.uri;

  const composedGesture = Gesture.Simultaneous(tapGesture, panGesture);

  return (
    <GestureDetector gesture={composedGesture}>
      <Animated.View
        style={[
          styles.photoSlot,
          {
            width: photoWidth,
            height: photoHeight,
            position: 'absolute',
            left: position.left,
            top: position.top,
          },
          animatedStyle,
        ]}
      >
        <View
          style={[
            styles.photoFilled,
            {
              backgroundColor: isDark ? '#262626' : '#FFF3F5',
              borderRadius: 25,
            },
          ]}
        >
          <Image
            source={imageSource}
            style={styles.photoImage}
            resizeMode="cover"
          />

          {/* Cover Image Badge */}
          {isCover && (
            <View style={styles.coverImageBadge}>
              <View
                style={[
                  styles.coverImageBadgeContainer,
                  {
                    backgroundColor: isDark
                      ? 'rgba(0, 0, 0, 0.6)'
                      : 'rgba(255, 255, 255, 0.95)',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.coverImageBadgeText,
                    { color: isDark ? '#FFFFFF' : '#8239FF' },
                  ]}
                >
                  Cover Image
                </Text>
              </View>
            </View>
          )}
        </View>
      </Animated.View>
    </GestureDetector>
  );
};

interface EmptyPhotoSlotProps {
  index: number;
  isCover: boolean;
  photoWidth: number;
  photoHeight: number;
  photoGap: number;
  isDark: boolean;
  onImagePicker: (index: number) => void;
}

const EmptyPhotoSlot: React.FC<EmptyPhotoSlotProps> = ({
  index,
  isCover,
  photoWidth,
  photoHeight,
  photoGap,
  isDark,
  onImagePicker,
}) => {
  const getPositionForIndex = (idx: number) => {
    const pos = GRID_POSITIONS[idx];
    return {
      left: pos.col * (photoWidth + photoGap),
      top: pos.row * (photoHeight + photoGap),
    };
  };

  const position = getPositionForIndex(index);

  return (
    <TouchableOpacity
      style={[
        styles.photoSlot,
        {
          width: photoWidth,
          height: photoHeight,
          position: 'absolute',
          left: position.left,
          top: position.top,
        },
      ]}
      onPress={() => onImagePicker(index)}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.photoEmpty,
          {
            backgroundColor: isDark ? '#262626' : '#FFF3F5',
            borderColor: '#515151',
            borderRadius: 25,
          },
        ]}
      >
        {/* Cover Image Badge - show on first empty slot */}
        {isCover && (
          <View style={styles.coverImageBadge}>
            <View
              style={[
                styles.coverImageBadgeContainer,
                {
                  backgroundColor: isDark
                    ? 'rgba(0, 0, 0, 0.6)'
                    : 'rgba(255, 255, 255, 0.95)',
                },
              ]}
            >
              <Text
                style={[
                  styles.coverImageBadgeText,
                  { color: isDark ? '#FFFFFF' : '#8239FF' },
                ]}
              >
                Cover Image
              </Text>
            </View>
          </View>
        )}

        {/* Plus button - only show if not cover image */}
        {!isCover && (
          <View style={styles.plusButtonContainer}>
            {isDark ? (
              <View
                style={[
                  styles.plusButton,
                  {
                    backgroundColor: '#FFFFFF',
                    shadowColor: '#000000',
                    shadowOpacity: 0.25,
                    shadowRadius: 8,
                  },
                ]}
              >
                <Text style={[styles.plusText, { color: '#262626' }]}>+</Text>
              </View>
            ) : (
              <LinearGradient
                colors={['#A776FC', '#8239FF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[
                  styles.plusButton,
                  {
                    shadowColor: '#FFDAE0',
                    shadowOpacity: 1,
                    shadowRadius: 22.5,
                  },
                ]}
              >
                <Text style={[styles.plusText, { color: '#FFF3F5' }]}>+</Text>
              </LinearGradient>
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: wp('11.6%'), // ~48px on 414px screen
    paddingTop: hp('10%'), // ~126px on 896px screen
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: hp('4.5%'), // ~40px gap from Figma
    width: wp('69.6%'), // ~288px width from Figma
  },
  title: {
    fontFamily: 'Comfortaa-Bold',
    fontWeight: '700',
    lineHeight: 38.5, // 1.48em
    letterSpacing: -0.52, // -2%
    textAlign: 'center',
    marginBottom: hp('1.5%'),
  },
  subtitle: {
    fontFamily: 'Sofia Pro',
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 29.5, // 1.64em
    textAlign: 'center',
    letterSpacing: -0.36, // -2%
  },
  photoGrid: {
    position: 'relative',
    height: hp('45.4%'), // ~407px total height (196 + 16 + 196)
  },
  photoSlot: {
    position: 'absolute',
  },
  photoFilled: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  photoImage: {
    width: '100%',
    height: '100%',
  },
  coverImageBadge: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  coverImageBadgeContainer: {
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    ...(Platform.OS === 'ios' && {
      backdropFilter: 'blur(10px)',
    }),
  },
  coverImageBadgeText: {
    fontFamily: 'Sofia Pro',
    fontWeight: '600',
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  photoEmpty: {
    width: '100%',
    height: '100%',
    borderWidth: 1,
    borderStyle: 'dashed',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusButton: {
    width: wp('12%'),
    height: hp('5.5%'),
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 10 },
    elevation: 5,
  },
  plusText: {
    fontFamily: 'Sofia Pro',
    fontWeight: '600',
    fontSize: 25,
    lineHeight: 25,
    letterSpacing: -0.5, // -2%
  },
});

export default MediaScreen;
