import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
} from 'react-native';
import { useTheme } from '../hooks/useTheme';
import LogoutModal from '../components/LogoutModal';
import GradientButton from '../components/GradientButton';

export default function SettingsScreen() {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { colors, isDark, setMode } = useTheme();

  const handleLogout = () => {
    setShowLogoutModal(false);
    // Handle logout logic here
    console.log('User logged out');
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.backgroundSecondary },
      ]}
    >
      <View style={[styles.header, { backgroundColor: colors.card }]}>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>
          Settings
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.profileSection, { backgroundColor: colors.card }]}>
          <Image
            source={{
              uri: 'https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=300',
            }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={[styles.profileName, { color: colors.textPrimary }]}>
              Ashley
            </Text>
            <Text style={[styles.profileSubtext, { color: colors.muted }]}>
              EDIT PROFILE
            </Text>
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.muted }]}>
            Account Settings
          </Text>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={[styles.menuItemText, { color: colors.textPrimary }]}>
              Edit profile
            </Text>
            <Text style={[styles.chevron, { color: colors.muted }]}>›</Text>
          </TouchableOpacity>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <TouchableOpacity style={styles.menuItem}>
            <Text style={[styles.menuItemText, { color: colors.textPrimary }]}>
              Account Details
            </Text>
            <Text style={[styles.chevron, { color: colors.muted }]}>›</Text>
          </TouchableOpacity>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <TouchableOpacity style={styles.menuItem}>
            <Text style={[styles.menuItemText, { color: colors.textPrimary }]}>
              Change password
            </Text>
            <Text style={[styles.chevron, { color: colors.muted }]}>›</Text>
          </TouchableOpacity>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <View style={styles.menuItem}>
            <Text style={[styles.menuItemText, { color: colors.textPrimary }]}>
              Push notifications
            </Text>
            <Switch
              value={pushNotifications}
              onValueChange={setPushNotifications}
              trackColor={{ false: colors.border, true: colors.accent }}
              thumbColor={colors.iconSelected}
            />
          </View>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <View style={styles.menuItem}>
            <Text style={[styles.menuItemText, { color: colors.textPrimary }]}>
              Dark mode
            </Text>
            <Switch
              value={isDark}
              onValueChange={v => setMode(v ? 'dark' : 'light')}
              trackColor={{ false: colors.border, true: colors.accent }}
              thumbColor={colors.iconSelected}
            />
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.muted }]}>
            More
          </Text>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={[styles.menuItemText, { color: colors.textPrimary }]}>
              About us
            </Text>
            <Text style={[styles.chevron, { color: colors.muted }]}>›</Text>
          </TouchableOpacity>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <TouchableOpacity style={styles.menuItem}>
            <Text style={[styles.menuItemText, { color: colors.textPrimary }]}>
              Privacy policy
            </Text>
            <Text style={[styles.chevron, { color: colors.muted }]}>›</Text>
          </TouchableOpacity>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <TouchableOpacity style={styles.menuItem}>
            <Text style={[styles.menuItemText, { color: colors.textPrimary }]}>
              Terms and conditions
            </Text>
            <Text style={[styles.chevron, { color: colors.muted }]}>›</Text>
          </TouchableOpacity>
        </View>

        <GradientButton
          text="LOGOUT"
          onPress={() => setShowLogoutModal(true)}
          style={styles.logoutButton}
        />

        <View style={styles.footerSpacer} />
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
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  gearIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '600',
    color: '#000000',
  },
  scrollView: {
    flex: 1,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    marginTop: 24,
    padding: 20,
    borderRadius: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFF8E1',
  },
  profileInfo: {
    marginLeft: 16,
  },
  profileName: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  profileSubtext: {
    fontSize: 12,
    color: '#999999',
    letterSpacing: 1,
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    marginTop: 24,
    borderRadius: 16,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 13,
    color: '#999999',
    fontWeight: '600',
    paddingTop: 20,
    paddingBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  menuItemText: {
    fontSize: 17,
    color: '#000000',
  },
  chevron: {
    fontSize: 24,
    color: '#C7C7CC',
    fontWeight: '300',
  },
  plus: {
    fontSize: 24,
    color: '#C7C7CC',
    fontWeight: '300',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
  },
  logoutButton: {
    marginTop: 32,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  footerSpacer: {
    height: 40,
  },
});
