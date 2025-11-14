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
import ScreenTitle from '../components/ScreenTitle';

const EDUCATION_LEVELS = [
  'Diploma',
  'High School',
  'Graduate',
  'Post-Graduate',
  'Doctoral',
  'Others',
];

const EducationScreen: React.FC = () => {
  const { colors, gradients } = useTheme();
  const navigation = useNavigation<AuthStackNavigationProp>();

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
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={false}
      >
        <BackButton onPress={() => navigation.goBack()} size="medium" />
        <View style={styles.content}>
          <ScreenTitle
            title="Your Education"
            subtitle="Your Highest Qualification"
          />

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
                colors={gradients.primary}
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
                { backgroundColor: colors.inputBackground },
              ]}
            >
              <TextInput
                style={[styles.input, { color: colors.fieldText }]}
                placeholder="Institute name"
                placeholderTextColor={colors.placeholder}
                value={instituteName}
                onChangeText={setInstituteName}
              />
            </View>
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
    paddingHorizontal: wp('8%'),
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
});

export default EducationScreen;
