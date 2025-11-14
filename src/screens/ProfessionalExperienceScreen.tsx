import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../hooks/useTheme';
import { wp, hp } from '../utils/responsive';
import { AuthStackNavigationProp } from '../navigation/types';
import SelectionSection from '../components/SelectionSection';
import BackButton from '../components/BackButton';
import NextButton from '../components/NextButton';
import ScreenTitle from '../components/ScreenTitle';

const EXPERIENCE_RANGES = [
  '0 – 2 years',
  '2 – 5 years',
  '5 – 10 years',
  '10 – 20 years',
  '20+ years',
];

const ProfessionalExperienceScreen: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<AuthStackNavigationProp>();

  const [selectedRange, setSelectedRange] = useState<string | null>(
    '0 – 2 years',
  );
  const [dontShow, setDontShow] = useState(false);
  const [companyEmail, setCompanyEmail] = useState('');

  const handleNext = () => {
    console.log('Professional Experience:', {
      range: selectedRange,
      dontShow,
      companyEmail,
    });
    navigation.navigate('CommunityGuidelines');
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
            title="Professional Experience"
            subtitle="Tell us about your Professional experience"
            highlightWidth={96}
            highlightTop={30}
          />

          {/* Experience Range Selection */}
          <View style={styles.experienceSection}>
            <SelectionSection
              title=""
              options={EXPERIENCE_RANGES}
              selectedValue={selectedRange}
              onSelect={setSelectedRange}
            />
          </View>

          {/* Don't Show Checkbox */}
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setDontShow(!dontShow)}
            activeOpacity={0.7}
          >
            <View
              style={[styles.checkbox, { borderColor: colors.checkboxBorder }]}
            >
              {dontShow && <View style={styles.checkboxInner} />}
            </View>
            <Text
              style={[styles.checkboxLabel, { color: colors.textDisabled }]}
            >
              Don't show
            </Text>
          </TouchableOpacity>

          {/* Company Email Input */}
          <View style={styles.inputSection}>
            <MaskedView
              maskElement={
                <Text style={styles.inputLabelMask}>Company Email</Text>
              }
            >
              <LinearGradient
                colors={['#9253FF', '#8239FF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.inputLabelGradient}
              >
                <Text style={[styles.inputLabel, { opacity: 0 }]}>
                  Company Email
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
                placeholder="Enter your role"
                placeholderTextColor={colors.placeholder}
                value={companyEmail}
                onChangeText={setCompanyEmail}
                keyboardType="email-address"
                autoCapitalize="none"
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
    paddingHorizontal: wp('11%'),
  },
  experienceSection: {
    marginBottom: hp('2%'),
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  checkbox: {
    width: 19,
    height: 19,
    borderRadius: 4,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkboxInner: {
    width: 11,
    height: 11,
    backgroundColor: '#8239FF',
  },
  checkboxLabel: {
    fontFamily: 'Sofia Pro',
    fontSize: 18,
    lineHeight: 30,
    letterSpacing: -0.36,
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

export default ProfessionalExperienceScreen;
