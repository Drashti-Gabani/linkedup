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
import ScreenTitle from '../components/ScreenTitle';

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
  const { colors, gradients } = useTheme();
  const navigation = useNavigation<AuthStackNavigationProp>();

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
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={false}
      >
        <BackButton onPress={() => navigation.goBack()} size="medium" />
        <View style={styles.content}>
          <ScreenTitle
            title="Profession Role"
            subtitle="Select which role you work in"
          />

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
                colors={gradients.primary}
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
                { backgroundColor: colors.inputBackground },
              ]}
            >
              <TextInput
                style={[styles.input, { color: colors.fieldText }]}
                placeholder="Enter your role"
                placeholderTextColor={colors.placeholder}
                value={customRole}
                onChangeText={setCustomRole}
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
    paddingHorizontal: wp('10%'),
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
    backgroundColor: 'transparent',
  },
  inputLabelGradient: {
    paddingVertical: 2,
  },
  inputLabel: {
    fontFamily: 'Comfortaa-Medium',
    fontSize: 16,
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
    padding: 0,
  },
});

export default ProfessionRoleScreen;
