import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../hooks/useTheme';

interface MatchCardProps {
  imageUrl: string;
  name: string;
  age: number;
  distance?: string;
  jobTitle?: string;
  hasMatched?: boolean;
  onPress?: () => void;
}

const MatchCard: React.FC<MatchCardProps> = ({
  imageUrl,
  name,
  age,
  distance,
  jobTitle,
  hasMatched = false,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <ImageBackground
        source={{ uri: imageUrl }}
        style={styles.image}
        imageStyle={styles.imageStyle}
      >
        {/* Dark gradient overlay */}
        <LinearGradient
          colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']}
          locations={[0.43, 1]}
          style={styles.overlay}
        />

        {/* Matched badge */}
        {hasMatched && (
          <LinearGradient
            colors={['rgba(130, 57, 255, 0.5)', 'rgba(146, 83, 255, 0.5)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.matchedBadge}
          >
            <Text style={styles.matchedText}>Matched</Text>
          </LinearGradient>
        )}

        {/* Name and info */}
        <View style={styles.infoContainer}>
          <Text style={styles.nameText}>
            {name}, {age}
          </Text>
          {distance && <Text style={styles.distanceText}>{distance}</Text>}
          {jobTitle && <Text style={styles.jobTitleText}>{jobTitle}</Text>}
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    aspectRatio: 0.7,
    borderRadius: 30,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  imageStyle: {
    borderRadius: 30,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 30,
  },
  matchedBadge: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
  },
  matchedText: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    lineHeight: 15.6,
    letterSpacing: -0.28,
    paddingHorizontal: 18,
    paddingVertical: 4,
  },
  infoContainer: {
    paddingHorizontal: 18,
    paddingBottom: 18,
    zIndex: 1,
  },
  nameText: {
    fontFamily: 'Sofia Pro',
    fontSize: 22,
    fontWeight: '600',
    color: '#FFFFFF',
    lineHeight: 22,
    letterSpacing: -0.44,
  },
  distanceText: {
    fontFamily: 'Sofia Pro',
    fontSize: 12,
    fontWeight: '400',
    color: '#FFFFFF',
    lineHeight: 18.56,
    letterSpacing: -0.24,
    marginTop: 2,
  },
  jobTitleText: {
    fontFamily: 'Sofia Pro',
    fontSize: 14,
    fontWeight: '400',
    color: '#FFFFFF',
    lineHeight: 14,
    letterSpacing: -0.28,
    marginTop: 2,
  },
});

export default MatchCard;
