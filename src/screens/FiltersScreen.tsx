import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../hooks/useTheme';
import { useNavigation } from '@react-navigation/native';
import RangeSlider from '../components/RangeSlider';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const FiltersScreen: React.FC = () => {
  const navigation = useNavigation();
  const { colors, gradients } = useTheme();

  // State management
  const [location] = useState('Los Angeles, Califonia');
  const [selectedGender, setSelectedGender] = useState<
    'Male' | 'Female' | 'Other'
  >('Female');
  const [ageRange, setAgeRange] = useState({ min: 20, max: 33 });
  const [drinking, setDrinking] = useState<'Yes' | 'No'>('No');
  const [languagePreference, setLanguagePreference] = useState(true);
  const [heightRange, setHeightRange] = useState({ min: 20, max: 33 });

  const handleClose = () => {
    navigation.goBack();
  };

  const handleSave = () => {
    // Save filter preferences
    console.log('Saving filters...');
    navigation.goBack();
  };

  const handleAgeRangeChange = (value: { min: number; max: number }) => {
    setAgeRange(value);
  };

  const handleHeightRangeChange = (value: { min: number; max: number }) => {
    setHeightRange(value);
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      {/* Background Card Preview */}
      <View style={styles.cardPreview}>
        <View style={styles.cardImageContainer}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
            }}
            style={styles.cardImage}
            resizeMode="cover"
          />
          <View style={styles.cardOverlay} />
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardName}>Beth, 27</Text>
            <Text style={styles.cardJob}>YouTuber</Text>
          </View>
          <View style={styles.locationBadge}>
            <Svg width={12} height={12} viewBox="0 0 12 12" fill="none">
              <Path
                d="M6 1C3.8 1 2 2.8 2 5c0 2.2 4 6 4 6s4-3.8 4-6c0-2.2-1.8-4-4-4zm0 5.5c-.8 0-1.5-.7-1.5-1.5S5.2 3.5 6 3.5 7.5 4.2 7.5 5 6.8 6.5 6 6.5z"
                fill="#FFFFFF"
              />
            </Svg>
            <Text style={styles.locationText}>7 miles</Text>
          </View>
        </View>

        {/* Header */}
        <View style={styles.headerContainer}>
          <View style={styles.settingsButton}>
          <View
            style={[
              styles.settingsIconBg,
              { backgroundColor: colors.headerButtonBackground },
            ]}
          >
            <Svg width={6} height={16} viewBox="0 0 6 16" fill="none">
              <Path
                d="M0 4h4M0 0h6M0 12h4M0 8h6"
                stroke={colors.headerButtonIcon}
                strokeWidth={1}
              />
            </Svg>
          </View>
        </View>
        <Text
          style={[
            styles.headerTitle,
            { color: colors.heading },
          ]}
        >
          Discover
        </Text>
        </View>

        {/* Filter Pills */}
        <View style={styles.filterPills}>
          <LinearGradient
            colors={[...gradients.secondary, 'rgba(255, 255, 255, 0)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            angle={242}
            style={styles.pill}
          >
            <Text style={styles.pillText}>Liked</Text>
          </LinearGradient>

          <LinearGradient
            colors={[...gradients.secondary, 'rgba(255, 255, 255, 0)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            angle={242}
            style={styles.pill}
          >
            <Text style={[styles.pillText, styles.pillTextLight]}>Rethink</Text>
          </LinearGradient>
        </View>
      </View>

      {/* Filter Modal */}
      <View
        style={[
          styles.filterModal,
          { backgroundColor: colors.backgroundCard },
        ]}
      >
        {/* Modal Header */}
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={handleClose} style={styles.iconButton}>
            <Svg width={13} height={13} viewBox="0 0 13 13" fill="none">
              <Path
                d="M1 1l11 11M1 12L12 1"
                stroke={colors.heading}
                strokeWidth={2}
                strokeLinecap="round"
              />
            </Svg>
          </TouchableOpacity>
          <Text
            style={[
              styles.modalTitle,
              { color: colors.heading },
            ]}
          >
            Filters
          </Text>
          <TouchableOpacity onPress={handleSave} style={styles.iconButton}>
            <Svg width={15} height={11} viewBox="0 0 15 11" fill="none">
              <Path
                d="M1 5.5l4 4 9-9"
                stroke={colors.accent}
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </TouchableOpacity>
        </View>

        {/* Scrollable Filters */}
        <ScrollView
          style={styles.filtersScroll}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.filtersContent}
        >
          {/* Location Filter */}
          <View style={styles.filterSection}>
            <Text
              style={[
                styles.filterLabel,
                { color: colors.heading },
              ]}
            >
              Location
            </Text>
            <View
              style={[
                styles.filterInput,
                {
                  backgroundColor: colors.searchBackground,
                  borderColor: colors.borderLight,
                },
              ]}
            >
              <Text style={[styles.filterInputText, { color: colors.textMuted }]}>
                {location}
              </Text>
              <Svg width={14} height={15} viewBox="0 0 14 15" fill="none">
                <Path
                  d="M7 1C4.2 1 2 3.2 2 6c0 3.75 5 8 5 8s5-4.25 5-8c0-2.8-2.2-5-5-5zm0 7c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"
                  stroke={colors.textMuted}
                  strokeWidth={2}
                />
              </Svg>
            </View>
          </View>

          {/* Gender Filter */}
          <View style={styles.filterSection}>
            <Text
              style={[
                styles.filterLabel,
                { color: colors.heading },
              ]}
            >
              Gender
            </Text>
            <View
              style={[
                styles.segmentedControl,
                {
                  backgroundColor: colors.searchBackground,
                  borderColor: colors.borderLight,
                },
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.segment,
                  selectedGender === 'Male' && { backgroundColor: colors.accent },
                ]}
                onPress={() => setSelectedGender('Male')}
              >
                <Text
                  style={[
                    styles.segmentText,
                    {
                      color: selectedGender === 'Male' ? colors.iconSelected : colors.textMuted,
                    },
                  ]}
                >
                  Male
                </Text>
              </TouchableOpacity>
              <View style={[styles.segmentDivider, { backgroundColor: colors.borderLight }]} />
              <TouchableOpacity
                style={[
                  styles.segment,
                  selectedGender === 'Female' && { backgroundColor: colors.accent },
                ]}
                onPress={() => setSelectedGender('Female')}
              >
                <Text
                  style={[
                    styles.segmentText,
                    {
                      color:
                        selectedGender === 'Female' ? colors.iconSelected : colors.textMuted,
                    },
                  ]}
                >
                  Female
                </Text>
              </TouchableOpacity>
              <View style={[styles.segmentDivider, { backgroundColor: colors.borderLight }]} />
              <TouchableOpacity
                style={[
                  styles.segment,
                  selectedGender === 'Other' && { backgroundColor: colors.accent },
                ]}
                onPress={() => setSelectedGender('Other')}
              >
                <Text
                  style={[
                    styles.segmentText,
                    {
                      color: selectedGender === 'Other' ? colors.iconSelected : colors.textMuted,
                    },
                  ]}
                >
                  Other
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Age Filter */}
          <View style={styles.filterSection}>
            <RangeSlider
              min={18}
              max={50}
              value={ageRange}
              onValueChange={handleAgeRangeChange}
              step={1}
              minRange={1}
              label="Age"
            />
          </View>

          {/* Drinking Filter */}
          <View style={styles.filterSection}>
            <Text
              style={[
                styles.filterLabel,
                { color: colors.heading },
              ]}
            >
              Drinking
            </Text>
            <View
              style={[
                styles.segmentedControl,
                {
                  backgroundColor: colors.searchBackground,
                  borderColor: colors.borderLight,
                },
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.segment,
                  styles.segmentHalf,
                  drinking === 'Yes' && styles.segmentInactive,
                ]}
                onPress={() => setDrinking('Yes')}
              >
                <Text style={[styles.segmentText, { color: colors.textMuted }]}>
                  Yes
                </Text>
              </TouchableOpacity>
              <View style={[styles.segmentDivider, { backgroundColor: colors.borderLight }]} />
              <TouchableOpacity
                style={[
                  styles.segment,
                  styles.segmentHalf,
                  drinking === 'No' && { backgroundColor: colors.accent },
                ]}
                onPress={() => setDrinking('No')}
              >
                <Text
                  style={[
                    styles.segmentText,
                    { color: drinking === 'No' ? colors.iconSelected : colors.textMuted },
                  ]}
                >
                  No
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Language Filter */}
          <View style={styles.filterSection}>
            <Text
              style={[
                styles.filterLabel,
                { color: colors.heading },
              ]}
            >
              Language
            </Text>
            <TouchableOpacity
              style={[
                styles.checkboxInput,
                {
                  backgroundColor: languagePreference
                    ? colors.accent
                    : colors.searchBackground,
                  borderColor: colors.borderLight,
                },
              ]}
              onPress={() => setLanguagePreference(!languagePreference)}
            >
              <Text
                style={[
                  styles.checkboxInputText,
                  { color: languagePreference ? colors.iconSelected : colors.textMuted },
                ]}
              >
                As per my preference
              </Text>
              {languagePreference && (
                <View style={styles.checkIcon}>
                  <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
                    <Path
                      d="M15 5L7 13L3 9"
                      stroke={colors.iconSelected}
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Height Filter */}
          <View style={styles.filterSection}>
            <RangeSlider
              min={18}
              max={50}
              value={heightRange}
              onValueChange={handleHeightRangeChange}
              step={1}
              minRange={1}
              label="Height"
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardPreview: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 744,
    paddingTop: 61,
    paddingHorizontal: 18,
  },
  cardImageContainer: {
    width: SCREEN_WIDTH - 54,
    height: 584,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    marginHorizontal: 27,
    marginTop: 99,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  cardTextContainer: {
    position: 'absolute',
    bottom: 29,
    left: 29,
  },
  cardName: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: 30,
    fontWeight: '700',
    color: '#FFFFFF',
    lineHeight: 33.45,
    letterSpacing: -0.9,
    marginBottom: 4,
  },
  cardJob: {
    fontFamily: 'Sofia Pro',
    fontSize: 16,
    fontWeight: '400',
    color: '#FFFFFF',
    lineHeight: 24.75,
  },
  locationBadge: {
    position: 'absolute',
    top: 23,
    left: 29,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 10,
    paddingVertical: 13,
    paddingHorizontal: 20,
    gap: 8,
  },
  locationText: {
    fontFamily: 'Sofia Pro',
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    lineHeight: 15,
    letterSpacing: -0.45,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 0,
    marginBottom: 10,
  },
  settingsButton: {
    width: 50,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsIconBg: {
    width: 50,
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: 30,
    fontWeight: '700',
    lineHeight: 33.45,
    letterSpacing: -0.9,
    flex: 1,
    textAlign: 'center',
  },
  filterPills: {
    flexDirection: 'row',
    gap: 40,
    paddingHorizontal: 35,
    marginTop: 8,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 4,
    paddingHorizontal: 22,
    borderRadius: 10,
    shadowColor: '#FFCBD3',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.5,
    shadowRadius: 75,
    elevation: 10,
  },
  pillIcon: {
    width: 24,
    height: 24,
  },
  pillText: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    lineHeight: 17.84,
    letterSpacing: -0.32,
  },
  pillTextLight: {
    fontFamily: 'Comfortaa',
    fontWeight: '400',
  },
  filterModal: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 770,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    shadowColor: '#000000',
    shadowOffset: { width: -10, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 75,
    elevation: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 31,
    paddingTop: 37,
    paddingBottom: 25,
  },
  iconButton: {
    width: 40,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontFamily: 'Sofia Pro',
    fontSize: 25,
    fontWeight: '600',
    lineHeight: 25,
    letterSpacing: -0.75,
  },
  filtersScroll: {
    flex: 1,
  },
  filtersContent: {
    paddingHorizontal: 23,
    paddingBottom: 40,
    gap: 40,
  },
  filterSection: {
    marginBottom: 40,
  },
  filterLabel: {
    fontFamily: 'Comfortaa',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 20.07,
    letterSpacing: -0.54,
    marginBottom: 11,
  },
  filterInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 54,
    borderRadius: 15,
    borderWidth: 1,
    paddingHorizontal: 19,
  },
  filterInputText: {
    fontFamily: 'Comfortaa',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 20.07,
    letterSpacing: -0.54,
  },
  segmentedControl: {
    flexDirection: 'row',
    height: 49,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  segment: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  segmentHalf: {
    flex: 0.5,
  },
  segmentInactive: {
    backgroundColor: 'transparent',
  },
  segmentText: {
    fontFamily: 'Comfortaa',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 20.07,
    letterSpacing: -0.54,
    textAlign: 'center',
  },
  segmentDivider: {
    width: 1,
    height: '100%',
  },
  checkboxInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 49,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 43,
  },
  checkboxInputText: {
    fontFamily: 'Comfortaa',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 20.07,
    letterSpacing: -0.54,
  },
  checkIcon: {
    width: 18,
    height: 18,
  },
});

export default FiltersScreen;
