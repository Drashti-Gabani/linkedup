import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Svg, { Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../hooks/useTheme';
import SwipeableCard from '../components/SwipeableCard';
import { User } from '../data/mockUsers';
import { MainTabParamList, MainStackParamList } from '../navigation/types';

// TODO: Replace with API data
const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Ashley',
    age: 21,
    occupation: 'Model',
    distance: '3 miles',
    photos: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1',
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df',
    ],
  },
  {
    id: '2',
    name: 'Emma',
    age: 24,
    occupation: 'Designer',
    distance: '5 miles',
    photos: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
      'https://images.unsplash.com/photo-1506863530036-1efeddceb993',
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df',
    ],
  },
  {
    id: '3',
    name: 'Sophia',
    age: 23,
    occupation: 'Photographer',
    distance: '2 miles',
    photos: [
      'https://images.unsplash.com/photo-1531123897727-8f129e1688ce',
      'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43',
      'https://images.unsplash.com/photo-1516726817505-f5ed825624d8',
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e',
    ],
  },
  {
    id: '4',
    name: 'Olivia',
    age: 22,
    occupation: 'Engineer',
    distance: '4 miles',
    photos: [
      'https://images.unsplash.com/photo-1532170579297-281918c8ae72',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9',
      'https://images.unsplash.com/photo-1531123897727-8f129e1688ce',
    ],
  },
  {
    id: '5',
    name: 'Isabella',
    age: 25,
    occupation: 'Artist',
    distance: '6 miles',
    photos: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      'https://images.unsplash.com/photo-1506863530036-1efeddceb993',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
      'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43',
    ],
  },
];

type DiscoverScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Discover'>,
  NativeStackNavigationProp<MainStackParamList>
>;

const DiscoverScreen: React.FC = () => {
  const { colors, isDark } = useTheme();
  const navigation = useNavigation<DiscoverScreenNavigationProp>();
  const [currentUserIndex, setCurrentUserIndex] = useState(0);

  const handleSwipeLeft = () => {
    if (currentUserIndex < MOCK_USERS.length) {
      console.log('Rejected:', MOCK_USERS[currentUserIndex].name);
    }
    // Always increment to move to next card or show empty state
    setCurrentUserIndex(currentUserIndex + 1);
  };

  const handleSwipeRight = () => {
    if (currentUserIndex < MOCK_USERS.length) {
      console.log('Liked:', MOCK_USERS[currentUserIndex].name);
    }
    // Always increment to move to next card or show empty state
    setCurrentUserIndex(currentUserIndex + 1);
  };

  const handleSuperLike = () => {
    if (currentUserIndex < MOCK_USERS.length) {
      console.log('Super Liked:', MOCK_USERS[currentUserIndex].name);
    }
    // Always increment to move to next card or show empty state
    setCurrentUserIndex(currentUserIndex + 1);
  };

  const handleViewProfile = () => {
    navigation.navigate('UserProfile');
  };

  const currentUser = MOCK_USERS[currentUserIndex];
  const hasNoMoreCards = currentUserIndex >= MOCK_USERS.length;

  const handleAdjustFilters = () => {
    navigation.navigate('Filters');
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
          <Text style={[styles.title, { color: colors.heading }]}>
            Discover
          </Text>

          {/* Star (Likes) and Filter buttons */}
          <View style={styles.headerButtons}>
            <TouchableOpacity
              style={[
                styles.headerButton,
                { backgroundColor: colors.headerButtonBackground },
              ]}
              onPress={() => navigation.navigate('Likes')}
              activeOpacity={0.7}
            >
              <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                <Path
                  d="M10 1.5L12.5 7.5L19 8.5L14.5 13L15.5 19.5L10 16.5L4.5 19.5L5.5 13L1 8.5L7.5 7.5L10 1.5Z"
                  fill={colors.headerButtonIcon}
                  fillRule="evenodd"
                />
              </Svg>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.headerButton,
                { backgroundColor: colors.headerButtonBackground },
              ]}
              onPress={handleAdjustFilters}
              activeOpacity={0.7}
            >
              <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                {/* Filter icon - matches Figma design: two vertical lines with horizontal lines */}
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

        {/* Card Stack or Empty State */}
        <View style={styles.cardContainer}>
          {hasNoMoreCards ? (
            <View style={styles.emptyStateContainer}>
              {/* Heart Icon */}
              <View
                style={[
                  styles.emptyIconContainer,
                  { backgroundColor: colors.headerButtonBackground },
                ]}
              >
                <Svg width={80} height={80} viewBox="0 0 80 80" fill="none">
                  <Path
                    d="M40 70C40 70 10 50 10 30C10 20 18 12 28 12C34 12 40 16 40 16C40 16 46 12 52 12C62 12 70 20 70 30C70 50 40 70 40 70Z"
                    fill={colors.headerButtonIcon}
                    fillOpacity={0.2}
                  />
                  <Path
                    d="M40 65C40 65 15 47.5 15 30C15 22 21 16 29 16C34 16 40 19.5 40 19.5C40 19.5 46 16 51 16C59 16 65 22 65 30C65 47.5 40 65 40 65Z"
                    stroke={colors.headerButtonIcon}
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </View>

              {/* Title */}
              <Text style={[styles.emptyTitle, { color: colors.heading }]}>
                No More Profiles
              </Text>

              {/* Subtitle */}
              <Text
                style={[styles.emptySubtitle, { color: colors.textSecondary }]}
              >
                You've seen everyone in your area!{'\n'}
                Try adjusting your filters to see more people.
              </Text>

              {/* Adjust Filters Button */}
              <TouchableOpacity
                style={[
                  styles.filterButton,
                  { backgroundColor: colors.headerButtonIcon },
                ]}
                onPress={handleAdjustFilters}
                activeOpacity={0.8}
              >
                <Svg
                  width={20}
                  height={20}
                  viewBox="0 0 22 22"
                  fill="none"
                  style={styles.filterButtonIcon}
                >
                  <Path
                    d="M3 11h6M3 6h6M3 16h6M13 11l6-6M13 11l6 6"
                    stroke="#FFFFFF"
                    strokeWidth={2}
                    strokeLinecap="round"
                  />
                </Svg>
                <Text style={styles.filterButtonText}>Adjust Filters</Text>
              </TouchableOpacity>
            </View>
          ) : (
            currentUser && (
              <SwipeableCard
                key={currentUser.id}
                user={currentUser}
                onSwipeLeft={handleSwipeLeft}
                onSwipeRight={handleSwipeRight}
                onSuperLike={handleSuperLike}
                onViewProfile={handleViewProfile}
              />
            )
          )}
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
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
  title: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: 30,
    letterSpacing: -0.9,
    lineHeight: 33,
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
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  emptyIconContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  emptyTitle: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: 28,
    letterSpacing: -0.84,
    lineHeight: 31,
    textAlign: 'center',
    marginBottom: 16,
  },
  emptySubtitle: {
    fontFamily: 'Sofia Pro',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 40,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
    paddingVertical: 16,
    borderRadius: 25,
    gap: 10,
    shadowColor: '#8239FF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  filterButtonIcon: {
    marginRight: -2,
  },
  filterButtonText: {
    fontFamily: 'Comfortaa-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    letterSpacing: -0.32,
  },
});

export default DiscoverScreen;
