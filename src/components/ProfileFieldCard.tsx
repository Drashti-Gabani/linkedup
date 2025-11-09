import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../hooks/useTheme';

interface ProfileFieldCardProps {
  label: string;
  value: string;
  icon: 'user' | 'email' | 'calendar';
  onEdit?: () => void;
}

const ProfileFieldCard: React.FC<ProfileFieldCardProps> = ({
  label,
  value,
  icon,
  onEdit,
}) => {
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  const renderIcon = () => {
    const iconColor = '#A8A8A8';
    
    switch (icon) {
      case 'user':
        return (
          <Svg width={12} height={14} viewBox="0 0 12 14" fill="none">
            <Path
              d="M6 7C7.933 7 9.5 5.433 9.5 3.5S7.933 0 6 0 2.5 1.567 2.5 3.5 4.067 7 6 7zm0 1.75c-2.662 0-8 1.337-8 4v1.75h16v-1.75c0-2.663-5.338-4-8-4z"
              stroke={iconColor}
              strokeWidth={1.5}
            />
          </Svg>
        );
      case 'email':
        return (
          <Svg width={15} height={12} viewBox="0 0 15 12" fill="none">
            <Path
              d="M13.5 0h-12C.675 0 .0075.675.0075 1.5L0 10.5C0 11.325.675 12 1.5 12h12c.825 0 1.5-.675 1.5-1.5v-9c0-.825-.675-1.5-1.5-1.5zm0 3l-6 3.75L1.5 3V1.5l6 3.75 6-3.75V3z"
              stroke={iconColor}
              strokeWidth={1.5}
            />
          </Svg>
        );
      case 'calendar':
        return (
          <Svg width={12} height={14} viewBox="0 0 12 14" fill="none">
            <Path
              d="M10.5 1h-1.125V0H8.25v1H3.75V0H2.625v1H1.5C.675 1 0 1.675 0 2.5v10C0 13.325.675 14 1.5 14h9c.825 0 1.5-.675 1.5-1.5v-10c0-.825-.675-1.5-1.5-1.5zm0 11.5h-9v-7h9v7z"
              stroke={iconColor}
              strokeWidth={1.5}
            />
          </Svg>
        );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: isDark ? '#8945FF' : '#8239FF' }]}>
        {label}
      </Text>
      <View style={[styles.field, { backgroundColor: isDark ? '#2D2D2D' : '#F5F7F9' }]}>
        <View style={styles.iconContainer}>{renderIcon()}</View>
        <Text style={[styles.value, { color: '#A8A8A8' }]}>{value}</Text>
      </View>
      {onEdit && (
        <TouchableOpacity style={styles.editButton} onPress={onEdit}>
          <Text style={[styles.editText, { color: isDark ? '#8945FF' : '#8239FF' }]}>
            Edit
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 72,
    position: 'relative',
  },
  label: {
    fontFamily: 'Comfortaa',
    fontSize: 10,
    fontWeight: '500',
    lineHeight: 15,
    letterSpacing: 0.5,
    marginLeft: 15,
  },
  field: {
    position: 'absolute',
    top: 24,
    left: 0,
    width: 300,
    height: 48,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  iconContainer: {
    marginRight: 13,
  },
  value: {
    fontFamily: 'Comfortaa',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
  },
  editButton: {
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
});

export default ProfileFieldCard;
