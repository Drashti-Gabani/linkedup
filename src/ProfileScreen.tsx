import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useTheme } from './hooks/useTheme';

export default function ProfileScreen() {
  const { colors } = useTheme();

  const galleryImages = [
    'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=300',
    'https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=300',
    'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300',
    'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=300',
    'https://images.pexels.com/photos/1484801/pexels-photo-1484801.jpeg?auto=compress&cs=tinysrgb&w=300',
    'https://images.pexels.com/photos/1624076/pexels-photo-1624076.jpeg?auto=compress&cs=tinysrgb&w=300',
  ];

  const interests = ['Movies', 'Cooking', 'Book Nerd'];
  const traits = ['Funny', 'Kind', 'Curious'];
  const languages = ['Hindi', 'English'];
  const industries = ['Science', 'Finance'];

  return (
    <View style={[styles.container, { backgroundColor: colors.backgroundSecondary }]}> 
      <View style={[styles.header, { backgroundColor: colors.card }]}> 
        <TouchableOpacity style={styles.backButton}>
          <Text style={[styles.backButtonText, { color: colors.textPrimary }]}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>My Profile</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.profileCard, { backgroundColor: colors.accent }]}> 
          <TouchableOpacity style={styles.sendIcon}>
            <Text style={styles.iconText}>✈</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsIcon}>
            <Text style={styles.iconText}>⚙</Text>
          </TouchableOpacity>

          <Image
            source={{
              uri: 'https://images.pexels.com/photos/1496647/pexels-photo-1496647.jpeg?auto=compress&cs=tinysrgb&w=300',
            }}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>Jessica Parker</Text>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>50</Text>
              <Text style={styles.statLabel}>Matches</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>50</Text>
              <Text style={styles.statLabel}>Likes</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>50</Text>
              <Text style={styles.statLabel}>Follows</Text>
            </View>
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: colors.card }]}> 
          <View style={styles.sectionHeader}>
            <Text style={[styles.label, { color: colors.muted }]}>FIRST NAME</Text>
            <TouchableOpacity>
              <Text style={[styles.editText, { color: colors.accent }]}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.icon, { color: colors.muted }]}>👤</Text>
            <Text style={[styles.infoText, { color: colors.textSecondary }]}>Alexander</Text>
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: colors.card }]}> 
          <View style={styles.sectionHeader}>
            <Text style={[styles.label, { color: colors.muted }]}>EMAIL</Text>
            <TouchableOpacity>
              <Text style={[styles.editText, { color: colors.accent }]}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.icon, { color: colors.muted }]}>✉</Text>
            <Text style={[styles.infoText, { color: colors.textSecondary }]}>jordan@defects.cc</Text>
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: colors.card }]}> 
          <View style={styles.sectionHeader}>
            <Text style={[styles.label, { color: colors.muted }]}>BIRTHDATE</Text>
            <TouchableOpacity>
              <Text style={[styles.editText, { color: colors.accent }]}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.icon, { color: colors.muted }]}>📅</Text>
            <Text style={[styles.infoText, { color: colors.textSecondary }]}>05/02/1998</Text>
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: colors.card }]}> 
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Interests</Text>
            <TouchableOpacity>
              <Text style={[styles.editText, { color: colors.accent }]}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tagsContainer}>
            {interests.map((interest, index) => (
              <View key={index} style={[styles.tag, { backgroundColor: colors.accent }]}> 
                <Text style={styles.tagIcon}>
                  {index === 0 ? '🎬' : index === 1 ? '🍳' : '📚'}
                </Text>
                <Text style={styles.tagText}>{interest}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: colors.card }]}> 
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Personality Traits</Text>
            <TouchableOpacity>
              <Text style={[styles.editText, { color: colors.accent }]}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tagsContainer}>
            {traits.map((trait, index) => (
              <View key={index} style={[styles.tag, { backgroundColor: colors.accent }]}> 
                <Text style={styles.tagText}>{trait}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: colors.card }]}> 
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Gallery</Text>
            <TouchableOpacity>
              <Text style={[styles.editText, { color: colors.accent }]}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.galleryContainer}>
            {galleryImages.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image }}
                style={styles.galleryImage}
              />
            ))}
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: colors.card }]}> 
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Marital Status</Text>
            <TouchableOpacity>
              <Text style={[styles.editText, { color: colors.accent }]}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.tag, { backgroundColor: colors.accent }]}> 
            <Text style={styles.tagText}>Unmarried</Text>
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: colors.card }]}> 
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Languages</Text>
            <TouchableOpacity>
              <Text style={[styles.editText, { color: colors.accent }]}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tagsContainer}>
            {languages.map((language, index) => (
              <View key={index} style={[styles.tag, { backgroundColor: colors.accent }]}> 
                <Text style={styles.tagText}>{language}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: colors.card }]}> 
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Education</Text>
            <TouchableOpacity>
              <Text style={[styles.editText, { color: colors.accent }]}>Edit</Text>
            </TouchableOpacity>
          </View>
          <Text style={[styles.infoSubText, { color: colors.muted }]}>🎓 Institution not shown here</Text>
          <View style={[styles.tag, { backgroundColor: colors.accent }]}> 
            <Text style={styles.tagText}>Graduate</Text>
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: colors.card }]}> 
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Professional Role</Text>
            <TouchableOpacity>
              <Text style={[styles.editText, { color: colors.accent }]}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.tag, { backgroundColor: colors.accent }]}> 
            <Text style={styles.tagText}>Director</Text>
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: colors.card }]}> 
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Industry</Text>
            <TouchableOpacity>
              <Text style={[styles.editText, { color: colors.accent }]}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tagsContainer}>
            {industries.map((industry, index) => (
              <View key={index} style={[styles.tag, { backgroundColor: colors.accent }]}> 
                <Text style={styles.tagText}>{industry}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: colors.card }]}> 
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Religion</Text>
            <TouchableOpacity>
              <Text style={[styles.editText, { color: colors.accent }]}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.tag, { backgroundColor: colors.accent }]}> 
            <Text style={styles.tagText}>Hindu</Text>
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: colors.card }]}> 
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Pets</Text>
            <TouchableOpacity>
              <Text style={[styles.editText, { color: colors.accent }]}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.tag, { backgroundColor: colors.accent }]}> 
            <Text style={styles.tagText}>Don't have</Text>
          </View>
        </View>

        <View style={styles.footerSpacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 20,
    color: '#000',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 20,
  },
  scrollView: {
    flex: 1,
  },
  profileCard: {
    backgroundColor: '#7B3FF2',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    position: 'relative',
  },
  sendIcon: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    marginBottom: 15,
  },
  profileName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 12,
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    color: '#999999',
    letterSpacing: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  editText: {
    fontSize: 14,
    color: '#7B3FF2',
    fontWeight: '600',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 18,
    marginRight: 12,
    color: '#999999',
  },
  infoText: {
    fontSize: 16,
    color: '#666666',
  },
  infoSubText: {
    fontSize: 14,
    color: '#999999',
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#7B3FF2',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 6,
  },
  tagIcon: {
    fontSize: 14,
  },
  tagText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  galleryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  galleryImage: {
    width: '31%',
    aspectRatio: 0.7,
    borderRadius: 12,
  },
  footerSpacer: {
    height: 40,
  },
});
