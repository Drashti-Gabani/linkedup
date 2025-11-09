import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../hooks/useTheme';
import { discoverControls } from '../assets/images';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const UserProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);

  const userData = {
    name: 'Jessica Parker',
    age: 23,
    occupation: 'Professional model',
    location: 'Chicago, IL United States',
    distance: '1 km',
    about: `My name is Jessica Parker and I enjoy meeting new people and finding ways to help them have an uplifting experience. I enjoy reading..`,
    mainPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    galleryPhotos: [
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1',
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
    ],
    interests: ['Movies', 'Cooking', 'Book Nerd'],
    personalityTraits: ['Funny', 'Kind', 'Curious'],
    maritalStatus: 'Unmarried',
    languages: ['Hindi', 'English'],
    education: {
      level: 'Graduate',
      institution: 'Institute name shown here',
    },
    professionalRole: 'Director',
    industries: ['Science', 'Finance'],
    religion: 'Hindu',
    pets: "Don't have",
  };

  const renderTag = (text: string, colors: string[]) => (
    <LinearGradient
      colors={colors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      angle={242}
      style={styles.tag}
    >
      <Text style={styles.tagText}>{text}</Text>
    </LinearGradient>
  );

  const fullAbout = `My name is Jessica Parker and I enjoy meeting new people and finding ways to help them have an uplifting experience. I enjoy reading and trying new foods. I'm passionate about personal growth and love exploring different cultures.`;
  const shortAbout = `My name is Jessica Parker and I enjoy meeting new people and finding ways to help them have an uplifting experience. I enjoy reading..`;

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        bounces={true}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Main Photo */}
        <View style={styles.photoContainer}>
          <Image
            source={{ uri: userData.mainPhoto }}
            style={styles.mainPhoto}
            resizeMode="cover"
          />

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

          {/* Control Buttons - Positioned over image */}
          <View style={styles.controlsContainer}>
            {/* Reject Button */}
            <TouchableOpacity
              style={[styles.controlButton, styles.smallButton]}
            >
              <Image
                source={discoverControls.dislike}
                style={styles.smallIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>

            {/* Like Button */}
            <TouchableOpacity
              style={[styles.controlButton, styles.largeButton]}
            >
              <Image
                source={discoverControls.like}
                style={styles.superlikeIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>

            {/* Super Like Button */}
            <TouchableOpacity
              style={[styles.controlButton, styles.smallButton]}
            >
              <Image
                source={discoverControls.superlike}
                style={styles.largeIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Content Container with rounded corners */}
        <View
          style={[
            styles.contentContainer,
            { backgroundColor: colors.contentContainer },
          ]}
        >
          {/* Name Section */}
          <View style={styles.nameSection}>
            <View style={styles.nameContent}>
              <Text
                style={[styles.name, { color: colors.name }]}
              >
                {userData.name}, {userData.age}
              </Text>
              <Text
                style={[
                  styles.occupation,
                  { color: colors.occupation },
                ]}
              >
                {userData.occupation}
              </Text>
            </View>
            <TouchableOpacity
              style={[
                styles.sendButton,
                { backgroundColor: colors.buttonBackgroundSecondary },
              ]}
            >
              <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
                  stroke={colors.distanceBadge}
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </TouchableOpacity>
          </View>

          {/* Location Section */}
          <View
            style={[
              styles.section,
              {
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              },
            ]}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={[
                  styles.sectionTitle,
                  { color: colors.sectionTitle },
                ]}
              >
                Location
              </Text>
              <Text
                style={[
                  styles.sectionContent,
                  { color: colors.sectionContentMuted },
                ]}
              >
                {userData.location}
              </Text>
            </View>
            <View style={[styles.distanceBadge, { backgroundColor: colors.distanceBadgeBackground }]}>
              <Svg width={12} height={12} viewBox="0 0 12 12" fill="none">
                <Path
                  d="M6 1C3.8 1 2 2.8 2 5c0 2.2 4 6 4 6s4-3.8 4-6c0-2.2-1.8-4-4-4zm0 5.5c-.8 0-1.5-.7-1.5-1.5S5.2 3.5 6 3.5 7.5 4.2 7.5 5 6.8 6.5 6 6.5z"
                  fill={colors.distanceBadge}
                />
              </Svg>
              <Text style={[styles.distanceText, { color: colors.distanceBadge }]}>{userData.distance}</Text>
            </View>
          </View>

          {/* About Section */}
          <View style={styles.section}>
            <Text
              style={[
                styles.sectionTitle,
                { color: colors.sectionTitle },
              ]}
            >
              About
            </Text>
            <Text
              style={[
                styles.aboutText,
                { color: colors.sectionContentMuted },
              ]}
            >
              {isAboutExpanded ? fullAbout : shortAbout}
            </Text>
            <TouchableOpacity
              onPress={() => setIsAboutExpanded(!isAboutExpanded)}
            >
              <Text style={[styles.readMore, { color: colors.readMore }]}>
                {isAboutExpanded ? 'Read less' : 'Read more'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Interests Section */}
          <View style={styles.section}>
            <Text
              style={[
                styles.sectionTitle,
                { color: colors.sectionTitle },
              ]}
            >
              Interests
            </Text>
            <View style={styles.tagsContainer}>
              {userData.interests.map((interest, index) => (
                <View key={index}>
                  {renderTag(
                    interest,
                    index === 0
                      ? ['#A776FC', '#8239FF']
                      : index === 1
                      ? ['#9B62FD', '#9B62FD']
                      : ['#9E68FB', '#9E68FB'],
                  )}
                </View>
              ))}
            </View>
          </View>

          {/* Personality Traits Section */}
          <View style={styles.section}>
            <Text
              style={[
                styles.sectionTitle,
                { color: colors.sectionTitle },
              ]}
            >
              Personality Traits
            </Text>
            <View style={styles.tagsContainer}>
              {userData.personalityTraits.map((trait, index) => (
                <View key={index}>
                  {renderTag(trait, ['#A776FC', '#8239FF'])}
                </View>
              ))}
            </View>
          </View>

          {/* Gallery Section */}
          <View style={styles.section}>
            <View style={styles.galleryHeader}>
              <Text
                style={[
                  styles.sectionTitle,
                  { color: colors.sectionTitle },
                ]}
              >
                Gallery
              </Text>
              <TouchableOpacity>
                <Text style={[styles.readMore, { color: colors.readMore }]}>See all</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.galleryGrid}>
              {/* Left large image */}
              <Image
                source={{ uri: userData.galleryPhotos[0] }}
                style={styles.galleryImageLarge}
              />
              {/* Second column - 2 small images */}
              <View style={styles.galleryColumn}>
                <Image
                  source={{ uri: userData.galleryPhotos[1] }}
                  style={styles.galleryImageSmall}
                />
                <Image
                  source={{ uri: userData.galleryPhotos[2] }}
                  style={styles.galleryImageSmall}
                />
              </View>
              {/* Third column - 2 small images */}
              <View style={styles.galleryColumn}>
                <Image
                  source={{ uri: userData.galleryPhotos[3] }}
                  style={styles.galleryImageSmall}
                />
                <Image
                  source={{ uri: userData.galleryPhotos[4] }}
                  style={styles.galleryImageSmall}
                />
              </View>
              {/* Right large image */}
              <Image
                source={{ uri: userData.galleryPhotos[0] }}
                style={styles.galleryImageLarge}
              />
            </View>
          </View>

          {/* Marital Status Section */}
          <View style={styles.section}>
            <Text
              style={[
                styles.sectionTitle,
                { color: colors.sectionTitle },
              ]}
            >
              Marital Status
            </Text>
            <View style={styles.tagsContainer}>
              {renderTag(userData.maritalStatus, ['#A776FC', '#8239FF'])}
            </View>
          </View>

          {/* Languages Section */}
          <View style={styles.section}>
            <Text
              style={[
                styles.sectionTitle,
                { color: colors.sectionTitle },
              ]}
            >
              Languages
            </Text>
            <View style={styles.tagsContainer}>
              {userData.languages.map((language, index) => (
                <View key={index}>
                  {renderTag(language, ['#A776FC', '#8239FF'])}
                </View>
              ))}
            </View>
          </View>

          {/* Education Section */}
          <View style={styles.section}>
            <Text
              style={[
                styles.sectionTitle,
                { color: colors.heading },
              ]}
            >
              Education
            </Text>
            <View style={styles.educationRow}>
              <Svg width={15} height={15} viewBox="0 0 15 15" fill="none">
                <Path d="M7.5 1L1 4.5L7.5 8L14 4.5L7.5 1z" fill={colors.distanceBadge} />
                <Path
                  d="M1 10.5L7.5 14L14 10.5"
                  stroke={colors.distanceBadge}
                  strokeWidth={1.5}
                  strokeLinecap="round"
                />
              </Svg>
              <Text
                style={[
                  styles.institutionText,
                  { color: colors.heading },
                ]}
              >
                {userData.education.institution}
              </Text>
            </View>
            <View style={styles.tagsContainer}>
              {renderTag(userData.education.level, ['#A776FC', '#8239FF'])}
            </View>
          </View>

          {/* Professional Role Section */}
          <View style={styles.section}>
            <Text
              style={[
                styles.sectionTitle,
                { color: colors.sectionTitle },
              ]}
            >
              Professional Role
            </Text>
            <View style={styles.tagsContainer}>
              {renderTag(userData.professionalRole, ['#A776FC', '#8239FF'])}
            </View>
          </View>

          {/* Industry Section */}
          <View style={styles.section}>
            <Text
              style={[
                styles.sectionTitle,
                { color: colors.sectionTitle },
              ]}
            >
              Industry
            </Text>
            <View style={styles.tagsContainer}>
              {userData.industries.map((industry, index) => (
                <View key={index}>
                  {renderTag(industry, ['#A776FC', '#8239FF'])}
                </View>
              ))}
            </View>
          </View>

          {/* Religion Section */}
          <View style={styles.section}>
            <Text
              style={[
                styles.sectionTitle,
                { color: colors.sectionTitle },
              ]}
            >
              Religion
            </Text>
            <View style={styles.tagsContainer}>
              {renderTag(userData.religion, ['#A776FC', '#8239FF'])}
            </View>
          </View>

          {/* Pets Section */}
          <View style={styles.section}>
            <Text
              style={[
                styles.sectionTitle,
                { color: colors.sectionTitle },
              ]}
            >
              Pets
            </Text>
            <View style={styles.tagsContainer}>
              {renderTag(userData.pets, ['#A776FC', '#8239FF'])}
            </View>
          </View>

          <View style={styles.bottomSpacer} />
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
  photoContainer: {
    width: SCREEN_WIDTH,
    height: 415,
    position: 'relative',
  },
  mainPhoto: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 44,
    left: 40,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlsContainer: {
    position: 'absolute',
    bottom: -15,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 9,
    paddingHorizontal: 72,
    zIndex: 10,
  },
  controlButton: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#D7D7D7',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.5,
    shadowRadius: 22.5,
    elevation: 10,
  },
  smallButton: {
    width: 63,
    height: 63,
    borderRadius: 31.5,
  },
  largeButton: {
    width: 86,
    height: 86,
    borderRadius: 43,
    overflow: 'hidden',
  },
  smallIcon: {
    width: 21,
    height: 21,
  },
  superlikeIcon: {
    width: 40,
    height: 40,
  },
  largeIcon: {
    width: 25,
    height: 25,
  },
  contentContainer: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    paddingHorizontal: 35,
    paddingTop: 83,
    minHeight: SCREEN_HEIGHT - 385,
  },
  nameSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  nameContent: {
    flex: 1,
  },
  name: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 27,
    marginBottom: 0,
  },
  occupation: {
    fontFamily: 'Comfortaa',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
  },
  sendButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: '#E8E6EA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Sofia Pro',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    marginBottom: 5,
  },
  sectionContent: {
    fontFamily: 'Sofia Pro',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
    marginBottom: 5,
  },
  distanceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 7,
    paddingVertical: 8,
    paddingHorizontal: 10,
    gap: 4,
  },
  distanceText: {
    fontFamily: 'Sofia Pro',
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 18,
  },
  aboutText: {
    fontFamily: 'Sofia Pro',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
    marginBottom: 5,
  },
  readMore: {
    fontFamily: 'Sofia Pro',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    marginTop: 5,
  },
  tag: {
    borderRadius: 10,
  },
  tagText: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.24,
    lineHeight: 13.38,
    paddingVertical: 12,
    paddingHorizontal: 22,
  },
  galleryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
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
  educationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 10,
  },
  institutionText: {
    fontFamily: 'Sofia Pro',
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: -0.28,
    lineHeight: 14,
  },
  bottomSpacer: {
    height: 40,
  },
});

export default UserProfileScreen;
