import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../hooks/useTheme';
import { wp, hp } from '../utils/responsive';
import { AuthStackNavigationProp } from '../navigation/types';
import BackButton from '../components/BackButton';
import NextButton from '../components/NextButton';
import MultiSelectSection from '../components/MultiSelectSection';
import ScreenTitle from '../components/ScreenTitle';
import { interestIconImages } from '../assets/images';

interface Interest {
  id: string;
  label: string;
}

const INTERESTS: Interest[] = [
  { id: 'cooking', label: 'Cooking' },
  { id: 'movies', label: 'Movies' },
  { id: 'music', label: 'Music Enthusiast' },
  { id: 'book', label: 'Book Nerd' },
  { id: 'traveling', label: 'Traveling' },
  { id: 'athlete', label: 'Athlete' },
  { id: 'technology', label: 'Technology' },
  { id: 'shopping', label: 'Shopping' },
  { id: 'art', label: 'Art' },
  { id: 'photography', label: 'Photography' },
  { id: 'videogames', label: 'Video Games' },
  { id: 'boating', label: 'Boating' },
  { id: 'gambling', label: 'Gambling' },
  { id: 'swimming', label: 'Swimming' },
  { id: 'videography', label: 'Videography' },
  { id: 'design', label: 'Design' },
];

const InterestsScreen: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<AuthStackNavigationProp>();

  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Movies',
    'Traveling',
    'Videography',
  ]);

  const interestOptions = useMemo(
    () => INTERESTS.map(interest => interest.label),
    [],
  );

  const iconMap = useMemo(() => interestIconImages, []);

  const handleSelect = (value: string) => {
    setSelectedInterests(prev =>
      prev.includes(value) ? prev.filter(i => i !== value) : [...prev, value],
    );
  };

  const handleNext = () => {
    // Navigate to next screen
    console.log('Selected interests:', selectedInterests);
    navigation.navigate('LifestyleAndBeliefs');
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <BackButton onPress={() => navigation.goBack()} size="medium" />
        <ScreenTitle
          title="Interests"
          subtitle="Select a few of your interests to match with users who have similar things in common."
        />

        {/* Interests Grid */}
        <MultiSelectSection
          options={interestOptions}
          selectedValues={selectedInterests}
          onSelect={handleSelect}
          iconMap={iconMap}
        />

        <NextButton
          onPress={handleNext}
          showText={true}
          textLabel="Next"
          size="medium"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: wp('5%'),
    paddingBottom: hp('12%'),
    flexGrow: 1,
  },
});

export default InterestsScreen;
