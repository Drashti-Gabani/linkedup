import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../hooks/useTheme';
import LogoutModal from '../components/LogoutModal';
import LinearGradient from 'react-native-linear-gradient';
import { SettingsScreenNavigationProp } from '../navigation/types';
import { useNavigation } from '@react-navigation/native';

export default function SettingsScreen() {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const [pushNotifications, setPushNotifications] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { colors, isDark, setMode } = useTheme();

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
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image
            source={{
              uri: 'https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=300',
            }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text
              style={[
                styles.profileName,
                { color: isDark ? colors.textPrimary : colors.textQuaternary },
              ]}
            >
              Ashley
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('MyProfile')}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.profileSubtext,
                  {
                    color: isDark
                      ? 'rgba(255, 255, 255, 0.55)'
                      : 'rgba(0, 0, 0, 0.55)',
                  },
                ]}
              >
                EDIT PROFILE
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Divider */}
        <View style={[styles.sectionDivider, { backgroundColor: '#CACACA' }]} />

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
                { color: isDark ? colors.textPrimary : colors.textQuaternary },
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
                { color: isDark ? colors.textPrimary : colors.textQuaternary },
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
                { color: isDark ? colors.textPrimary : colors.textQuaternary },
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
                { color: isDark ? colors.textPrimary : colors.textQuaternary },
              ]}
            >
              Push notifications
            </Text>
            <TouchableOpacity
              style={[
                styles.toggleContainer,
                { backgroundColor: pushNotifications ? '#9A5FFE' : '#EAEAEA' },
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
                { color: isDark ? colors.textPrimary : colors.textQuaternary },
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
        <View style={[styles.sectionDivider, { backgroundColor: '#CACACA' }]} />

        {/* More Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#ADADAD' }]}>More</Text>

          <TouchableOpacity
            style={styles.menuItem}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Legal', { type: 'about' })}
          >
            <Text
              style={[
                styles.menuItemText,
                { color: isDark ? colors.textPrimary : colors.textQuaternary },
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
                { color: isDark ? colors.textPrimary : colors.textQuaternary },
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
                { color: isDark ? colors.textPrimary : colors.textQuaternary },
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

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => setShowLogoutModal(true)}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={isDark ? ['#8239FF', '#8239FF'] : ['#9B61FD', '#9B61FD']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.logoutButtonGradient}
          >
            <Text style={styles.logoutButtonText}>LOGOUT</Text>
            <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
              <Path
                d="M8.72795 16H2.18199C1.60329 16 1.04829 15.7701 0.639089 15.361C0.229887 14.9518 0 14.3968 0 13.8182V2.18182C0 1.60316 0.229887 1.04821 0.639089 0.63904C1.04829 0.229869 1.60329 0 2.18199 0H8.72795C9.30665 0 9.86165 0.229869 10.2709 0.63904C10.6801 1.04821 10.9099 1.60316 10.9099 2.18182V4.72727C10.9099 4.92016 10.8333 5.10514 10.6969 5.24153C10.5605 5.37792 10.3755 5.45455 10.1826 5.45455C9.98971 5.45455 9.80471 5.37792 9.66831 5.24153C9.53191 5.10514 9.45528 4.92016 9.45528 4.72727V2.18182C9.45528 1.98893 9.37865 1.80395 9.24225 1.66756C9.10585 1.53117 8.92085 1.45455 8.72795 1.45455H2.18199C1.98909 1.45455 1.80409 1.53117 1.66769 1.66756C1.53129 1.80395 1.45466 1.98893 1.45466 2.18182V13.8182C1.45466 14.0111 1.53129 14.1961 1.66769 14.3324C1.80409 14.4688 1.98909 14.5455 2.18199 14.5455H8.72795C8.92085 14.5455 9.10585 14.4688 9.24225 14.3324C9.37865 14.1961 9.45528 14.0111 9.45528 13.8182V11.2727C9.45528 11.0798 9.53191 10.8949 9.66831 10.7585C9.80471 10.6221 9.98971 10.5455 10.1826 10.5455C10.3755 10.5455 10.5605 10.6221 10.6969 10.7585C10.8333 10.8949 10.9099 11.0798 10.9099 11.2727V13.8182C10.9099 14.3968 10.6801 14.9518 10.2709 15.361C9.86165 15.7701 9.30665 16 8.72795 16Z"
                fill="white"
              />
              <Path
                d="M14.9103 8.72727H5.38951C5.19661 8.72727 5.01161 8.65065 4.87521 8.51426C4.73881 8.37787 4.66218 8.19289 4.66218 8C4.66218 7.80712 4.73881 7.62213 4.87521 7.48574C5.01161 7.34935 5.19661 7.27273 5.38951 7.27273H14.9103C15.1032 7.27273 15.2882 7.34935 15.4246 7.48574C15.561 7.62213 15.6376 7.80712 15.6376 8C15.6376 8.19289 15.561 8.37787 15.4246 8.51426C15.2882 8.65065 15.1032 8.72727 14.9103 8.72727Z"
                fill="white"
              />
              <Path
                d="M13.0919 10.9091C12.9485 10.9085 12.8085 10.8655 12.6894 10.7856C12.5704 10.7056 12.4776 10.5922 12.4228 10.4597C12.368 10.3272 12.3537 10.1815 12.3815 10.0408C12.4093 9.9001 12.4781 9.77079 12.5792 9.66909L14.2447 8L12.5755 6.33091C12.439 6.19444 12.3624 6.00936 12.3624 5.81636C12.3624 5.62337 12.439 5.43828 12.5755 5.30182C12.712 5.16535 12.8971 5.08869 13.0901 5.08869C13.2831 5.08869 13.4682 5.16535 13.6047 5.30182L15.7867 7.48364C15.8543 7.55118 15.908 7.63139 15.9446 7.71968C15.9812 7.80797 16 7.90261 16 7.99818C16 8.09376 15.9812 8.18839 15.9446 8.27668C15.908 8.36497 15.8543 8.44518 15.7867 8.51273L13.6047 10.6945C13.4689 10.8311 13.2845 10.9083 13.0919 10.9091Z"
                fill="white"
              />
            </Svg>
          </LinearGradient>
        </TouchableOpacity>
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
    paddingHorizontal: 41,
    paddingTop: 56,
    paddingBottom: 20,
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
    paddingBottom: 40,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
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
  },
  profileName: {
    fontFamily: 'Comfortaa-Medium',
    fontSize: 22,
    lineHeight: 25,
    marginBottom: 5,
  },
  profileSubtext: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: 10,
    lineHeight: 11,
    letterSpacing: 1.5,
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
    marginHorizontal: 37,
    borderRadius: 10,
    overflow: 'hidden',
  },
  logoutButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 58,
    gap: 8,
  },
  logoutButtonText: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: 13,
    lineHeight: 20,
    letterSpacing: 1.3,
    color: '#FFFFFF',
  },
});
