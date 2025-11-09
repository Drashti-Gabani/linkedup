import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import { useTheme } from '../hooks/useTheme';
import { wp, hp } from '../utils/responsive';
import { AuthStackNavigationProp } from '../navigation/types';
import SelectionSection from '../components/SelectionSection';
import BackButton from '../components/BackButton';
import NextButton from '../components/NextButton';

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
  const { colors, mode } = useTheme();
  const navigation = useNavigation<AuthStackNavigationProp>();
  const isDark = mode === 'dark';

  const [maritalStatus, setMaritalStatus] = useState('Single');
  const [hasKids, setHasKids] = useState(false);
  const [religion, setReligion] = useState('Hindu');
  const [height, setHeight] = useState(161);

  const handleNext = () => {
    console.log('Form Data:', { maritalStatus, hasKids, religion, height });
    navigation.navigate('HealthAndFood');
  };

  const Checkbox = ({ checked }: { checked: boolean }) => (
    <View
      style={[styles.checkbox, { borderColor: isDark ? '#B1B1B1' : '#B1B1B1' }]}
    >
      {checked && <View style={styles.checkboxInner} />}
    </View>
  );

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDark ? '#181818' : '#FFFFFF' },
      ]}
    >
      <BackButton onPress={() => navigation.goBack()} size="medium" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.highlight} />
            <Text
              style={[styles.title, { color: isDark ? '#FFFFFF' : '#000000' }]}
            >
              Lifestyle & Beliefs
            </Text>
            <Text
              style={[
                styles.subtitle,
                { color: isDark ? '#BEBEBE' : '#BEBEBE' },
              ]}
            >
              Increase the change to get right partner
            </Text>
          </View>

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
              <Text style={[styles.checkboxLabel, { color: '#B2B2B2' }]}>
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
            <Text
              style={[
                styles.sectionTitle,
                { color: isDark ? '#FFFFFF' : '#000000' },
              ]}
            >
              Height
            </Text>
            <View style={styles.sliderContainer}>
              <View style={styles.heightValueContainer}>
                <View
                  style={[
                    styles.heightTooltip,
                    { backgroundColor: isDark ? '#F2F2F2' : '#F2F2F2' },
                  ]}
                >
                  <LinearGradient
                    colors={['#A776FC', '#8239FF']}
                    style={styles.heightTextGradient}
                  >
                    <Text style={styles.heightValueText}>{`${height} cm`}</Text>
                  </LinearGradient>
                </View>
                <View
                  style={[
                    styles.tooltipArrow,
                    { borderTopColor: isDark ? '#F2F2F2' : '#F2F2F2' },
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
                minimumTrackTintColor={'#8239FF'}
                maximumTrackTintColor={isDark ? '#2E2E2E' : '#F3F3F3'}
                thumbTintColor={'#8239FF'}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      <NextButton
        onPress={handleNext}
        showText={true}
        textLabel="Next"
        size="medium"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    paddingHorizontal: wp('11%'),
    paddingTop: hp('15%'),
    paddingBottom: hp('15%'),
  },
  header: {
    alignItems: 'center',
    marginBottom: hp('5%'),
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
  checkboxSection: {
    alignItems: 'center',
    marginBottom: hp('3%'),
  },
  section: {
    marginBottom: hp('3%'),
    alignItems: 'center',
  },
  sectionTitle: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.4,
    marginBottom: 12,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
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
    color: '#8239FF', // This color will be masked
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
});

export default LifestyleAndBeliefsScreen;
