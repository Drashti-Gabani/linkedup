import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Modal,
  FlatList,
} from 'react-native';
import Slider from '@react-native-community/slider';
import Svg, {
  Path,
  Circle,
  Defs,
  LinearGradient as SvgLinearGradient,
  Stop,
} from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import CountryPicker, {
  Country,
  CountryCode,
} from 'react-native-country-picker-modal';
import { useTheme } from '../hooks/useTheme';
import { useNavigation } from '@react-navigation/native';
import RangeSlider from '../components/RangeSlider';
import GradientButton from '../components/GradientButton';

const FiltersScreen: React.FC = () => {
  const navigation = useNavigation();
  const { colors, isDark, gradients } = useTheme();

  const [locationType, setLocationType] = useState<'current' | 'city'>(
    'current',
  );
  const [radius, setRadius] = useState(25); // Radius in miles - default to 25 for better UX
  const [countryCode, setCountryCode] = useState<CountryCode>('US');
  const [country, setCountry] = useState<Country | null>(null);
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [showCityPicker, setShowCityPicker] = useState(false);

  // Sample cities - in production, this would come from an API based on selected country
  const [cities] = useState([
    'New York',
    'Los Angeles',
    'Chicago',
    'Houston',
    'Phoenix',
    'Philadelphia',
    'San Antonio',
    'San Diego',
    'Dallas',
    'San Jose',
  ]);
  const [selectedGender, setSelectedGender] = useState<
    'Male' | 'Female' | 'Other'
  >('Female');
  const [ageRange, setAgeRange] = useState({ min: 20, max: 33 });
  const [drinking, setDrinking] = useState<'Yes' | 'No'>('No');
  const [languagePreference, setLanguagePreference] = useState(true);
  const [heightMin, setHeightMin] = useState({ feet: 5, inches: 0 });
  const [heightMax, setHeightMax] = useState({ feet: 6, inches: 0 });
  const [showHeightMinPicker, setShowHeightMinPicker] = useState(false);
  const [showHeightMaxPicker, setShowHeightMaxPicker] = useState(false);

  const handleClose = () => {
    navigation.goBack();
  };

  const handleSave = () => {
    console.log('Saving filters...');
    navigation.goBack();
  };

  const handleAgeRangeChange = (value: { min: number; max: number }) => {
    setAgeRange(value);
  };

  const handleHeightMinChange = (feet: number, inches: number) => {
    setHeightMin({ feet, inches });
    // Ensure min doesn't exceed max
    const minTotal = feet * 12 + inches;
    const maxTotal = heightMax.feet * 12 + heightMax.inches;
    if (minTotal > maxTotal) {
      setHeightMax({ feet, inches });
    }
  };

  const handleHeightMaxChange = (feet: number, inches: number) => {
    setHeightMax({ feet, inches });
    // Ensure max doesn't go below min
    const minTotal = heightMin.feet * 12 + heightMin.inches;
    const maxTotal = feet * 12 + inches;
    if (maxTotal < minTotal) {
      setHeightMin({ feet, inches });
    }
  };

  const formatHeight = (feet: number, inches: number) => {
    return `${feet}'${inches}"`;
  };

  const handleLocationTypeToggle = () => {
    const newType = locationType === 'current' ? 'city' : 'current';
    setLocationType(newType);
    if (newType === 'current') {
      setSelectedCity('');
      setCountry(null);
    }
  };

  const handleCountrySelect = (selectedCountry: Country) => {
    setCountry(selectedCountry);
    setCountryCode(selectedCountry.cca2);
    setShowCountryPicker(false);
    // Reset city when country changes
    setSelectedCity('');
  };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setShowCityPicker(false);
  };

  const handleRadiusChange = (newRadius: number) => {
    setRadius(Math.round(newRadius));
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDark ? colors.background : colors.background },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
            <Path
              d="M1.5 1L14.5 14"
              stroke={isDark ? colors.textPrimary : '#333333'}
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path
              d="M1.5 14L14.5 1"
              stroke={isDark ? colors.textPrimary : '#333333'}
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </TouchableOpacity>

        <Text
          style={[
            styles.title,
            { color: isDark ? colors.textPrimary : colors.textQuaternary },
          ]}
        >
          Filters
        </Text>

        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Svg width={16} height={12} viewBox="0 0 16 12" fill="none">
            <Path
              d="M1.5 6L5.625 10.5L14.5 1"
              stroke="url(#paint0_linear_check)"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Defs>
              <SvgLinearGradient
                id="paint0_linear_check"
                x1="1.797"
                y1="10.5"
                x2="3.889"
                y2="-2.606"
                gradientUnits="userSpaceOnUse"
              >
                <Stop stopColor="#9253FF" />
                <Stop offset="1" stopColor="#8239FF" />
              </SvgLinearGradient>
            </Defs>
          </Svg>
        </TouchableOpacity>
      </View>

      {/* Scrollable Filters */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Location Filter */}
        <View style={styles.filterSection}>
          <Text
            style={[
              styles.filterLabel,
              { color: isDark ? colors.textPrimary : colors.textQuaternary },
            ]}
          >
            Location
          </Text>

          {/* Toggle Switch for Location Type */}
          <View style={styles.locationToggleContainer}>
            <TouchableOpacity
              style={[
                styles.toggleOption,
                locationType === 'current' && styles.toggleOptionActive,
                {
                  backgroundColor:
                    locationType === 'current'
                      ? colors.accent
                      : isDark
                      ? colors.backgroundCard
                      : 'transparent',
                  borderColor: '#DFDFDF',
                },
              ]}
              onPress={() => {
                if (locationType !== 'current') {
                  handleLocationTypeToggle();
                }
              }}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.toggleText,
                  {
                    color: locationType === 'current' ? '#FFFFFF' : '#CFCFCF',
                  },
                ]}
              >
                Current Location
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.toggleOption,
                locationType === 'city' && styles.toggleOptionActive,
                {
                  backgroundColor:
                    locationType === 'city'
                      ? colors.accent
                      : isDark
                      ? colors.backgroundCard
                      : 'transparent',
                  borderColor: '#DFDFDF',
                },
              ]}
              onPress={() => {
                if (locationType !== 'city') {
                  handleLocationTypeToggle();
                }
              }}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.toggleText,
                  {
                    color: locationType === 'city' ? '#FFFFFF' : '#CFCFCF',
                  },
                ]}
              >
                City & Country
              </Text>
            </TouchableOpacity>
          </View>

          {/* Current Location with Radius Slider */}
          {locationType === 'current' && (
            <View style={styles.radiusSection}>
              <Text
                style={[
                  styles.radiusLabel,
                  {
                    color: isDark ? colors.textPrimary : colors.textQuaternary,
                  },
                ]}
              >
                Radius: {radius} {radius === 1 ? 'mile' : 'miles'}
              </Text>
              <View style={styles.radiusSliderContainer}>
                <View style={styles.radiusValueContainer}>
                  <View
                    style={[
                      styles.radiusValueBox,
                      { backgroundColor: colors.backgroundSecondary },
                    ]}
                  >
                    <Text
                      style={[styles.radiusValueText, { color: colors.accent }]}
                    >
                      {radius}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.radiusValueArrow,
                      { borderTopColor: colors.backgroundSecondary },
                    ]}
                  />
                </View>
                <Slider
                  style={styles.radiusSlider}
                  minimumValue={5}
                  maximumValue={100}
                  step={5}
                  value={radius}
                  onValueChange={handleRadiusChange}
                  minimumTrackTintColor={colors.accent}
                  maximumTrackTintColor={colors.sliderTrack}
                  thumbTintColor={colors.accent}
                />
                <View style={styles.radiusLabels}>
                  <Text
                    style={[
                      styles.radiusLabelText,
                      { color: colors.textMuted },
                    ]}
                  >
                    5 mi
                  </Text>
                  <Text
                    style={[
                      styles.radiusLabelText,
                      { color: colors.textMuted },
                    ]}
                  >
                    100 mi
                  </Text>
                </View>
              </View>
            </View>
          )}

          {/* City & Country Selection */}
          {locationType === 'city' && (
            <View style={styles.cityCountryContainer}>
              {/* Country Picker */}
              <TouchableOpacity
                style={[
                  styles.dropdownInput,
                  {
                    borderColor: '#DFDFDF',
                    backgroundColor: isDark
                      ? colors.backgroundCard
                      : 'transparent',
                  },
                ]}
                onPress={() => setShowCountryPicker(true)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.dropdownText,
                    {
                      color: country
                        ? isDark
                          ? colors.textPrimary
                          : colors.textQuaternary
                        : '#CFCFCF',
                    },
                  ]}
                >
                  {country
                    ? typeof country.name === 'object' &&
                      'common' in country.name
                      ? country.name.common
                      : typeof country.name === 'string'
                      ? country.name
                      : 'Select Country'
                    : 'Select Country'}
                </Text>
                <Svg width={12} height={8} viewBox="0 0 12 8" fill="none">
                  <Path
                    d="M1 1L6 6L11 1"
                    stroke="#CFCFCF"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </TouchableOpacity>

              {/* City Picker */}
              <TouchableOpacity
                style={[
                  styles.dropdownInput,
                  styles.cityDropdown,
                  {
                    borderColor: '#DFDFDF',
                    backgroundColor: isDark
                      ? colors.backgroundCard
                      : 'transparent',
                  },
                ]}
                onPress={() => {
                  if (country) {
                    setShowCityPicker(true);
                  }
                }}
                activeOpacity={0.7}
                disabled={!country}
              >
                <Text
                  style={[
                    styles.dropdownText,
                    {
                      color: selectedCity
                        ? isDark
                          ? colors.textPrimary
                          : colors.textQuaternary
                        : '#CFCFCF',
                      opacity: country ? 1 : 0.5,
                    },
                  ]}
                >
                  {selectedCity || 'Select City'}
                </Text>
                <Svg width={12} height={8} viewBox="0 0 12 8" fill="none">
                  <Path
                    d="M1 1L6 6L11 1"
                    stroke="#CFCFCF"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Gender Filter */}
        <View style={styles.filterSection}>
          <Text
            style={[
              styles.filterLabel,
              { color: isDark ? colors.textPrimary : colors.textQuaternary },
            ]}
          >
            Gender
          </Text>
          <View
            style={[
              styles.segmentedControl,
              {
                borderColor: '#DFDFDF',
                backgroundColor: isDark ? colors.backgroundCard : 'transparent',
              },
            ]}
          >
            <TouchableOpacity
              style={[
                styles.segment,
                selectedGender === 'Male' && styles.segmentSelected,
              ]}
              onPress={() => setSelectedGender('Male')}
            >
              <Text
                style={[
                  styles.segmentText,
                  {
                    color: selectedGender === 'Male' ? '#FFFFFF' : '#CFCFCF',
                  },
                ]}
              >
                Male
              </Text>
            </TouchableOpacity>

            <View
              style={[styles.segmentDivider, { backgroundColor: '#DFDFDF' }]}
            />

            <TouchableOpacity
              style={[
                styles.segment,
                selectedGender === 'Female' && styles.segmentSelected,
              ]}
              onPress={() => setSelectedGender('Female')}
            >
              <Text
                style={[
                  styles.segmentText,
                  {
                    color: selectedGender === 'Female' ? '#FFFFFF' : '#CFCFCF',
                  },
                ]}
              >
                Female
              </Text>
            </TouchableOpacity>

            <View
              style={[styles.segmentDivider, { backgroundColor: '#DFDFDF' }]}
            />

            <TouchableOpacity
              style={[
                styles.segment,
                selectedGender === 'Other' && styles.segmentSelected,
              ]}
              onPress={() => setSelectedGender('Other')}
            >
              <Text
                style={[
                  styles.segmentText,
                  {
                    color: selectedGender === 'Other' ? '#FFFFFF' : '#CFCFCF',
                  },
                ]}
              >
                Other
              </Text>
            </TouchableOpacity>

            {/* Gradient overlay for selected segment */}
            <LinearGradient
              colors={gradients.primary}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[
                styles.segmentOverlay,
                selectedGender === 'Male' && styles.overlayMale,
                selectedGender === 'Female' && styles.overlayFemale,
                selectedGender === 'Other' && styles.overlayOther,
              ]}
              pointerEvents="none"
            />
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
              { color: isDark ? colors.textPrimary : colors.textQuaternary },
            ]}
          >
            Drinking
          </Text>
          <View
            style={[
              styles.segmentedControlHalf,
              {
                borderColor: '#DFDFDF',
                backgroundColor: isDark ? colors.backgroundCard : 'transparent',
              },
            ]}
          >
            <TouchableOpacity
              style={[
                styles.segmentHalf,
                drinking === 'Yes' && styles.segmentSelected,
              ]}
              onPress={() => setDrinking('Yes')}
            >
              <Text
                style={[
                  styles.segmentText,
                  {
                    color: drinking === 'Yes' ? '#FFFFFF' : '#CFCFCF',
                  },
                ]}
              >
                Yes
              </Text>
            </TouchableOpacity>

            <View
              style={[styles.segmentDivider, { backgroundColor: '#DFDFDF' }]}
            />

            <TouchableOpacity
              style={[
                styles.segmentHalf,
                drinking === 'No' && styles.segmentSelected,
              ]}
              onPress={() => setDrinking('No')}
            >
              <Text
                style={[
                  styles.segmentText,
                  {
                    color: drinking === 'No' ? '#FFFFFF' : '#CFCFCF',
                  },
                ]}
              >
                No
              </Text>
            </TouchableOpacity>

            {/* Gradient overlay for selected button */}
            {drinking === 'Yes' && (
              <LinearGradient
                colors={gradients.primary}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.overlayYes}
                pointerEvents="none"
              />
            )}
            {drinking === 'No' && (
              <LinearGradient
                colors={gradients.primary}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.overlayNo}
                pointerEvents="none"
              />
            )}
          </View>
        </View>

        {/* Language Filter */}
        <View style={styles.filterSection}>
          <Text
            style={[
              styles.filterLabel,
              { color: isDark ? colors.textPrimary : colors.textQuaternary },
            ]}
          >
            Language
          </Text>
          <TouchableOpacity
            style={[
              styles.languageButton,
              {
                backgroundColor: languagePreference
                  ? colors.accent
                  : 'transparent',
                borderColor: '#DFDFDF',
              },
            ]}
            onPress={() => setLanguagePreference(!languagePreference)}
          >
            <Text
              style={[
                styles.languageText,
                {
                  color: languagePreference ? '#FFFFFF' : '#CFCFCF',
                },
              ]}
            >
              As per my preference
            </Text>
            {languagePreference && (
              <View style={styles.checkIconContainer}>
                <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
                  <Circle cx="9" cy="9" r="9" fill="white" />
                  <Path
                    d="M6.261 9L8.168 10.956L11.348 7.043"
                    stroke="url(#paint0_linear_language)"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <Defs>
                    <SvgLinearGradient
                      id="paint0_linear_language"
                      x1="11.146"
                      y1="7.616"
                      x2="5.93"
                      y2="10.53"
                      gradientUnits="userSpaceOnUse"
                    >
                      <Stop stopColor="#A776FC" />
                      <Stop offset="0.9999" stopColor="#8239FF" />
                      <Stop offset="1" stopColor="white" stopOpacity="0" />
                    </SvgLinearGradient>
                  </Defs>
                </Svg>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Height Filter */}
        <View style={[styles.filterSection, styles.lastFilterSection]}>
          <Text
            style={[
              styles.filterLabel,
              { color: isDark ? colors.textPrimary : colors.textQuaternary },
            ]}
          >
            Height
          </Text>
          <View style={styles.heightContainer}>
            {/* Min Height */}
            <View style={styles.heightSelectorContainer}>
              <Text
                style={[
                  styles.heightSelectorLabel,
                  { color: colors.textMuted },
                ]}
              >
                Min
              </Text>
              <TouchableOpacity
                style={[
                  styles.heightSelector,
                  {
                    borderColor: '#DFDFDF',
                    backgroundColor: isDark
                      ? colors.backgroundCard
                      : 'transparent',
                  },
                ]}
                onPress={() => setShowHeightMinPicker(true)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.heightSelectorText,
                    {
                      color: isDark
                        ? colors.textPrimary
                        : colors.textQuaternary,
                    },
                  ]}
                >
                  {formatHeight(heightMin.feet, heightMin.inches)}
                </Text>
                <Svg width={12} height={8} viewBox="0 0 12 8" fill="none">
                  <Path
                    d="M1 1L6 6L11 1"
                    stroke="#CFCFCF"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </TouchableOpacity>
            </View>

            {/* Max Height */}
            <View style={styles.heightSelectorContainer}>
              <Text
                style={[
                  styles.heightSelectorLabel,
                  { color: colors.textMuted },
                ]}
              >
                Max
              </Text>
              <TouchableOpacity
                style={[
                  styles.heightSelector,
                  {
                    borderColor: '#DFDFDF',
                    backgroundColor: isDark
                      ? colors.backgroundCard
                      : 'transparent',
                  },
                ]}
                onPress={() => setShowHeightMaxPicker(true)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.heightSelectorText,
                    {
                      color: isDark
                        ? colors.textPrimary
                        : colors.textQuaternary,
                    },
                  ]}
                >
                  {formatHeight(heightMax.feet, heightMax.inches)}
                </Text>
                <Svg width={12} height={8} viewBox="0 0 12 8" fill="none">
                  <Path
                    d="M1 1L6 6L11 1"
                    stroke="#CFCFCF"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Country Picker Modal */}
      <CountryPicker
        countryCode={countryCode}
        withFilter
        withFlag
        withCountryNameButton={false}
        withAlphaFilter={false}
        withCallingCode={false}
        withEmoji
        onSelect={handleCountrySelect}
        visible={showCountryPicker}
        onClose={() => setShowCountryPicker(false)}
        containerButtonStyle={{ width: 0, height: 0, opacity: 0 }}
        theme={{
          fontFamily: 'Sofia Pro',
          fontSize: 16,
          backgroundColor: colors.backgroundCard,
          onBackgroundTextColor: colors.textPrimary,
          primaryColor: colors.accent,
          primaryColorVariant: colors.accentSecondary,
          filterPlaceholderTextColor: colors.textMuted,
        }}
      />

      {/* City Picker Modal */}
      <Modal
        visible={showCityPicker}
        transparent
        animationType="fade"
        onRequestClose={() => setShowCityPicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContent,
              { backgroundColor: colors.backgroundCard },
            ]}
          >
            <View style={styles.modalHeader}>
              <Text
                style={[
                  styles.modalTitle,
                  {
                    color: isDark ? colors.textPrimary : colors.textQuaternary,
                  },
                ]}
              >
                Select City
              </Text>
              <TouchableOpacity
                onPress={() => setShowCityPicker(false)}
                style={styles.modalCloseButton}
              >
                <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
                  <Path
                    d="M1.5 1L14.5 14M1.5 14L14.5 1"
                    stroke={isDark ? colors.textPrimary : '#333333'}
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </TouchableOpacity>
            </View>
            <FlatList
              data={cities}
              keyExtractor={item => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.cityItem,
                    {
                      borderBottomColor: isDark
                        ? colors.borderDark
                        : colors.border,
                    },
                  ]}
                  onPress={() => handleCitySelect(item)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.cityItemText,
                      {
                        color:
                          selectedCity === item
                            ? colors.accent
                            : isDark
                            ? colors.textPrimary
                            : colors.textQuaternary,
                      },
                    ]}
                  >
                    {item}
                  </Text>
                  {selectedCity === item && (
                    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
                      <Path
                        d="M15 5L7 13L3 9"
                        stroke={colors.accent}
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </Svg>
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* Height Min Picker Modal */}
      <Modal
        visible={showHeightMinPicker}
        transparent
        animationType="fade"
        onRequestClose={() => setShowHeightMinPicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.heightPickerContent,
              { backgroundColor: colors.backgroundCard },
            ]}
          >
            <View style={styles.modalHeader}>
              <Text
                style={[
                  styles.modalTitle,
                  {
                    color: isDark ? colors.textPrimary : colors.textQuaternary,
                  },
                ]}
              >
                Select Min Height
              </Text>
              <TouchableOpacity
                onPress={() => setShowHeightMinPicker(false)}
                style={styles.modalCloseButton}
              >
                <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
                  <Path
                    d="M1.5 1L14.5 14M1.5 14L14.5 1"
                    stroke={isDark ? colors.textPrimary : '#333333'}
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </TouchableOpacity>
            </View>
            <View style={styles.heightPickerBody}>
              {/* Feet Selector */}
              <View style={styles.heightPickerColumn}>
                <Text
                  style={[
                    styles.heightPickerColumnLabel,
                    { color: colors.textMuted },
                  ]}
                >
                  Feet
                </Text>
                <ScrollView
                  style={styles.heightPickerScroll}
                  showsVerticalScrollIndicator={false}
                >
                  {[4, 5, 6, 7].map(feet => (
                    <TouchableOpacity
                      key={feet}
                      style={[
                        styles.heightPickerOption,
                        heightMin.feet === feet && {
                          backgroundColor: colors.accent,
                        },
                      ]}
                      onPress={() => {
                        handleHeightMinChange(feet, heightMin.inches);
                      }}
                      activeOpacity={0.7}
                    >
                      <Text
                        style={[
                          styles.heightPickerOptionText,
                          {
                            color:
                              heightMin.feet === feet
                                ? '#FFFFFF'
                                : isDark
                                ? colors.textPrimary
                                : colors.textQuaternary,
                          },
                        ]}
                      >
                        {feet}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* Inches Selector */}
              <View style={styles.heightPickerColumn}>
                <Text
                  style={[
                    styles.heightPickerColumnLabel,
                    { color: colors.textMuted },
                  ]}
                >
                  Inches
                </Text>
                <ScrollView
                  style={styles.heightPickerScroll}
                  showsVerticalScrollIndicator={false}
                >
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(inches => (
                    <TouchableOpacity
                      key={inches}
                      style={[
                        styles.heightPickerOption,
                        heightMin.inches === inches && {
                          backgroundColor: colors.accent,
                        },
                      ]}
                      onPress={() => {
                        handleHeightMinChange(heightMin.feet, inches);
                      }}
                      activeOpacity={0.7}
                    >
                      <Text
                        style={[
                          styles.heightPickerOptionText,
                          {
                            color:
                              heightMin.inches === inches
                                ? '#FFFFFF'
                                : isDark
                                ? colors.textPrimary
                                : colors.textQuaternary,
                          },
                        ]}
                      >
                        {inches}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
            <GradientButton
              text="Done"
              onPress={() => setShowHeightMinPicker(false)}
              style={styles.heightPickerDoneButton}
            />
          </View>
        </View>
      </Modal>

      {/* Height Max Picker Modal */}
      <Modal
        visible={showHeightMaxPicker}
        transparent
        animationType="fade"
        onRequestClose={() => setShowHeightMaxPicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.heightPickerContent,
              { backgroundColor: colors.backgroundCard },
            ]}
          >
            <View style={styles.modalHeader}>
              <Text
                style={[
                  styles.modalTitle,
                  {
                    color: isDark ? colors.textPrimary : colors.textQuaternary,
                  },
                ]}
              >
                Select Max Height
              </Text>
              <TouchableOpacity
                onPress={() => setShowHeightMaxPicker(false)}
                style={styles.modalCloseButton}
              >
                <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
                  <Path
                    d="M1.5 1L14.5 14M1.5 14L14.5 1"
                    stroke={isDark ? colors.textPrimary : '#333333'}
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </TouchableOpacity>
            </View>
            <View style={styles.heightPickerBody}>
              {/* Feet Selector */}
              <View style={styles.heightPickerColumn}>
                <Text
                  style={[
                    styles.heightPickerColumnLabel,
                    { color: colors.textMuted },
                  ]}
                >
                  Feet
                </Text>
                <ScrollView
                  style={styles.heightPickerScroll}
                  showsVerticalScrollIndicator={false}
                >
                  {[4, 5, 6, 7].map(feet => (
                    <TouchableOpacity
                      key={feet}
                      style={[
                        styles.heightPickerOption,
                        heightMax.feet === feet && {
                          backgroundColor: colors.accent,
                        },
                      ]}
                      onPress={() => {
                        handleHeightMaxChange(feet, heightMax.inches);
                      }}
                      activeOpacity={0.7}
                    >
                      <Text
                        style={[
                          styles.heightPickerOptionText,
                          {
                            color:
                              heightMax.feet === feet
                                ? '#FFFFFF'
                                : isDark
                                ? colors.textPrimary
                                : colors.textQuaternary,
                          },
                        ]}
                      >
                        {feet}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* Inches Selector */}
              <View style={styles.heightPickerColumn}>
                <Text
                  style={[
                    styles.heightPickerColumnLabel,
                    { color: colors.textMuted },
                  ]}
                >
                  Inches
                </Text>
                <ScrollView
                  style={styles.heightPickerScroll}
                  showsVerticalScrollIndicator={false}
                >
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(inches => (
                    <TouchableOpacity
                      key={inches}
                      style={[
                        styles.heightPickerOption,
                        heightMax.inches === inches && {
                          backgroundColor: colors.accent,
                        },
                      ]}
                      onPress={() => {
                        handleHeightMaxChange(heightMax.feet, inches);
                      }}
                      activeOpacity={0.7}
                    >
                      <Text
                        style={[
                          styles.heightPickerOptionText,
                          {
                            color:
                              heightMax.inches === inches
                                ? '#FFFFFF'
                                : isDark
                                ? colors.textPrimary
                                : colors.textQuaternary,
                          },
                        ]}
                      >
                        {inches}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
            <GradientButton
              text="Done"
              onPress={() => setShowHeightMaxPicker(false)}
              style={styles.heightPickerDoneButton}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 31,
    paddingTop: 37,
    paddingBottom: 25,
    height: 87,
  },
  closeButton: {
    width: 40,
    height: 25,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  saveButton: {
    width: 40,
    height: 25,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  title: {
    fontFamily: 'Sofia Pro',
    fontSize: 25,
    fontWeight: 'bold',
    lineHeight: 25,
    letterSpacing: -0.75,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 30,
    paddingTop: 18,
    paddingBottom: 40,
  },
  filterSection: {
    marginBottom: 40,
  },
  lastFilterSection: {
    marginBottom: 20,
  },
  filterLabel: {
    fontFamily: 'Comfortaa-Medium',
    fontSize: 18,
    lineHeight: 20,
    letterSpacing: -0.54,
    marginBottom: 11,
  },
  locationInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 54,
    borderRadius: 15,
    borderWidth: 1,
    paddingHorizontal: 19,
  },
  locationToggleContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  toggleOption: {
    flex: 1,
    height: 49,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleOptionActive: {
    // Active state handled by backgroundColor in inline styles
  },
  toggleText: {
    fontFamily: 'Comfortaa-Medium',
    fontSize: 18,
    lineHeight: 20,
    letterSpacing: -0.54,
  },
  radiusSection: {
    marginTop: 0,
  },
  radiusLabel: {
    fontFamily: 'Comfortaa-Medium',
    fontSize: 18,
    lineHeight: 20,
    letterSpacing: -0.54,
    marginBottom: 16,
  },
  radiusSliderContainer: {
    position: 'relative',
    paddingTop: 20,
  },
  radiusValueContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1,
  },
  radiusValueBox: {
    borderRadius: 3,
    paddingVertical: 4,
    paddingHorizontal: 8,
    minWidth: 40,
    alignItems: 'center',
  },
  radiusValueText: {
    fontFamily: 'Sofia Pro',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 14,
    letterSpacing: -0.42,
  },
  radiusValueArrow: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 3.5,
    borderRightWidth: 3.5,
    borderTopWidth: 5,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    marginTop: -1,
  },
  radiusSlider: {
    width: '100%',
    height: 40,
  },
  radiusLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 0,
    marginTop: 4,
  },
  radiusLabelText: {
    fontFamily: 'Sofia Pro',
    fontSize: 12,
    lineHeight: 14,
    letterSpacing: -0.24,
  },
  cityCountryContainer: {
    gap: 12,
  },
  dropdownInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 54,
    borderRadius: 15,
    borderWidth: 1,
    paddingHorizontal: 19,
  },
  cityDropdown: {
    marginTop: 0,
  },
  dropdownText: {
    fontFamily: 'Comfortaa-Medium',
    fontSize: 18,
    lineHeight: 20,
    letterSpacing: -0.54,
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    maxHeight: '70%',
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: 25,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#DFDFDF',
  },
  modalTitle: {
    fontFamily: 'Sofia Pro',
    fontSize: 22,
    fontWeight: '600',
    letterSpacing: -0.66,
  },
  modalCloseButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 18,
    borderBottomWidth: 1,
  },
  cityItemText: {
    fontFamily: 'Comfortaa-Medium',
    fontSize: 18,
    lineHeight: 20,
    letterSpacing: -0.54,
  },
  heightContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  heightSelectorContainer: {
    flex: 1,
  },
  heightSelectorLabel: {
    fontFamily: 'Sofia Pro',
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: -0.28,
    marginBottom: 8,
  },
  heightSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 54,
    borderRadius: 15,
    borderWidth: 1,
    paddingHorizontal: 19,
  },
  heightSelectorText: {
    fontFamily: 'Comfortaa-Medium',
    fontSize: 18,
    lineHeight: 20,
    letterSpacing: -0.54,
  },
  heightPickerContent: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    maxHeight: '70%',
    paddingBottom: 20,
  },
  heightPickerBody: {
    flexDirection: 'row',
    paddingHorizontal: 30,
    paddingTop: 20,
    gap: 20,
    maxHeight: 400,
  },
  heightPickerColumn: {
    flex: 1,
  },
  heightPickerColumnLabel: {
    fontFamily: 'Sofia Pro',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 18,
    letterSpacing: -0.28,
    marginBottom: 12,
    textAlign: 'center',
  },
  heightPickerScroll: {
    maxHeight: 300,
  },
  heightPickerOption: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  heightPickerOptionText: {
    fontFamily: 'Comfortaa-Medium',
    fontSize: 18,
    lineHeight: 20,
    letterSpacing: -0.54,
  },
  heightPickerDoneButton: {
    marginBottom: 20,
  },
  heightPickerDoneText: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: 18,
    lineHeight: 20,
    letterSpacing: -0.54,
    color: '#FFFFFF',
  },
  locationText: {
    fontFamily: 'Comfortaa-Medium',
    fontSize: 18,
    lineHeight: 20,
    letterSpacing: -0.54,
  },
  segmentedControl: {
    flexDirection: 'row',
    height: 49,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  segmentedControlHalf: {
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
    zIndex: 1,
  },
  segmentSelected: {
    zIndex: 2,
  },
  segmentHalf: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  segmentText: {
    fontFamily: 'Comfortaa-Medium',
    fontSize: 18,
    lineHeight: 20,
    letterSpacing: -0.54,
    textAlign: 'center',
    zIndex: 3,
  },
  segmentDivider: {
    width: 1,
    height: '100%',
  },
  segmentOverlay: {
    position: 'absolute',
    height: 49,
    top: 0,
    zIndex: 0,
  },
  overlayMale: {
    left: 0,
    width: '33.33%',
  },
  overlayFemale: {
    left: '33.33%',
    width: '33.34%',
  },
  overlayOther: {
    left: '66.67%',
    width: '33.33%',
  },
  overlayYes: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '50%',
    height: 49,
    borderRadius: 12,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    zIndex: 0,
  },
  overlayNo: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: '50%',
    height: 49,
    borderRadius: 12,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    zIndex: 0,
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 49,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 43,
  },
  languageText: {
    fontFamily: 'Comfortaa-Medium',
    fontSize: 18,
    lineHeight: 20,
    letterSpacing: -0.54,
  },
  checkIconContainer: {
    width: 18,
    height: 18,
  },
});

export default FiltersScreen;
