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
import ScreenTitle from '../components/ScreenTitle';
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
  const { colors, isDark } = useTheme();
  const navigation = useNavigation<AuthStackNavigationProp>();

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
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={false}
      >
        <BackButton onPress={() => navigation.goBack()} size="medium" />
        <ScreenTitle
          title="Match Preferences"
          subtitle="Select how you identify yourself & your partner"
        />

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

        <View style={[styles.selectionWrapper, { marginTop: 0 }]}>
          <SelectionSection
            title="Show me"
            options={GENDER_OPTIONS}
            selectedValue={REVERSE_GENDER_MAP[partnerGender]}
            onSelect={handlePartnerGenderSelect}
            iconMap={GENDER_ICONS}
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
  scrollContent: {
    paddingBottom: hp('12%'),
    flexGrow: 1,
  },
  selectionWrapper: {
    width: wp('77.05%'),
    alignSelf: 'center',
    marginTop: hp('3%'),
  },
});

export default GenderSelectionScreen;
