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
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <BackButton onPress={() => navigation.goBack()} size="medium" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text
            style={[styles.title, { color: colors.heading }]}
          >
            Interests
          </Text>
          <Text style={[styles.subtitle, { color: colors.textDisabled }]}>
            Select a few of your interests to match with{'\n'}users who have
            similar things in common.
          </Text>
        </View>

        {/* Interests Grid */}
        <MultiSelectSection
          options={interestOptions}
          selectedValues={selectedInterests}
          onSelect={handleSelect}
          iconMap={iconMap}
        />
      </ScrollView>

      <NextButton
        onPress={handleNext}
        showText={true}
        textLabel="Next"
        size="medium"
      />
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
    paddingTop: hp('14%'),
    paddingBottom: hp('12%'),
  },
  header: {
    alignItems: 'center',
    marginBottom: hp('4%'),
  },
  title: {
    fontFamily: 'Comfortaa-Bold',
    fontWeight: '700',
    fontSize: 32,
    letterSpacing: -0.64,
    marginBottom: 16,
  },
  subtitle: {
    fontFamily: 'Sofia Pro',
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 30,
    textAlign: 'center',
    letterSpacing: -0.36,
  },
});

export default InterestsScreen;
