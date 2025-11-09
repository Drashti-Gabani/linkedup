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

const ALL_INDUSTRIES = [
  'Agriculture',
  'Beverage',
  'Broadcasting',
  'Chemical',
  'Clothing',
  'Finance',
  'Food',
  'Technology',
  'Healthcare',
  'Education',
  'Real Estate',
  'Manufacturing',
  'Retail',
  'Construction',
  'Transportation',
  'Media',
  'Entertainment',
  'Hospitality',
];

const IndustryScreen: React.FC = () => {
  const { colors, mode } = useTheme();
  const navigation = useNavigation<AuthStackNavigationProp>();
  const isDark = mode === 'dark';

  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([
    'Agriculture',
    'Finance',
  ]);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleIndustry = (industry: string) => {
    setSelectedIndustries(prev =>
      prev.includes(industry)
        ? prev.filter(i => i !== industry)
        : [...prev, industry],
    );
  };

  const filteredIndustries = ALL_INDUSTRIES.filter(industry =>
    industry.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleNext = () => {
    console.log('Selected Industries:', selectedIndustries);
    navigation.navigate('ProfessionalRole');
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
              style={[styles.title, { color: isDark ? '#FFFFFF' : '#444444' }]}
            >
              Industry
            </Text>
            <Text style={[styles.subtitle, { color: '#B2B2B2' }]}>
              Where you work
            </Text>
          </View>

          {/* Search Input */}
          <View
            style={[
              styles.searchContainer,
              {
                backgroundColor: isDark ? '#2E2E2E' : '#FFFFFF',
                borderColor: isDark ? '#2E2E2E' : '#E8E6EA',
              },
            ]}
          >
            <Svg width={23} height={20} viewBox="0 0 23 20" fill="none">
              <Path
                d="M9.5 16.5C13.6421 16.5 17 13.1421 17 9C17 4.85786 13.6421 1.5 9.5 1.5C5.35786 1.5 2 4.85786 2 9C2 13.1421 5.35786 16.5 9.5 16.5Z"
                stroke={isDark ? '#A8A8A8' : 'rgba(0, 0, 0, 0.4)'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M21 18.5L15 13.5"
                stroke={isDark ? '#A8A8A8' : 'rgba(0, 0, 0, 0.4)'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
            <TextInput
              style={[
                styles.searchInput,
                { color: isDark ? '#FFFFFF' : '#000000' },
              ]}
              placeholder="Search"
              placeholderTextColor={isDark ? '#A8A8A8' : 'rgba(0, 0, 0, 0.4)'}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {/* Industries Selection */}
          <View style={styles.industriesSection}>
            <MultiSelectSection
              title=""
              options={filteredIndustries}
              selectedValues={selectedIndustries}
              onSelect={toggleIndustry}
            />
          </View>
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
    paddingHorizontal: wp('8%'),
    paddingTop: hp('12%'),
    paddingBottom: hp('2%'),
  },
  header: {
    alignItems: 'center',
    marginBottom: hp('3%'),
    position: 'relative',
  },
  highlight: {
    position: 'absolute',
    backgroundColor: '#F2F2F2',
    width: 115,
    height: 18,
    top: '10%',
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
    lineHeight: 26,
    textAlign: 'center',
    letterSpacing: -0.32,
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
  industriesSection: {
    marginBottom: hp('2%'),
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

export default IndustryScreen;
