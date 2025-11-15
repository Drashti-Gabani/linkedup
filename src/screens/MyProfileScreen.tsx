import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from '@react-native-community/blur';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../hooks/useTheme';
import ProfileStatsCard from '../components/ProfileStatsCard';
import ProfileSectionCard from '../components/ProfileSectionCard';
import { MainStackNavigationProp } from '../navigation/types';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const MyProfileScreen: React.FC = () => {
  const navigation = useNavigation<MainStackNavigationProp>();
  const { colors } = useTheme();

  const [firstName, setFirstName] = useState('Alexander');
  const [email, setEmail] = useState('jordan@defects.cc');
  const [birthdate, setBirthdate] = useState('05/02/1998');

  const [isEditingFirstName, setIsEditingFirstName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingBirthdate, setIsEditingBirthdate] = useState(false);

  const profileData = {
    name: 'Jessica Parker',
    firstName: 'Alexander',
    email: 'jordan@defects.cc',
    birthdate: '05/02/1998',
    profileImage:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    backgroundImage:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    matches: 50,
    likes: 50,
    follows: 50,
    interests: ['Movies', 'Cooking', 'Book Nerd'],
    personalityTraits: ['Funny', 'Kind', 'Curious'],
    maritalStatus: ['Unmarried'],
    languages: ['Hindi', 'English'],
    education: ['Graduate'],
    professionalRole: ['Director'],
    industries: ['Science', 'Finance'],
    religion: ['Hindu'],
    pets: ["Don't have"],
    galleryPhotos: [
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1',
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
    ],
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        {/* Blurred Background Photo */}
        <View style={styles.backgroundContainer}>
          <ImageBackground
            source={{ uri: profileData.backgroundImage }}
            style={styles.backgroundImage}
            blurRadius={10}
          />
        </View>

        {/* Title */}
        <Text style={[styles.title, { color: '#FFFFFF' }]}>My Profile</Text>

        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Svg width={8} height={14} viewBox="0 0 8 14" fill="none">
            <Path
              d="M7 1L1 7l6 6"
              stroke="#FFFFFF"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </TouchableOpacity>

        {/* Stats Card Overlay */}
        <View style={styles.statsCardContainer}>
          <ProfileStatsCard
            name={profileData.name}
            profileImage={profileData.profileImage}
            matches={profileData.matches}
            likes={profileData.likes}
            follows={profileData.follows}
            onSettingsPress={() => console.log('Settings')}
            onSendPress={() => console.log('Send')}
          />
        </View>

        {/* White/Dark Container */}
        <View
          style={[
            styles.contentContainer,
            { backgroundColor: colors.background },
          ]}
        >
          <View style={styles.content}>
            {/* Editable Fields - Inline Editable */}
            <View style={styles.fieldContainer}>
              <Text style={[styles.fieldLabel, { color: colors.fieldLabel }]}>
                FIRST NAME
              </Text>
              <View
                style={[
                  styles.field,
                  { backgroundColor: colors.fieldBackground },
                  isEditingFirstName && styles.fieldEditing,
                ]}
              >
                <View style={styles.iconContainer}>
                  <Svg width={12} height={14} viewBox="0 0 12 14" fill="none">
                    <Path
                      d="M6 7C7.933 7 9.5 5.433 9.5 3.5S7.933 0 6 0 2.5 1.567 2.5 3.5 4.067 7 6 7zm0 1.75c-2.662 0-8 1.337-8 4v1.75h16v-1.75c0-2.663-5.338-4-8-4z"
                      stroke={colors.inputIcon}
                      strokeWidth={1.5}
                    />
                  </Svg>
                </View>
                {isEditingFirstName ? (
                  <TextInput
                    style={[styles.fieldInput, { color: colors.fieldText }]}
                    value={firstName}
                    onChangeText={setFirstName}
                    placeholder="First Name"
                    placeholderTextColor={colors.placeholder}
                    autoFocus
                    onBlur={() => setIsEditingFirstName(false)}
                  />
                ) : (
                  <Text
                    style={[styles.fieldInput, { color: colors.fieldText }]}
                  >
                    {firstName}
                  </Text>
                )}
              </View>
              <TouchableOpacity
                style={styles.fieldEditButton}
                onPress={() => setIsEditingFirstName(true)}
              >
                <Text style={[styles.editText, { color: colors.fieldLabel }]}>
                  Edit
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.fieldContainer}>
              <Text style={[styles.fieldLabel, { color: colors.fieldLabel }]}>
                EMAIL
              </Text>
              <View
                style={[
                  styles.field,
                  { backgroundColor: colors.fieldBackground },
                  isEditingEmail && styles.fieldEditing,
                ]}
              >
                <View style={styles.iconContainer}>
                  <Svg width={15} height={12} viewBox="0 0 15 12" fill="none">
                    <Path
                      d="M13.5 0h-12C.675 0 .0075.675.0075 1.5L0 10.5C0 11.325.675 12 1.5 12h12c.825 0 1.5-.675 1.5-1.5v-9c0-.825-.675-1.5-1.5-1.5zm0 3l-6 3.75L1.5 3V1.5l6 3.75 6-3.75V3z"
                      stroke={colors.inputIcon}
                      strokeWidth={1.5}
                    />
                  </Svg>
                </View>
                {isEditingEmail ? (
                  <TextInput
                    style={[styles.fieldInput, { color: colors.fieldText }]}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Email"
                    placeholderTextColor={colors.placeholder}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoFocus
                    onBlur={() => setIsEditingEmail(false)}
                  />
                ) : (
                  <Text
                    style={[styles.fieldInput, { color: colors.fieldText }]}
                  >
                    {email}
                  </Text>
                )}
              </View>
              <TouchableOpacity
                style={styles.fieldEditButton}
                onPress={() => setIsEditingEmail(true)}
              >
                <Text style={[styles.editText, { color: colors.fieldLabel }]}>
                  Edit
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.fieldContainer}>
              <Text style={[styles.fieldLabel, { color: colors.fieldLabel }]}>
                BIRTHDATE
              </Text>
              <View
                style={[
                  styles.field,
                  { backgroundColor: colors.fieldBackground },
                  isEditingBirthdate && styles.fieldEditing,
                ]}
              >
                <View style={styles.iconContainer}>
                  <Svg width={12} height={14} viewBox="0 0 12 14" fill="none">
                    <Path
                      d="M10.5 1h-1.125V0H8.25v1H3.75V0H2.625v1H1.5C.675 1 0 1.675 0 2.5v10C0 13.325.675 14 1.5 14h9c.825 0 1.5-.675 1.5-1.5v-10c0-.825-.675-1.5-1.5-1.5zm0 11.5h-9v-7h9v7z"
                      stroke={colors.inputIcon}
                      strokeWidth={1.5}
                    />
                  </Svg>
                </View>
                {isEditingBirthdate ? (
                  <TextInput
                    style={[styles.fieldInput, { color: colors.fieldText }]}
                    value={birthdate}
                    onChangeText={setBirthdate}
                    placeholder="Birthdate"
                    placeholderTextColor={colors.placeholder}
                    autoFocus
                    onBlur={() => setIsEditingBirthdate(false)}
                  />
                ) : (
                  <Text
                    style={[styles.fieldInput, { color: colors.fieldText }]}
                  >
                    {birthdate}
                  </Text>
                )}
              </View>
              <TouchableOpacity
                style={styles.fieldEditButton}
                onPress={() => setIsEditingBirthdate(true)}
              >
                <Text style={[styles.editText, { color: colors.fieldLabel }]}>
                  Edit
                </Text>
              </TouchableOpacity>
            </View>

            {/* Interests */}
            <View style={styles.sectionSpacing}>
              <ProfileSectionCard
                title="Interests"
                tags={profileData.interests}
                onEdit={() =>
                  navigation.navigate('Interests', { fromMyProfile: true })
                }
              />
            </View>

            {/* Personality Traits */}
            <View style={styles.sectionSpacing}>
              <ProfileSectionCard
                title="Personality Traits"
                tags={profileData.personalityTraits}
                onEdit={() =>
                  navigation.navigate('WhoAmI', { fromMyProfile: true })
                }
              />
            </View>

            {/* Gallery */}
            <View style={styles.gallerySection}>
              <View style={styles.gallerySectionHeader}>
                <Text style={[styles.galleryTitle, { color: colors.heading }]}>
                  Gallery
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Media', { fromMyProfile: true })
                  }
                >
                  <Text style={[styles.editText, { color: colors.fieldLabel }]}>
                    Edit
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.galleryGrid}>
                <Image
                  source={{ uri: profileData.galleryPhotos[0] }}
                  style={styles.galleryImageLarge}
                />
                <View style={styles.galleryColumn}>
                  <Image
                    source={{ uri: profileData.galleryPhotos[1] }}
                    style={styles.galleryImageSmall}
                  />
                  <Image
                    source={{ uri: profileData.galleryPhotos[2] }}
                    style={styles.galleryImageSmall}
                  />
                </View>
                <View style={styles.galleryColumn}>
                  <Image
                    source={{ uri: profileData.galleryPhotos[3] }}
                    style={styles.galleryImageSmall}
                  />
                  <Image
                    source={{ uri: profileData.galleryPhotos[4] }}
                    style={styles.galleryImageSmall}
                  />
                </View>
                <Image
                  source={{ uri: profileData.galleryPhotos[0] }}
                  style={styles.galleryImageLarge}
                />
              </View>
            </View>

            {/* Marital Status */}
            <View style={styles.sectionSpacing}>
              <ProfileSectionCard
                title="Marital Status"
                tags={profileData.maritalStatus}
                onEdit={() =>
                  navigation.navigate('LifestyleAndBeliefs', {
                    fromMyProfile: true,
                  })
                }
              />
            </View>

            {/* Languages */}
            <View style={styles.sectionSpacing}>
              <ProfileSectionCard
                title="Languages"
                tags={profileData.languages}
                onEdit={() =>
                  navigation.navigate('Languages', { fromMyProfile: true })
                }
              />
            </View>

            {/* Education */}
            <View style={styles.sectionSpacing}>
              <ProfileSectionCard
                title="Education"
                tags={profileData.education}
                onEdit={() =>
                  navigation.navigate('Education', { fromMyProfile: true })
                }
                isAddtionalInfo={true}
              />
            </View>

            {/* Professional Role */}
            <View style={styles.sectionSpacing}>
              <ProfileSectionCard
                title="Professional Role"
                tags={profileData.professionalRole}
                onEdit={() =>
                  navigation.navigate('ProfessionalRole', {
                    fromMyProfile: true,
                  })
                }
              />
            </View>

            {/* Industry */}
            <View style={styles.sectionSpacing}>
              <ProfileSectionCard
                title="Industry"
                tags={profileData.industries}
                onEdit={() =>
                  navigation.navigate('Industry', { fromMyProfile: true })
                }
              />
            </View>

            {/* Religion */}
            <View style={styles.sectionSpacing}>
              <ProfileSectionCard
                title="Religion"
                tags={profileData.religion}
                onEdit={() =>
                  navigation.navigate('LifestyleAndBeliefs', {
                    fromMyProfile: true,
                  })
                }
              />
            </View>

            {/* Pets */}
            <View style={styles.sectionSpacing}>
              <ProfileSectionCard
                title="Pets"
                tags={profileData.pets}
                onEdit={() =>
                  navigation.navigate('LifestyleAndBeliefs', {
                    fromMyProfile: true,
                  })
                }
              />
            </View>

            <View style={styles.bottomSpacer} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  backgroundContainer: {
    width: SCREEN_WIDTH,
    height: 415,
    overflow: 'hidden',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  title: {
    position: 'absolute',
    top: 53,
    width: SCREEN_WIDTH,
    textAlign: 'center',
    fontFamily: 'Comfortaa-Bold',
    fontSize: 30,
    lineHeight: 33.45,
    letterSpacing: -0.9,
    zIndex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 44,
    left: 40,
    width: 52,
    height: 52,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  statsCardContainer: {
    position: 'absolute',
    top: 116,
    left: 0,
    right: 0,
    zIndex: 3,
  },
  contentContainer: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 50,
    marginTop: -20,
  },
  content: {
    paddingHorizontal: 37,
  },
  fieldContainer: {
    minHeight: 72,
    position: 'relative',
    marginBottom: 16,
  },
  fieldLabel: {
    fontFamily: 'Comfortaa-Medium',
    fontSize: 10,
    lineHeight: 15,
    letterSpacing: 0.5,
    marginLeft: 15,
  },
  field: {
    position: 'absolute',
    top: 24,
    left: 0,
    right: 0,
    height: 48,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  iconContainer: {
    marginRight: 13,
  },
  fieldInput: {
    fontFamily: 'Comfortaa-SemiBold',
    fontSize: 16,
    lineHeight: 20,
    flex: 1,
  },
  fieldEditButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    paddingVertical: 3,
  },
  editText: {
    fontFamily: 'Sofia Pro',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
    letterSpacing: 0.7,
  },
  sectionSpacing: {
    marginBottom: 16,
  },
  gallerySection: {
    marginTop: 16,
    marginBottom: 16,
  },
  gallerySectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  galleryTitle: {
    fontFamily: 'Sofia Pro',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  editText: {
    fontFamily: 'Sofia Pro',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
    letterSpacing: 0.7,
  },
  galleryGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  galleryColumn: {
    gap: 10,
  },
  galleryImageLarge: {
    width: 142,
    height: 190,
    borderRadius: 12,
  },
  galleryImageSmall: {
    width: 92,
    height: 90,
    borderRadius: 12,
  },
  bottomSpacer: {
    height: 40,
  },
  fieldEditing: {
    borderWidth: 1,
    borderColor: '#8239FF',
  },
});

export default MyProfileScreen;
