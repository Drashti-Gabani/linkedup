import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../hooks/useTheme';
import { wp, hp } from '../utils/responsive';
import { AuthStackNavigationProp } from '../navigation/types';
import BackButton from '../components/BackButton';
import NextButton from '../components/NextButton';
import SelectionSection from '../components/SelectionSection';
import { genderIcons } from '../assets/icons';

type Gender = 'male' | 'female' | 'non-binary';

const GENDER_OPTIONS: string[] = ['Male', 'Female', 'Non Binary'];
const GENDER_MAP: Record<string, Gender> = {
  Male: 'male',
  Female: 'female',
  'Non Binary': 'non-binary',
};
const REVERSE_GENDER_MAP: Record<Gender, string> = {
  male: 'Male',
  female: 'Female',
  'non-binary': 'Non Binary',
};

// Map gender icons from centralized icons.tsx to option labels
const GENDER_ICONS = {
  Male: genderIcons.male,
  Female: genderIcons.female,
  'Non Binary': genderIcons.nonBinary,
};

const GenderSelectionScreen: React.FC = () => {
  const { mode } = useTheme();
  const navigation = useNavigation<AuthStackNavigationProp>();
  const isDark = mode === 'dark';

  const [myGender, setMyGender] = useState<Gender>('male');
  const [partnerGender, setPartnerGender] = useState<Gender>('female');

  const handleNext = () => {
    console.log('Selected genders:', { myGender, partnerGender });
    navigation.navigate('Media');
  };

  const handleMyGenderSelect = (value: string) => {
    setMyGender(GENDER_MAP[value] || 'male');
  };

  const handlePartnerGenderSelect = (value: string) => {
    setPartnerGender(GENDER_MAP[value] || 'female');
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDark ? '#181818' : '#FFFFFF' },
      ]}
    >
      <BackButton onPress={() => navigation.goBack()} size="medium" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Heading */}
        <View style={styles.headingContainer}>
          <Text
            style={[styles.heading, { color: isDark ? '#FFFFFF' : '#000000' }]}
          >
            Match Preferences
          </Text>
          {!isDark && <View style={styles.headingHighlight} />}
          <Text style={[styles.subheading, { color: '#BEBEBE' }]}>
            Select how you identify yourself & your partner
          </Text>
        </View>

        {/* Gender Selection */}
        <View style={styles.selectionWrapper}>
          <SelectionSection
            title="I am"
            options={GENDER_OPTIONS}
            selectedValue={REVERSE_GENDER_MAP[myGender]}
            onSelect={handleMyGenderSelect}
            iconMap={GENDER_ICONS}
          />
        </View>

        <View style={styles.selectionWrapper}>
          <SelectionSection
            title="Show me"
            options={GENDER_OPTIONS}
            selectedValue={REVERSE_GENDER_MAP[partnerGender]}
            onSelect={handlePartnerGenderSelect}
            iconMap={GENDER_ICONS}
          />
        </View>
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
  scrollContent: {
    paddingBottom: hp('15%'),
  },
  headingContainer: {
    alignItems: 'center',
    marginTop: hp('12.31%'),
    position: 'relative',
  },
  heading: {
    fontFamily: 'Comfortaa-Bold',
    fontWeight: '700',
    fontSize: 26,
    lineHeight: 32.14,
    letterSpacing: -0.52,
    textAlign: 'center',
  },
  headingHighlight: {
    position: 'absolute',
    width: 115,
    height: 18,
    backgroundColor: '#F2F2F2',
    top: 14,
    zIndex: -1,
  },
  subheading: {
    fontFamily: 'Sofia Pro',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 26.74,
    letterSpacing: -0.32,
    textAlign: 'center',
    marginTop: 16,
    width: wp('63.53%'),
  },
  selectionWrapper: {
    width: wp('77.05%'),
    alignSelf: 'center',
    marginTop: hp('3.05%'),
  },
});

export default GenderSelectionScreen;
