import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { AppImage } from '../utils/AppImage';
import Svg, { Path } from 'react-native-svg';
import DeviceInfo from 'react-native-device-info';
import { useTheme } from '../hooks/useTheme';
import LogoutModal from '../components/LogoutModal';
import { SettingsScreenNavigationProp } from '../navigation/types';
import { useNavigation } from '@react-navigation/native';
import GradientButton from '../components/GradientButton';

export default function SettingsScreen() {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const [pushNotifications, setPushNotifications] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [appVersion, setAppVersion] = useState<string>('');
  const { colors, isDark, setMode } = useTheme();

  React.useEffect(() => {
    const version = DeviceInfo.getVersion();
    setAppVersion(version);
  }, []);

  const handleLogout = () => {
    setShowLogoutModal(false);
    console.log('User logged out');
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? colors.background : '#F8F8F8' },
      ]}
    >
      {/* Header */}
      <View
        style={[
          styles.header,
          { backgroundColor: isDark ? colors.background : '#F8F8F8' },
        ]}
      >
        <Svg width={40} height={40} viewBox="0 0 40 40" fill="none">
          <Path
            d="M31.9 21.56C31.96 21.06 32 20.54 32 20C32 19.46 31.96 18.94 31.88 18.44L35.26 15.8C35.56 15.56 35.64 15.12 35.46 14.78L32.26 9.24C32.06 8.88 31.64 8.76 31.28 8.88L27.3 10.48C26.46 9.84 25.58 9.32 24.6 8.92L24 4.68C23.94 4.28 23.6 4 23.2 4H16.8C16.4 4 16.08 4.28 16.02 4.68L15.42 8.92C14.44 9.32 13.54 9.86 12.72 10.48L8.74001 8.88C8.38001 8.74 7.96002 8.88 7.76002 9.24L4.56001 14.78C4.36001 15.14 4.44002 15.56 4.76002 15.8L8.14002 18.44C8.06002 18.94 8.00002 19.48 8.00002 20C8.00002 20.52 8.04001 21.06 8.12001 21.56L4.74001 24.2C4.44001 24.44 4.36001 24.88 4.54001 25.22L7.74001 30.76C7.94001 31.12 8.36001 31.24 8.72002 31.12L12.7 29.52C13.54 30.16 14.42 30.68 15.4 31.08L16 35.32C16.08 35.72 16.4 36 16.8 36H23.2C23.6 36 23.94 35.72 23.98 35.32L24.58 31.08C25.56 30.68 26.46 30.14 27.28 29.52L31.26 31.12C31.62 31.26 32.04 31.12 32.24 30.76L35.44 25.22C35.64 24.86 35.56 24.44 35.24 24.2L31.9 21.56ZM20 26C16.7 26 14 23.3 14 20C14 16.7 16.7 14 20 14C23.3 14 26 16.7 26 20C26 23.3 23.3 26 20 26Z"
            fill={isDark ? colors.textPrimary : colors.textQuaternary}
          />
        </Svg>
        <Text
          style={[
            styles.headerTitle,
            { color: isDark ? colors.textPrimary : colors.textQuaternary },
          ]}
        >
          Settings
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.scrollContent}>
          {/* Profile Section */}
          <View style={styles.profileSection}>
            <AppImage
              source={{
                uri: 'https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=300',
              }}
              style={styles.profileImage}
            />
            <View style={styles.profileInfo}>
              <Text
                style={[
                  styles.profileName,
                  {
                    color: isDark ? colors.textPrimary : colors.textQuaternary,
                  },
                ]}
              >
                Ashley
              </Text>
              <Text
                style={[
                  styles.profileDetails,
                  {
                    color: isDark
                      ? 'rgba(255, 255, 255, 0.55)'
                      : 'rgba(0, 0, 0, 0.55)',
                  },
                ]}
              >
                28 • New York • United States
              </Text>
            </View>
          </View>

          {/* Divider */}
          <View
            style={[styles.sectionDivider, { backgroundColor: '#CACACA' }]}
          />

          {/* Account Settings Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: '#ADADAD' }]}>
              Account Settings
            </Text>

            <TouchableOpacity
              style={styles.menuItem}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('MyProfile')}
            >
              <Text
                style={[
                  styles.menuItemText,
                  {
                    color: isDark ? colors.textPrimary : colors.textQuaternary,
                  },
                ]}
              >
                Edit profile
              </Text>
              <Svg width={12} height={12} viewBox="0 0 12 12" fill="none">
                <Path
                  d="M3.59 10.59L8.17 6L3.59 1.41L5 0L11 6L5 12L3.59 10.59Z"
                  fill={isDark ? colors.textPrimary : colors.textQuaternary}
                />
              </Svg>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
              <Text
                style={[
                  styles.menuItemText,
                  {
                    color: isDark ? colors.textPrimary : colors.textQuaternary,
                  },
                ]}
              >
                Account Details
              </Text>
              <Svg width={12} height={12} viewBox="0 0 12 12" fill="none">
                <Path
                  d="M3.59 10.59L8.17 6L3.59 1.41L5 0L11 6L5 12L3.59 10.59Z"
                  fill={isDark ? colors.textPrimary : colors.textQuaternary}
                />
              </Svg>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('ChangePassword')}
            >
              <Text
                style={[
                  styles.menuItemText,
                  {
                    color: isDark ? colors.textPrimary : colors.textQuaternary,
                  },
                ]}
              >
                Change password
              </Text>
              <Svg width={12} height={12} viewBox="0 0 12 12" fill="none">
                <Path
                  d="M3.59 10.59L8.17 6L3.59 1.41L5 0L11 6L5 12L3.59 10.59Z"
                  fill={isDark ? colors.textPrimary : colors.textQuaternary}
                />
              </Svg>
            </TouchableOpacity>

            {/* Push Notifications Toggle */}
            <View style={styles.menuItem}>
              <Text
                style={[
                  styles.menuItemText,
                  {
                    color: isDark ? colors.textPrimary : colors.textQuaternary,
                  },
                ]}
              >
                Push notifications
              </Text>
              <TouchableOpacity
                style={[
                  styles.toggleContainer,
                  {
                    backgroundColor: pushNotifications ? '#9A5FFE' : '#EAEAEA',
                  },
                ]}
                onPress={() => setPushNotifications(!pushNotifications)}
                activeOpacity={0.8}
              >
                <View
                  style={[
                    styles.toggleThumb,
                    pushNotifications
                      ? styles.toggleThumbActive
                      : styles.toggleThumbInactive,
                  ]}
                />
              </TouchableOpacity>
            </View>

            {/* Dark Mode Toggle */}
            <View style={styles.menuItem}>
              <Text
                style={[
                  styles.menuItemText,
                  {
                    color: isDark ? colors.textPrimary : colors.textQuaternary,
                  },
                ]}
              >
                Dark mode
              </Text>
              <TouchableOpacity
                style={[
                  styles.toggleContainer,
                  { backgroundColor: isDark ? '#9A5FFE' : '#EAEAEA' },
                ]}
                onPress={() => setMode(isDark ? 'light' : 'dark')}
                activeOpacity={0.8}
              >
                <View
                  style={[
                    styles.toggleThumb,
                    isDark
                      ? styles.toggleThumbActive
                      : styles.toggleThumbInactive,
                  ]}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Divider */}
          <View
            style={[styles.sectionDivider, { backgroundColor: '#CACACA' }]}
          />

          {/* More Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: '#ADADAD' }]}>
              More
            </Text>

            <TouchableOpacity
              style={styles.menuItem}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('Legal', { type: 'about' })}
            >
              <Text
                style={[
                  styles.menuItemText,
                  {
                    color: isDark ? colors.textPrimary : colors.textQuaternary,
                  },
                ]}
              >
                About us
              </Text>
              <Svg width={12} height={12} viewBox="0 0 12 12" fill="none">
                <Path
                  d="M3.59 10.59L8.17 6L3.59 1.41L5 0L11 6L5 12L3.59 10.59Z"
                  fill={isDark ? colors.textPrimary : colors.textQuaternary}
                />
              </Svg>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('Legal', { type: 'privacy' })}
            >
              <Text
                style={[
                  styles.menuItemText,
                  {
                    color: isDark ? colors.textPrimary : colors.textQuaternary,
                  },
                ]}
              >
                Privacy policy
              </Text>
              <Svg width={12} height={12} viewBox="0 0 12 12" fill="none">
                <Path
                  d="M3.59 10.59L8.17 6L3.59 1.41L5 0L11 6L5 12L3.59 10.59Z"
                  fill={isDark ? colors.textPrimary : colors.textQuaternary}
                />
              </Svg>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('Legal', { type: 'terms' })}
            >
              <Text
                style={[
                  styles.menuItemText,
                  {
                    color: isDark ? colors.textPrimary : colors.textQuaternary,
                  },
                ]}
              >
                Terms and conditions
              </Text>
              <Svg width={12} height={12} viewBox="0 0 12 12" fill="none">
                <Path
                  d="M3.59 10.59L8.17 6L3.59 1.41L5 0L11 6L5 12L3.59 10.59Z"
                  fill={isDark ? colors.textPrimary : colors.textQuaternary}
                />
              </Svg>
            </TouchableOpacity>
          </View>
        </View>

        <GradientButton
          text="Logout"
          onPress={() => setShowLogoutModal(true)}
          style={styles.logoutButton}
        />

        {/* App Version */}
        <View style={styles.versionContainer}>
          <Text
            style={[
              styles.versionText,
              {
                color: isDark
                  ? 'rgba(255, 255, 255, 0.55)'
                  : 'rgba(0, 0, 0, 0.55)',
              },
            ]}
          >
            Version {appVersion}
          </Text>
        </View>
      </ScrollView>

      {/* Logout Modal */}
      <LogoutModal
        visible={showLogoutModal}
        onCancel={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingTop: 56,
    paddingBottom: 10,
    gap: 8,
  },
  headerTitle: {
    fontFamily: 'Comfortaa-Medium',
    fontSize: 28,
    lineHeight: 31,
    letterSpacing: 0.98,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 24,
  },
  profileImage: {
    width: 59,
    height: 59,
    borderRadius: 15,
  },
  profileInfo: {
    marginLeft: 14,
    flex: 1,
  },
  profileName: {
    fontFamily: 'Comfortaa-Medium',
    fontSize: 22,
    lineHeight: 25,
    marginBottom: 5,
  },
  profileDetails: {
    fontFamily: 'Comfortaa-Regular',
    fontSize: 14,
    lineHeight: 16,
  },
  sectionDivider: {
    height: 0.5,
    marginHorizontal: 0,
  },
  section: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontFamily: 'Comfortaa-Regular',
    fontSize: 18,
    lineHeight: 21,
    marginTop: 24,
    marginBottom: 8,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  menuItemText: {
    fontFamily: 'Comfortaa-Regular',
    fontSize: 18,
    lineHeight: 21,
  },
  toggleContainer: {
    width: 56,
    height: 29,
    borderRadius: 20,
    justifyContent: 'center',
    position: 'relative',
  },
  toggleThumb: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
  },
  toggleThumbActive: {
    right: 4,
  },
  toggleThumbInactive: {
    left: 4,
  },
  logoutButton: {
    marginTop: 35,
  },
  versionContainer: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  versionText: {
    fontFamily: 'Comfortaa-Regular',
    fontSize: 14,
    lineHeight: 16,
  },
});
