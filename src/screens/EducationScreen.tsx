import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../hooks/useTheme';
import { wp, hp } from '../utils/responsive';
import { AuthStackNavigationProp } from '../navigation/types';
import MultiSelectSection from '../components/MultiSelectSection';
import BackButton from '../components/BackButton';
import NextButton from '../components/NextButton';

const EDUCATION_LEVELS = [
  'Diploma',
  'High School',
  'Graduate',
  'Post-Graduate',
  'Doctoral',
  'Others',
];

const EducationScreen: React.FC = () => {
  const { colors, mode } = useTheme();
  const navigation = useNavigation<AuthStackNavigationProp>();
  const isDark = mode === 'dark';

  const [selectedEducation, setSelectedEducation] = useState<string[]>([
    'Diploma',
  ]);
  const [instituteName, setInstituteName] = useState('');

  const toggleEducation = (level: string) => {
    // Single select: always set to the clicked level
    setSelectedEducation([level]);
  };

  const handleNext = () => {
    console.log('Education Data:', {
      education: selectedEducation[0],
      instituteName,
    });
    // navigation.navigate('NextScreen');
    navigation.navigate('Languages');
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
              style={[styles.title, { color: isDark ? '#FFFFFF' : '#444444' }]}
            >
              Your Education
            </Text>
            <Text style={[styles.subtitle, { color: '#B2B2B2' }]}>
              Your Highest Qualification
            </Text>
          </View>

          {/* Education Level Selection */}
          <View style={styles.educationSection}>
            <MultiSelectSection
              title=""
              options={EDUCATION_LEVELS}
              selectedValues={selectedEducation}
              onSelect={toggleEducation}
              maxSelections={1}
            />
          </View>

          {/* Institute Name Input */}
          <View style={styles.inputSection}>
            <MaskedView
              maskElement={
                <Text style={styles.inputLabelMask}>Enter Institute name</Text>
              }
            >
              <LinearGradient
                colors={['#9253FF', '#8239FF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.inputLabelGradient}
              >
                <Text style={[styles.inputLabel, { opacity: 0 }]}>
                  Enter Institute name
                </Text>
              </LinearGradient>
            </MaskedView>

            <View
              style={[
                styles.inputContainer,
                { backgroundColor: isDark ? '#2E2E2E' : '#F5F7F9' },
              ]}
            >
              <TextInput
                style={[
                  styles.input,
                  { color: isDark ? '#FFFFFF' : '#000000' },
                ]}
                placeholder="Institute name"
                placeholderTextColor="#A8A8A8"
                value={instituteName}
                onChangeText={setInstituteName}
              />
            </View>
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
    marginBottom: hp('4%'),
  },
  title: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: -0.64,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Sofia Pro',
    fontSize: 16,
    lineHeight: 26,
    textAlign: 'center',
    letterSpacing: -0.32,
  },
  educationSection: {
    marginBottom: hp('5%'),
  },
  inputSection: {
    marginBottom: hp('2%'),
  },
  inputLabelMask: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.8,
    backgroundColor: 'transparent',
  },
  inputLabelGradient: {
    paddingVertical: 2,
  },
  inputLabel: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  inputContainer: {
    marginTop: 4,
    borderRadius: 16,
    height: 48,
    justifyContent: 'center',
    paddingHorizontal: 17,
  },
  input: {
    fontFamily: 'Comfortaa-Regular',
    fontSize: 16,
    lineHeight: 20,
    padding: 0,
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

export default EducationScreen;
