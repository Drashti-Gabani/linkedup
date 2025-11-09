import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
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

const PROFESSIONAL_ROLES = [
  'Board of Director',
  'C Level Executive',
  'Sr. Management',
  'Manager',
  'Junior or Assistant Manager',
  'Team Lead',
  'Team Member',
  'Trainee',
  'Professional',
  'Business Owner',
  'Fresher',
  'Looking for a job',
];

const ProfessionRoleScreen: React.FC = () => {
  const { colors, mode } = useTheme();
  const navigation = useNavigation<AuthStackNavigationProp>();
  const isDark = mode === 'dark';

  const [selectedRole, setSelectedRole] = useState<string | null>(
    'Board of Director',
  );
  const [customRole, setCustomRole] = useState('');

  const handleNext = () => {
    const finalRole = selectedRole || customRole;
    console.log('Profession Role:', finalRole);
    navigation.navigate('MonthlyEarning');
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
              style={[styles.title, { color: isDark ? '#FFFFFF' : '#000000' }]}
            >
              Profession Role
            </Text>
            <Text style={[styles.subtitle, { color: '#BEBEBE' }]}>
              Select which role you work in
            </Text>
          </View>

          {/* Role Selection */}
          <View style={styles.roleSection}>
            <SelectionSection
              title=""
              options={PROFESSIONAL_ROLES}
              selectedValue={selectedRole}
              onSelect={setSelectedRole}
            />
          </View>

          {/* Custom Role Input */}
          <View style={styles.inputSection}>
            <MaskedView
              maskElement={<Text style={styles.inputLabelMask}>Others</Text>}
            >
              <LinearGradient
                colors={['#9253FF', '#8239FF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.inputLabelGradient}
              >
                <Text style={[styles.inputLabel, { opacity: 0 }]}>Others</Text>
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
                placeholder="Enter your role"
                placeholderTextColor="#A8A8A8"
                value={customRole}
                onChangeText={setCustomRole}
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
    paddingHorizontal: wp('11%'),
    paddingTop: hp('12%'),
    paddingBottom: hp('2%'),
  },
  header: {
    alignItems: 'center',
    marginBottom: hp('4%'),
    position: 'relative',
  },
  highlight: {
    position: 'absolute',
    backgroundColor: '#F2F2F2',
    width: 115,
    height: 18,
    top: '15%',
  },
  title: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: -0.52,
    marginBottom: 12,
  },
  subtitle: {
    fontFamily: 'Sofia Pro',
    fontSize: 16,
    lineHeight: 27,
    textAlign: 'center',
    letterSpacing: -0.32,
  },
  roleSection: {
    marginBottom: hp('2%'),
  },
  inputSection: {
    marginBottom: hp('2%'),
  },
  inputLabelMask: {
    fontFamily: 'Comfortaa-Medium',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.8,
    backgroundColor: 'transparent',
  },
  inputLabelGradient: {
    paddingVertical: 2,
  },
  inputLabel: {
    fontFamily: 'Comfortaa-Medium',
    fontSize: 16,
    fontWeight: '500',
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

export default ProfessionRoleScreen;
