import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { useTheme } from '../hooks/useTheme';
import { tabIcons } from '../assets/images';

interface TabItem {
  id: string;
  label: string;
  icon: any;
}

interface BottomTabBarProps {
  activeTab: string;
  onTabPress: (tabId: string) => void;
}

const TABS: TabItem[] = [
  { id: 'home', label: 'Home', icon: tabIcons.home },
  { id: 'matches', label: 'Matches', icon: tabIcons.matches },
  { id: 'inbox', label: 'Inbox', icon: tabIcons.inbox },
  { id: 'settings', label: 'Settings', icon: tabIcons.settings },
];

const BottomTabBar: React.FC<BottomTabBarProps> = ({
  activeTab,
  onTabPress,
}) => {
  const { colors, gradients, isDark } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          borderTopColor: colors.borderTab,
        },
      ]}
    >
      {TABS.map(tab => {
        const isActive = activeTab === tab.id;

        return (
          <TouchableOpacity
            key={tab.id}
            style={styles.tabButton}
            onPress={() => onTabPress(tab.id)}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.tabContent,
                isActive && {
                  shadowColor: colors.shadow,
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 3,
                },
              ]}
            >
              {/* Shadow on the active tab {isActive && (
                <View
                  style={[
                    styles.activeBackground,
                    { backgroundColor: colors.backgroundActive },
                  ]}
                />
              )} */}

              <View style={styles.iconContainer}>
                {isActive ? (
                  <MaskedView
                    maskElement={
                      <Image
                        source={tab.icon}
                        style={[
                          styles.icon,
                          tab.id === 'home' && styles.homeIcon,
                        ]}
                        resizeMode="contain"
                      />
                    }
                  >
                    <LinearGradient
                      colors={gradients.primary}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={[
                        styles.iconGradient,
                        tab.id === 'home' && styles.homeIconGradient,
                      ]}
                    >
                      <Image
                        source={tab.icon}
                        style={[
                          styles.icon,
                          tab.id === 'home' && styles.homeIcon,
                          { opacity: 0 },
                        ]}
                        resizeMode="contain"
                      />
                    </LinearGradient>
                  </MaskedView>
                ) : (
                  <Image
                    source={tab.icon}
                    style={[
                      styles.icon,
                      tab.id === 'home' && styles.homeIcon,
                      {
                        tintColor: isDark
                          ? colors.tabInactiveDark
                          : colors.tabInactive,
                      },
                    ]}
                    resizeMode="contain"
                  />
                )}
              </View>

              {isActive ? (
                <MaskedView
                  maskElement={
                    <Text style={styles.labelMask}>{tab.label}</Text>
                  }
                >
                  <LinearGradient
                    colors={gradients.primary}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.labelGradient}
                  >
                    <Text style={[styles.label, { opacity: 0 }]}>
                      {tab.label}
                    </Text>
                  </LinearGradient>
                </MaskedView>
              ) : (
                <Text
                  style={[
                    styles.label,
                    {
                      color: isDark
                        ? colors.tabInactiveDark
                        : colors.tabInactive,
                    },
                  ]}
                >
                  {tab.label}
                </Text>
              )}

              {isActive && (
                <LinearGradient
                  colors={gradients.primary}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.activeIndicator}
                  angle={242}
                />
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 93,
    borderTopWidth: 0.7,
    paddingBottom: 10,
    paddingTop: 16,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContent: {
    alignItems: 'center',
    position: 'relative',
  },
  activeBackground: {
    position: 'absolute',
    top: -8,
    width: 38,
    height: 36,
    borderRadius: 10,
  },
  iconContainer: {
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  icon: {
    width: 22,
    height: 22,
  },
  homeIcon: {
    width: 28,
    height: 19,
  },
  iconGradient: {
    width: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeIconGradient: {
    width: 28,
    height: 19,
  },
  labelMask: {
    fontFamily: 'Sofia Pro',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: -0.24,
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  labelGradient: {
    paddingVertical: 2,
  },
  label: {
    fontFamily: 'Comfortaa-Medium',
    fontSize: 12,
    lineHeight: 13,
    textAlign: 'center',
  },
  activeIndicator: {
    width: 27,
    height: 10,
    borderRadius: 13,
    marginTop: 10,
  },
});

export default BottomTabBar;
