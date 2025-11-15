import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import { useTheme } from '../hooks/useTheme';
import { wp, hp } from '../utils/responsive';
import {
  AuthStackNavigationProp,
  MainStackNavigationProp,
} from '../navigation/types';
import SelectionSection from '../components/SelectionSection';
import BackButton from '../components/BackButton';
import NextButton from '../components/NextButton';
import GradientButton from '../components/GradientButton';
import ScreenTitle from '../components/ScreenTitle';
import GradientText from '../components/GradientText';

const MARITAL_STATUSES = ['Single', 'Married', 'Divorced', 'Widowed'];
const RELIGIONS = [
  'Hindu',
  'Muslim',
  'Buddhist',
  'Sikh',
  'Christian',
  'Others',
];

const LifestyleAndBeliefsScreen: React.FC = () => {
  const { colors, isDark } = useTheme();
  const route = useRoute();
  const navigation = useNavigation<
    AuthStackNavigationProp | MainStackNavigationProp
  >();
  const params = route.params as { fromMyProfile?: boolean } | undefined;
  const fromMyProfile = params?.fromMyProfile ?? false;

  const [maritalStatus, setMaritalStatus] = useState('Single');
  const [hasKids, setHasKids] = useState(false);
  const [religion, setReligion] = useState('Hindu');
  const [height, setHeight] = useState(161);

  const handleNext = () => {
    console.log('Form Data:', { maritalStatus, hasKids, religion, height });
    (navigation as AuthStackNavigationProp).navigate('HealthAndFood');
  };

  const Checkbox = ({ checked }: { checked: boolean }) => (
    <View style={[styles.checkbox, { borderColor: colors.checkboxBorder }]}>
      {checked && (
        <View
          style={[styles.checkboxInner, { backgroundColor: colors.accent }]}
        />
      )}
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <BackButton onPress={() => navigation.goBack()} size="medium" />
        <View style={styles.content}>
          <ScreenTitle
            title="Lifestyle & Beliefs"
            subtitle="Increase the change to get right partner"
          />

          {/* Marital Status */}
          <SelectionSection
            title="Marital Status"
            options={MARITAL_STATUSES}
            selectedValue={maritalStatus}
            onSelect={setMaritalStatus}
          />

          {/* Has Kids Checkbox */}
          <View style={styles.checkboxSection}>
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setHasKids(!hasKids)}
            >
              <Checkbox checked={hasKids} />
              <Text
                style={[styles.checkboxLabel, { color: colors.textDisabled }]}
              >
                I have kids
              </Text>
            </TouchableOpacity>
          </View>

          {/* Religion */}
          <SelectionSection
            title="Religion"
            options={RELIGIONS}
            selectedValue={religion}
            onSelect={setReligion}
          />

          {/* Height Slider */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.heading }]}>
              Height
            </Text>
            <View style={styles.sliderContainer}>
              <View style={styles.heightValueContainer}>
                <View
                  style={[
                    styles.heightTooltip,
                    { backgroundColor: colors.backgroundQuaternary },
                  ]}
                >
                  {isDark ? (
                    <Text
                      style={[
                        styles.heightValueText,
                        { color: colors.textPrimary },
                      ]}
                    >
                      {`${height} cm`}
                    </Text>
                  ) : (
                    <GradientText style={styles.heightValueText}>
                      {`${height} cm`}
                    </GradientText>
                  )}
                </View>
                <View
                  style={[
                    styles.tooltipArrow,
                    { borderTopColor: colors.backgroundQuaternary },
                  ]}
                />
              </View>
              <Slider
                style={styles.slider}
                minimumValue={130}
                maximumValue={220}
                step={1}
                value={height}
                onValueChange={setHeight}
                minimumTrackTintColor={colors.sliderThumb}
                maximumTrackTintColor={colors.sliderTrack}
                thumbTintColor={colors.sliderThumb}
              />
            </View>
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
  container: { flex: 1 },
  content: {
    paddingHorizontal: wp('10%'),
    paddingBottom: hp('18%'),
    flexGrow: 1,
  },
  checkboxSection: {
    marginBottom: hp('3%'),
  },
  section: {
    marginBottom: hp('3%'),
    alignItems: 'center',
  },
  sectionTitle: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: 20,
    letterSpacing: -0.4,
    marginBottom: 12,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  },
  checkboxLabel: {
    fontFamily: 'Sofia Pro',
    fontSize: 18,
    letterSpacing: -0.36,
  },
  sliderContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  heightValueContainer: {
    alignItems: 'center',
    marginBottom: -5,
  },
  heightTooltip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 3,
  },
  heightTextGradient: {
    borderRadius: 3,
  },
  heightValueText: {
    fontFamily: 'Sofia Pro',
    fontWeight: '600',
    fontSize: 14,
    letterSpacing: -0.42,
  },
  tooltipArrow: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 5,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  slider: { width: '105%', height: 40 },
  updateButtonContainer: {
    position: 'absolute',
    bottom: hp('8%'),
    left: 0,
    right: 0,
  },
});

export default LifestyleAndBeliefsScreen;
