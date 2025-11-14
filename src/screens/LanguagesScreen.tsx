import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../hooks/useTheme';
import { wp, hp } from '../utils/responsive';
import { AuthStackNavigationProp } from '../navigation/types';
import MultiSelectSection from '../components/MultiSelectSection';
import BackButton from '../components/BackButton';
import NextButton from '../components/NextButton';
import ScreenTitle from '../components/ScreenTitle';

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
  const navigation = useNavigation<AuthStackNavigationProp>();

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
    navigation.navigate('Industry');
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
          <View
            style={[
              styles.searchContainer,
              {
                backgroundColor: colors.searchBackground,
                borderColor: colors.searchBorder,
              },
            ]}
          >
            <Svg width={23} height={20} viewBox="0 0 23 20" fill="none">
              <Path
                d="M9.5 16.5C13.6421 16.5 17 13.1421 17 9C17 4.85786 13.6421 1.5 9.5 1.5C5.35786 1.5 2 4.85786 2 9C2 13.1421 5.35786 16.5 9.5 16.5Z"
                stroke={colors.searchIcon}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M21 18.5L15 13.5"
                stroke={colors.searchIcon}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
            <TextInput
              style={[styles.searchInput, { color: colors.fieldText }]}
              placeholder="Search"
              placeholderTextColor={colors.placeholder}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

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
    flexGrow: 1,
    paddingBottom: hp('12%'),
  },
  content: {
    paddingHorizontal: wp('10%'),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderRadius: 15,
    borderWidth: 1,
    paddingHorizontal: 23,
    marginBottom: hp('3%'),
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Sk-Modernist',
    fontSize: 14,
    lineHeight: 21,
    padding: 0,
  },
  languagesSection: {
    marginBottom: hp('2%'),
  },
});

export default LanguagesScreen;
