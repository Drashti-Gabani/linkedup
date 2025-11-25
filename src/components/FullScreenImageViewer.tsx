import React, { useRef, useState } from 'react';
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StatusBar,
  Text,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../hooks/useTheme';
import { AppImage } from '../utils/AppImage';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface FullScreenImageViewerProps {
  visible: boolean;
  images: string[];
  initialIndex?: number;
  onClose: () => void;
}

const FullScreenImageViewer: React.FC<FullScreenImageViewerProps> = ({
  visible,
  images,
  initialIndex = 0,
  onClose,
}) => {
  const { isDark, colors } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const flatListRef = useRef<FlatList>(null);

  React.useEffect(() => {
    if (visible) {
      setCurrentIndex(initialIndex);
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index: initialIndex,
          animated: false,
        });
      }, 100);
    }
  }, [visible, initialIndex]);

  const handleScroll = (event: any) => {
    const slideSize = SCREEN_WIDTH;
    const index = Math.round(event.nativeEvent.contentOffset.x / slideSize);
    setCurrentIndex(index);
  };

  const renderImage = ({ item }: { item: string }) => (
    <View style={styles.imageContainer}>
      <AppImage source={{ uri: item }} style={styles.image} resizeMode="contain" />
    </View>
  );

  // Calculate overlay background based on theme
  const overlayBackground = isDark
    ? 'rgba(0, 0, 0, 0.95)'
    : 'rgba(255, 255, 255, 0.98)'; // Light overlay for light mode

  // Text and icon colors - adapt based on theme
  const textColor = isDark ? '#FFFFFF' : colors.textQuaternary;
  const iconColor = isDark ? '#FFFFFF' : colors.textQuaternary;
  const buttonBackground = isDark
    ? 'rgba(255, 255, 255, 0.2)'
    : 'rgba(0, 0, 0, 0.1)';
  const indicatorInactive = isDark
    ? 'rgba(255, 255, 255, 0.3)'
    : 'rgba(0, 0, 0, 0.2)';
  const indicatorActive = isDark ? '#FFFFFF' : colors.textQuaternary;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={overlayBackground}
      />
      <View style={[styles.container, { backgroundColor: overlayBackground }]}>
        {/* Close Button */}
        <TouchableOpacity
          style={[styles.closeButton, { backgroundColor: buttonBackground }]}
          onPress={onClose}
        >
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <Path
              d="M18 6L6 18M6 6l12 12"
              stroke={iconColor}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </TouchableOpacity>

        {/* Image Counter */}
        {images.length > 1 && (
          <View style={styles.counterContainer}>
            <View
              style={[styles.counter, { backgroundColor: buttonBackground }]}
            >
              <Text style={[styles.counterText, { color: textColor }]}>
                {currentIndex + 1} / {images.length}
              </Text>
            </View>
          </View>
        )}

        {/* Image FlatList */}
        <FlatList
          ref={flatListRef}
          data={images}
          renderItem={renderImage}
          keyExtractor={(item, index) => `image-${index}`}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          getItemLayout={(data, index) => ({
            length: SCREEN_WIDTH,
            offset: SCREEN_WIDTH * index,
            index,
          })}
          onScrollToIndexFailed={() => {}}
        />

        {/* Page Indicators */}
        {images.length > 1 && (
          <View style={styles.indicatorsContainer}>
            {images.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  {
                    backgroundColor:
                      index === currentIndex
                        ? indicatorActive
                        : indicatorInactive,
                  },
                  index === currentIndex && styles.indicatorActive,
                ]}
              />
            ))}
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  imageContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  counterContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  counter: {
    minWidth: 60,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  counterText: {
    fontFamily: 'Comfortaa-Regular',
    fontSize: 14,
    fontWeight: '600',
  },
  indicatorsContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    zIndex: 10,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  indicatorActive: {
    width: 24,
  },
});

export default FullScreenImageViewer;
