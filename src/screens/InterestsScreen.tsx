import React, { useState, useMemo } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '../hooks/useTheme';
import { wp, hp } from '../utils/responsive';
import {
  AuthStackNavigationProp,
  MainStackNavigationProp,
} from '../navigation/types';
import BackButton from '../components/BackButton';
import NextButton from '../components/NextButton';
import GradientButton from '../components/GradientButton';
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
  const route = useRoute();
  const navigation = useNavigation<
    AuthStackNavigationProp | MainStackNavigationProp
  >();
  const params = route.params as { fromMyProfile?: boolean } | undefined;
  const fromMyProfile = params?.fromMyProfile ?? false;

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
    (navigation as AuthStackNavigationProp).navigate('LifestyleAndBeliefs');
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

        {fromMyProfile ? (
          <View style={styles.updateButtonContainer}>
            <GradientButton onPress={() => navigation.goBack()} text="Update" />
          </View>
        ) : (
          <NextButton
            onPress={handleNext}
            showText={true}
            textLabel="Next"
            size="medium"
          />
        )}
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
    paddingHorizontal: wp('10%'),
    paddingBottom: hp('18%'),
    flexGrow: 1,
  },
  updateButtonContainer: {
    position: 'absolute',
    bottom: hp('8%'),
    left: 0,
    right: 0,
  },
});

export default InterestsScreen;
