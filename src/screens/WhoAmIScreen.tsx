import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '../hooks/useTheme';
import { wp, hp } from '../utils/responsive';
import { AuthStackNavigationProp, MainStackNavigationProp } from '../navigation/types';
import MultiSelectSection from '../components/MultiSelectSection';
import BackButton from '../components/BackButton';
import NextButton from '../components/NextButton';
import GradientButton from '../components/GradientButton';
import ScreenTitle from '../components/ScreenTitle';

const PERSONALITY_TRAITS = [
  'Funny',
  'Serious',
  'Social',
  'Extrovert',
  'Dynamic',
  'Kind',
  'Caring',
  'Organized',
  'Honest',
  'Loyal',
  'Adventurous',
  'Romantic',
  'Casual',
  'Practical',
  'Energetic',
  'Relaxed',
  'Disciplined',
];

const PETS_OPTIONS = [
  "I've Dogs",
  "I've Cats",
  'Want pet',
  "Don't like pets",
  "Doesn't matter",
];

const WhoAmIScreen: React.FC = () => {
  const { colors } = useTheme();
  const route = useRoute();
  const navigation = useNavigation<AuthStackNavigationProp | MainStackNavigationProp>();
  const params = route.params as { fromMyProfile?: boolean } | undefined;
  const fromMyProfile = params?.fromMyProfile ?? false;

  const [personalityTraits, setPersonalityTraits] = useState<string[]>([
    'Funny',
    'Kind',
    'Casual',
  ]);
  const [pets, setPets] = useState<string[]>(["I've Dogs"]);

  const togglePersonalityTrait = (trait: string) => {
    setPersonalityTraits(prev =>
      prev.includes(trait) ? prev.filter(t => t !== trait) : [...prev, trait],
    );
  };

  const togglePets = (pet: string) => {
    setPets(prev =>
      prev.includes(pet) ? prev.filter(p => p !== pet) : [...prev, pet],
    );
  };

  const handleNext = () => {
    console.log('Who Am I Data:', { personalityTraits, pets });
    (navigation as AuthStackNavigationProp).navigate('Education');
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        bounces={false}
      >
        <BackButton onPress={() => navigation.goBack()} size="medium" />
        <View style={styles.content}>
          <ScreenTitle title="Who am I" subtitle="Select what explains you" />

          {/* Personality Traits */}
          <MultiSelectSection
            title="Personality Traits"
            options={PERSONALITY_TRAITS}
            selectedValues={personalityTraits}
            onSelect={togglePersonalityTrait}
          />

          {/* Pets */}
          <MultiSelectSection
            title="Pets"
            options={PETS_OPTIONS}
            selectedValues={pets}
            onSelect={togglePets}
          />
        </View>

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
    flexGrow: 1,
    paddingBottom: hp('18%'),
  },
  content: {
    paddingHorizontal: wp('10%'),
  },
  updateButtonContainer: {
    position: 'absolute',
    bottom: hp('8%'),
    left: 0,
    right: 0,
  },
});

export default WhoAmIScreen;
