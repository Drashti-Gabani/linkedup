import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../hooks/useTheme';
import Svg, { Path } from 'react-native-svg';
interface ProfileSectionCardProps {
  title: string;
  tags: string[];
  onEdit?: () => void;
  minHeight?: number;
  isAddtionalInfo?: boolean;
}

const ProfileSectionCard: React.FC<ProfileSectionCardProps> = ({
  title,
  tags,
  onEdit,
  minHeight = 66,
  isAddtionalInfo = false,
}) => {
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  const renderTag = (text: string, index: number) => {
    // Different gradients for different tags (matching Figma)
    const colors = ['#A776FC', '#8239FF'];

    return (
      <LinearGradient
        key={index}
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        angle={242}
        style={styles.tag}
      >
        <Text style={styles.tagText}>{text}</Text>
      </LinearGradient>
    );
  };

  return (
    <View style={[styles.container, { minHeight }]}>
      <Text style={[styles.title, { color: isDark ? '#FFFFFF' : '#000000' }]}>
        {title}
      </Text>

      {isAddtionalInfo && (
        <View style={styles.educationRow}>
          <Svg width={15} height={15} viewBox="0 0 15 15" fill="none">
            <Path d="M7.5 1L1 4.5L7.5 8L14 4.5L7.5 1z" fill="#8945FF" />
            <Path
              d="M1 10.5L7.5 14L14 10.5"
              stroke="#8945FF"
              strokeWidth={1.5}
              strokeLinecap="round"
            />
          </Svg>
          <Text
            style={[
              styles.institutionText,
              { color: isDark ? '#FFFFFF' : '#000000' },
            ]}
          >
            Institute name shown here
          </Text>
        </View>
      )}

      <View style={styles.tagsContainer}>
        {tags.map((tag, index) => renderTag(tag, index))}
      </View>
      {onEdit && (
        <TouchableOpacity style={styles.editButton} onPress={onEdit}>
          <Text
            style={[styles.editText, { color: isDark ? '#8945FF' : '#8239FF' }]}
          >
            Edit
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  title: {
    fontFamily: 'Sofia Pro',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    marginBottom: 5,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
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
  editButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    paddingVertical: 1.5,
  },
  editText: {
    fontFamily: 'Sofia Pro',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
    letterSpacing: 0.7,
  },
  educationTitle: {
    fontFamily: 'Sofia Pro',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
    marginBottom: 8,
  },
  educationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  institutionText: {
    fontFamily: 'Sofia Pro',
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: -0.28,
    lineHeight: 14,
  },
});

export default ProfileSectionCard;
