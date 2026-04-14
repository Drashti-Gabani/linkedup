import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
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
import AppSearchBar from '../components/AppSearchBar';

const ALL_LANGUAGES = [
  'English',
  'Hindi',
  'Tamil',
  'Malayalam',
  'Spanish',
  'German',
  'Swedish',
  'Japanese',
  'Korean',
  'French',
  'Portuguese',
  'Italian',
  'Russian',
  'Chinese',
  'Arabic',
];

const LanguagesScreen: React.FC = () => {
  const { colors } = useTheme();
  const route = useRoute();
  const navigation = useNavigation<AuthStackNavigationProp | MainStackNavigationProp>();
  const params = route.params as { fromMyProfile?: boolean } | undefined;
  const fromMyProfile = params?.fromMyProfile ?? false;

  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([
    'English',
    'German',
  ]);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleLanguage = (language: string) => {
    setSelectedLanguages(prev =>
      prev.includes(language)
        ? prev.filter(l => l !== language)
        : [...prev, language],
    );
  };

  const filteredLanguages = ALL_LANGUAGES.filter(lang =>
    lang.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleNext = () => {
    console.log('Selected Languages:', selectedLanguages);
    (navigation as AuthStackNavigationProp).navigate('Industry');
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
        <View style={styles.content}>
          <ScreenTitle
            title="Languages"
            subtitle="What languages you can speak"
          />

          {/* Search Input */}
          <AppSearchBar
            placeholder="Search"
            value={searchQuery}
            onChangeText={setSearchQuery}
            containerStyle={{ marginBottom: hp('3%') }}
          />

          {/* Languages Selection */}
          <View style={styles.languagesSection}>
            <MultiSelectSection
              title=""
              options={filteredLanguages}
              selectedValues={selectedLanguages}
              onSelect={toggleLanguage}
            />
          </View>
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
  scrollContent: {
    flexGrow: 1,
    paddingBottom: hp('18%'),
  },
  content: {
    paddingHorizontal: wp('10%'),
  },
  languagesSection: {
    marginBottom: hp('2%'),
  },
  updateButtonContainer: {
    position: 'absolute',
    bottom: hp('8%'),
    left: 0,
    right: 0,
  },
});

export default LanguagesScreen;
