import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Path } from 'react-native-svg';

interface ProfileStatsCardProps {
  name: string;
  profileImage: string;
  matches: number;
  likes: number;
  follows: number;
  onSettingsPress?: () => void;
  onSendPress?: () => void;
}

const ProfileStatsCard: React.FC<ProfileStatsCardProps> = ({
  name,
  profileImage,
  matches,
  likes,
  follows,
  onSettingsPress,
  onSendPress,
}) => {
  return (
    <LinearGradient
      colors={['#A776FC', '#8239FF']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <View style={{ paddingVertical: 15 }}>
        {/* Header with Settings and Send buttons */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerButton} onPress={onSendPress}>
            <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
              <Path
                d="M18 2L9 11M18 2l-5 16-3-7-7-3 16-5z"
                stroke="#FFFFFF"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.headerButton}
            onPress={onSettingsPress}
          >
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
              <Path
                d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"
                fill="#FFFFFF"
              />
            </Svg>
          </TouchableOpacity>
        </View>

        {/* Profile Photo and Name */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          </View>
          <Text style={styles.name}>{name}</Text>
        </View>

        {/* Stats */}
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{matches}</Text>
            <Text style={styles.statLabel}>Matches</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{likes}</Text>
            <Text style={styles.statLabel}>Likes</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{follows}</Text>
            <Text style={styles.statLabel}>Follows</Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    marginHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  headerButton: {
    width: 52,
    height: 52,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 14,
  },
  profileImageContainer: {
    width: 99,
    height: 99,
    borderRadius: 49.5,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    overflow: 'hidden',
    marginBottom: 10,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  name: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    lineHeight: 27,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontFamily: 'Sofia Pro',
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    lineHeight: 27,
    textAlign: 'center',
  },
  statLabel: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
    lineHeight: 18,
    textAlign: 'center',
    marginTop: 2,
  },
});

export default ProfileStatsCard;
