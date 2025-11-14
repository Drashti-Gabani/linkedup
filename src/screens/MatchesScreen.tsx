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
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainTabParamList, MainStackParamList } from '../navigation/types';

// Mock data - replace with real data from your API
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
    name: 'Jane',
    age: 19,
    distance: '16 miles',
    hasMatched: false,
  },
  {
    id: '6',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
    name: 'Skylar',
    age: 23,
    distance: '8 miles',
    hasMatched: false,
  },
];

const MatchesScreen: React.FC = () => {
  type MatchesScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<MainTabParamList, 'Matches'>,
    NativeStackNavigationProp<MainStackParamList>
  >;
  const navigation = useNavigation<MatchesScreenNavigationProp>();
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        {/* Back Button */}
        <TouchableOpacity
          style={[
            styles.headerButton,
            { backgroundColor: colors.headerButtonBackground },
          ]}
          onPress={() => navigation.goBack()}
        >
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <Path
              d="M10 8l-4 4 4 4"
              stroke={colors.headerButtonIcon}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </TouchableOpacity>

        {/* Title */}
        <View style={styles.headerTextContainer}>
          <Text
            style={[
              styles.headerTitle,
              { color: colors.heading },
            ]}
          >
            All Matches
          </Text>
          <Text style={styles.headerSubtitle}>
            {MOCK_MATCHES.length} matches
          </Text>
        </View>

        {/* Settings Button */}
        <TouchableOpacity
          style={[
            styles.headerButton,
            { backgroundColor: colors.headerButtonBackground },
          ]}
          onPress={() => navigation.navigate('Settings')}
        >
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <Path
              d="M3 7h6M3 12h6M3 17h6M15 7l6 6M15 13l6-6"
              stroke={colors.headerButtonIcon}
              strokeWidth={2}
              strokeLinecap="round"
            />
          </Svg>
        </TouchableOpacity>
      </View>

      {/* Matches Grid */}
      <FlatList
        data={MOCK_MATCHES}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
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
    paddingBottom: 31,
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
    lineHeight: 27.88,
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontFamily: 'Sofia Pro',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24.75,
    letterSpacing: -0.32,
    color: '#ADADAD',
    textAlign: 'center',
    marginTop: 4,
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
