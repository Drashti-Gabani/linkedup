import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../hooks/useTheme';
import { wp, hp } from '../utils/responsive';
import { AuthStackNavigationProp } from '../navigation/types';
import SelectionSection from '../components/SelectionSection';
import BackButton from '../components/BackButton';
import NextButton from '../components/NextButton';
import ScreenTitle from '../components/ScreenTitle';

interface SelectionState {
  workout: string | null;
  diet: string | null;
  drinking: string | null;
  smoking: string | null;
}

const WORKOUT_OPTIONS = ['Regularly', 'Sometimes', 'Never'];
const DIET_OPTIONS = [
  'Vegetarian',
  'Non-vegetarian',
  'Vegan',
  'Eggetarian',
  'Pescatarian',
];
const DRINKING_OPTIONS = [
  'Regularly',
  'Socially',
  'Occasionally',
  'Quitting',
  'Never',
];
const SMOKING_OPTIONS = ['Regular', 'Sometimes', 'Quitting'];

const HealthAndFoodScreen: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<AuthStackNavigationProp>();

  const [selections, setSelections] = useState<SelectionState>({
    workout: 'Regularly',
    diet: 'Vegetarian',
    drinking: 'Regularly',
    smoking: 'Regular',
  });

  const handleNext = () => {
    console.log('Health and Food Selections:', selections);
    navigation.navigate('WhoAmI');
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
          <ScreenTitle
            title="Health and Food"
            subtitle="Select what you like in diet"
          />

          <SelectionSection
            title="Workout"
            options={WORKOUT_OPTIONS}
            selectedValue={selections.workout}
            onSelect={value => setSelections({ ...selections, workout: value })}
          />

          <SelectionSection
            title="Diet"
            options={DIET_OPTIONS}
            selectedValue={selections.diet}
            onSelect={value => setSelections({ ...selections, diet: value })}
          />

          <SelectionSection
            title="Drinking"
            options={DRINKING_OPTIONS}
            selectedValue={selections.drinking}
            onSelect={value =>
              setSelections({ ...selections, drinking: value })
            }
          />

          <SelectionSection
            title="Smoking"
            options={SMOKING_OPTIONS}
            selectedValue={selections.smoking}
            onSelect={value => setSelections({ ...selections, smoking: value })}
          />
        </View>

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
    flexGrow: 1,
    paddingBottom: hp('12%'),
  },
  content: {
    paddingHorizontal: wp('10%'),
  },
});

export default HealthAndFoodScreen;
