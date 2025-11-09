import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../hooks/useTheme';
import { wp, hp } from '../utils/responsive';
import { AuthStackNavigationProp } from '../navigation/types';
import MultiSelectSection from '../components/MultiSelectSection';
import BackButton from '../components/BackButton';
import NextButton from '../components/NextButton';

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
  const navigation = useNavigation<AuthStackNavigationProp>();

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
    navigation.navigate('Education');
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <BackButton onPress={() => navigation.goBack()} size="medium" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.highlight} />
            <Text
              style={[styles.title, { color: colors.heading }]}
            >
              Who am I
            </Text>
            <Text
              style={[
                styles.subtitle,
                { color: colors.subheading },
              ]}
            >
              Select what explains you
            </Text>
          </View>

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

        {/* Next Button Container */}
        <View style={styles.nextButtonWrapper}>
          <View style={styles.nextButtonInner}>
            <NextButton
              onPress={handleNext}
              showText={true}
              textLabel="Next"
              size="medium"
              style={styles.nextButtonOverride}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: hp('5%'),
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    paddingHorizontal: wp('11%'),
    paddingTop: hp('12%'),
    paddingBottom: hp('2%'),
  },
  header: {
    alignItems: 'center',
    marginBottom: hp('5%'),
    position: 'relative',
  },
  highlight: {
    position: 'absolute',
    backgroundColor: '#F2F2F2',
    width: 115,
    height: 18,
    top: '15%',
  },
  title: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: -0.52,
    marginBottom: 16,
  },
  subtitle: {
    fontFamily: 'Sofia Pro',
    fontSize: 16,
    lineHeight: 27,
    textAlign: 'center',
    letterSpacing: -0.32,
  },
  nextButtonWrapper: {
    paddingVertical: hp('3%'),
    paddingHorizontal: wp('6%'),
    alignItems: 'flex-end',
  },
  nextButtonInner: {
    width: '100%',
    alignItems: 'flex-end',
  },
  nextButtonOverride: {
    position: 'relative',
    bottom: 0,
    right: 0,
  },
});

export default WhoAmIScreen;
