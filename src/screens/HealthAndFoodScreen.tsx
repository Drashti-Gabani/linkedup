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
      <BackButton onPress={() => navigation.goBack()} size="medium" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text
              style={[styles.title, { color: colors.heading }]}
            >
              Health and Food
            </Text>
            <Text
              style={[
                styles.subtitle,
                { color: colors.subheading },
              ]}
            >
              Select what you like in diet
            </Text>
          </View>

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
    paddingHorizontal: wp('6%'),
    paddingTop: hp('12%'),
    paddingBottom: hp('2%'),
  },
  header: {
    alignItems: 'center',
    marginBottom: hp('4%'),
  },
  title: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: -0.52,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Sofia Pro',
    fontSize: 16,
    lineHeight: 20,
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

export default HealthAndFoodScreen;
