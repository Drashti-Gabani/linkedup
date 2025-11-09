import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../hooks/useTheme';
import MatchCard from '../components/MatchCard';
import { MainStackNavigationProp } from '../navigation/types';

// Mock data - replace with real data from your API
const MOCK_LIKES = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    name: 'Jane',
    age: 19,
    jobTitle: 'Software Engineer',
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e',
    name: 'Sarah',
    age: 25,
    jobTitle: 'Software Engineer',
  },
  {
    id: '3',
    imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1',
    name: 'Emma',
    age: 22,
    jobTitle: 'Software Engineer',
  },
  {
    id: '4',
    imageUrl: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df',
    name: 'Olivia',
    age: 24,
    jobTitle: 'Software Engineer',
  },
  {
    id: '5',
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
    name: 'Sophia',
    age: 21,
    jobTitle: 'Software Engineer',
  },
  {
    id: '6',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
    name: 'Ava',
    age: 23,
    jobTitle: 'Software Engineer',
  },
];

const LikesScreen: React.FC = () => {
  const navigation = useNavigation<MainStackNavigationProp>();
  const { colors, mode } = useTheme();
  const isDark = mode === 'dark';

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#181818' : '#FFFFFF' }]}>
      {/* Header */}
      <View style={styles.header}>
        {/* Back Button */}
        <TouchableOpacity
          style={[styles.headerButton, { backgroundColor: isDark ? '#2D2D2D' : '#FFF4F6' }]}
          onPress={() => navigation.goBack()}
        >
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <Path
              d="M10 8l-4 4 4 4"
              stroke={isDark ? '#FFFFFF' : '#000000'}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </TouchableOpacity>

        {/* Title */}
        <View style={styles.headerTextContainer}>
          <Text style={[styles.headerTitle, { color: isDark ? '#FFFFFF' : '#000000' }]}>
            Liked
          </Text>
          <Text style={styles.headerSubtitle}>{MOCK_LIKES.length} Users</Text>
        </View>

        {/* Settings Button */}
        <TouchableOpacity
          style={[styles.headerButton, { backgroundColor: isDark ? '#2D2D2D' : '#FFF4F6' }]}
          onPress={() => navigation.navigate('Settings')}
        >
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <Path
              d="M3 7h6M3 12h6M3 17h6M15 7l6 6M15 13l6-6"
              stroke={isDark ? '#FFFFFF' : '#000000'}
              strokeWidth={2}
              strokeLinecap="round"
            />
          </Svg>
        </TouchableOpacity>
      </View>

      {/* Likes Grid */}
      <FlatList
        data={MOCK_LIKES}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <MatchCard
            imageUrl={item.imageUrl}
            name={item.name}
            age={item.age}
            jobTitle={item.jobTitle}
            onPress={() => navigation.navigate('UserProfile')}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    paddingTop: 47,
    paddingBottom: 40,
  },
  headerButton: {
    width: 48,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTextContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 16,
  },
  headerTitle: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: 25,
    fontWeight: '700',
    lineHeight: 27.88,
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontFamily: 'Sofia Pro',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 16,
    letterSpacing: -0.32,
    color: '#ADADAD',
    textAlign: 'center',
    marginTop: 8,
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

export default LikesScreen;
