import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';
import { useTheme } from '../hooks/useTheme';
import MatchCard from '../components/MatchCard';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainTabParamList, MainStackParamList } from '../navigation/types';

type MatchTabType = 'matches' | 'likedMe';

const WHITE = '#FFFFFF';
const PURPLE_PRIMARY = '#8239FF'; // Purple color for active tab in both light and dark mode

// Mock data for Matches tab - replace with real data from your API
const MOCK_MATCHES = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    name: 'Jane',
    age: 19,
    distance: '4.5 miles',
    hasMatched: true,
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e',
    name: 'Skylar',
    age: 23,
    distance: '8 miles',
    hasMatched: true,
  },
  {
    id: '3',
    imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1',
    name: 'Ali',
    age: 19,
    distance: '7 miles',
    hasMatched: false,
  },
  {
    id: '4',
    imageUrl: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df',
    name: 'Joy',
    age: 22,
    distance: '22 miles',
    hasMatched: false,
  },
  {
    id: '5',
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
    name: 'Emma',
    age: 21,
    distance: '16 miles',
    hasMatched: false,
  },
  {
    id: '6',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
    name: 'Sophia',
    age: 24,
    distance: '8 miles',
    hasMatched: false,
  },
];

// Mock data for Liked Me tab - replace with real data from your API
const MOCK_LIKED_ME = [
  {
    id: 'l1',
    imageUrl: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce',
    name: 'Olivia',
    age: 25,
    distance: '3 miles',
    hasMatched: false,
  },
  {
    id: 'l2',
    imageUrl: 'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43',
    name: 'Isabella',
    age: 20,
    distance: '5 miles',
    hasMatched: false,
  },
  {
    id: 'l3',
    imageUrl: 'https://images.unsplash.com/photo-1516726817505-f5ed825624d8',
    name: 'Ava',
    age: 22,
    distance: '12 miles',
    hasMatched: false,
  },
  {
    id: 'l4',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    name: 'Mia',
    age: 23,
    distance: '9 miles',
    hasMatched: false,
  },
  {
    id: 'l5',
    imageUrl: 'https://images.unsplash.com/photo-1506863530036-1efeddceb993',
    name: 'Charlotte',
    age: 21,
    distance: '15 miles',
    hasMatched: false,
  },
  {
    id: 'l6',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
    name: 'Amelia',
    age: 24,
    distance: '6 miles',
    hasMatched: false,
  },
];

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const MatchesScreen: React.FC = () => {
  type MatchesScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<MainTabParamList, 'Matches'>,
    NativeStackNavigationProp<MainStackParamList>
  >;
  const navigation = useNavigation<MatchesScreenNavigationProp>();
  const { colors, isDark } = useTheme();
  const [activeTab, setActiveTab] = useState<MatchTabType>('matches');

  // Animation values for tab buttons
  const matchesProgress = useSharedValue(activeTab === 'matches' ? 1 : 0);
  const likedMeProgress = useSharedValue(activeTab === 'likedMe' ? 1 : 0);
  const matchesScale = useSharedValue(1);
  const likedMeScale = useSharedValue(1);

  // Update animation values when tab changes
  useEffect(() => {
    const targetMatches = activeTab === 'matches' ? 1 : 0;
    const targetLikedMe = activeTab === 'likedMe' ? 1 : 0;

    // Animate the selected button smoothly
    if (activeTab === 'matches') {
      matchesProgress.value = withSpring(1, {
        damping: 15,
        stiffness: 150,
      });
      // Set deselected button immediately without animation to prevent flash
      likedMeProgress.value = 0;
    } else {
      likedMeProgress.value = withSpring(1, {
        damping: 15,
        stiffness: 150,
      });
      // Set deselected button immediately without animation to prevent flash
      matchesProgress.value = 0;
    }
  }, [activeTab]);

  const handleTabPress = (tab: MatchTabType) => {
    // Only animate the button being pressed
    if (tab === 'matches' && activeTab !== 'matches') {
      matchesScale.value = withSpring(0.95, { damping: 10 }, () => {
        matchesScale.value = withSpring(1, { damping: 10 });
      });
    } else if (tab === 'likedMe' && activeTab !== 'likedMe') {
      likedMeScale.value = withSpring(0.95, { damping: 10 }, () => {
        likedMeScale.value = withSpring(1, { damping: 10 });
      });
    }
    setActiveTab(tab);
  };

  const handleFilterPress = () => {
    navigation.navigate('Filters');
  };

  // Animated styles for Matches button
  const matchesButtonStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      matchesProgress.value,
      [0, 1],
      [colors.headerButtonBackground, PURPLE_PRIMARY],
    );

    return {
      backgroundColor,
      transform: [{ scale: matchesScale.value }],
    };
  });

  const matchesTextStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      matchesProgress.value,
      [0, 1],
      [colors.heading, WHITE],
    );

    return {
      color,
    };
  });

  // Animated styles for Liked Me button
  const likedMeButtonStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      likedMeProgress.value,
      [0, 1],
      [colors.headerButtonBackground, PURPLE_PRIMARY],
    );

    return {
      backgroundColor,
      transform: [{ scale: likedMeScale.value }],
    };
  });

  const likedMeTextStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      likedMeProgress.value,
      [0, 1],
      [colors.heading, WHITE],
    );

    return {
      color,
    };
  });

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={['top']}
    >
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />

      {/* Header */}
      <View style={styles.header}>
        {/* Title and Tab Buttons */}
        <View style={styles.headerLeft}>
          <AnimatedTouchableOpacity
            style={[styles.tabButton, matchesButtonStyle]}
            onPress={() => handleTabPress('matches')}
            activeOpacity={0.8}
          >
            <Animated.Text style={[styles.tabButtonText, matchesTextStyle]}>
              Matches
            </Animated.Text>
          </AnimatedTouchableOpacity>

          <AnimatedTouchableOpacity
            style={[styles.tabButton, likedMeButtonStyle]}
            onPress={() => handleTabPress('likedMe')}
            activeOpacity={0.8}
          >
            <Animated.Text style={[styles.tabButtonText, likedMeTextStyle]}>
              Liked Me
            </Animated.Text>
          </AnimatedTouchableOpacity>
        </View>

        {/* Filter Icon */}
        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={[
              styles.headerButton,
              { backgroundColor: colors.headerButtonBackground },
            ]}
            onPress={handleFilterPress}
            activeOpacity={0.7}
          >
            <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
              <Path
                d="M6 16L6 0"
                stroke={colors.headerButtonIcon}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M8 10L4 10"
                stroke={colors.headerButtonIcon}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M12 16L12 0"
                stroke={colors.headerButtonIcon}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M14 14L10 14"
                stroke={colors.headerButtonIcon}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </TouchableOpacity>
        </View>
      </View>

      {/* Matches Grid */}
      <FlatList
        data={activeTab === 'matches' ? MOCK_MATCHES : MOCK_LIKED_ME}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        key={activeTab} // Force re-render when tab changes
        renderItem={({ item }) => (
          <MatchCard
            imageUrl={item.imageUrl}
            name={item.name}
            age={item.age}
            distance={item.distance}
            hasMatched={item.hasMatched}
            onPress={() => navigation.navigate('UserProfile')}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: 15,
    paddingBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    gap: 12,
    flex: 1,
  },
  tabButton: {
    paddingHorizontal: 22,
    paddingVertical: 11,
    borderRadius: 22,
    minWidth: 90,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tabButtonText: {
    fontFamily: 'Comfortaa-SemiBold',
    fontSize: 16,
    letterSpacing: -0.32,
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  headerButton: {
    width: 50,
    height: 48,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingHorizontal: 25,
    paddingBottom: 100,
  },
  columnWrapper: {
    gap: 20,
    marginBottom: 20,
  },
});

export default MatchesScreen;
