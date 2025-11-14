import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
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
    console.log('Rejected:', MOCK_USERS[currentUserIndex].name);
    if (currentUserIndex < MOCK_USERS.length - 1) {
      setCurrentUserIndex(currentUserIndex + 1);
    }
  };

  const handleSwipeRight = () => {
    console.log('Liked:', MOCK_USERS[currentUserIndex].name);
    navigation.navigate('Likes');
    if (currentUserIndex < MOCK_USERS.length - 1) {
      setCurrentUserIndex(currentUserIndex + 1);
    }
  };

  const handleSuperLike = () => {
    console.log('Super Liked:', MOCK_USERS[currentUserIndex].name);
    if (currentUserIndex < MOCK_USERS.length - 1) {
      setCurrentUserIndex(currentUserIndex + 1);
    }
  };

  const handleViewProfile = () => {
    navigation.navigate('UserProfile');
  };

  const currentUser = MOCK_USERS[currentUserIndex];

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

          {/* Notification and Filter buttons */}
          <View style={styles.headerButtons}>
            <TouchableOpacity style={[styles.headerButton, { backgroundColor: colors.headerButtonBackground }]}>
              <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                <Path
                  d="M10 2C7.8 2 6 3.8 6 6v3l-2 2v4h12v-4l-2-2V6c0-2.2-1.8-4-4-4zm0 16c1.1 0 2-.9 2-2H8c0 1.1.9 2 2 2z"
                  fill={colors.accent}
                />
              </Svg>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.headerButton, { backgroundColor: colors.headerButtonBackground }]}>
              <Svg width={22} height={22} viewBox="0 0 22 22" fill="none">
                <Path
                  d="M3 11h6M3 6h6M3 16h6M13 11l6-6M13 11l6 6"
                  stroke={colors.accent}
                  strokeWidth={2}
                  strokeLinecap="round"
                />
              </Svg>
            </TouchableOpacity>
          </View>
        </View>

        {/* Card Stack */}
        <View style={styles.cardContainer}>
          {currentUser && (
            <SwipeableCard
              key={currentUser.id}
              user={currentUser}
              onSwipeLeft={handleSwipeLeft}
              onSwipeRight={handleSwipeRight}
              onSuperLike={handleSuperLike}
              onViewProfile={handleViewProfile}
            />
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
});

export default DiscoverScreen;
