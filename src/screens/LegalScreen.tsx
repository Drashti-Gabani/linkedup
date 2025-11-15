import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../hooks/useTheme';
import { wp, hp } from '../utils/responsive';
import BackButton from '../components/BackButton';
import { SettingsScreenNavigationProp } from '../navigation/types';
import { useNavigation, useRoute } from '@react-navigation/native';
import { WebView } from 'react-native-webview';

type LegalScreenRouteParams = {
  type: 'about' | 'privacy' | 'terms';
};

const LegalScreen: React.FC = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const route = useRoute();
  const { colors, isDark } = useTheme();
  const params = route.params as LegalScreenRouteParams;
  const type = params?.type || 'about';

  const getTitle = () => {
    switch (type) {
      case 'about':
        return 'About us';
      case 'privacy':
        return 'Privacy policy';
      case 'terms':
        return 'Terms and conditions';
      default:
        return 'About us';
    }
  };

  // For now, using google.com as dummy link
  const webViewUrl = 'https://www.google.com';

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <BackButton
            onPress={() => navigation.goBack()}
            size="medium"
            style={styles.backButton}
          />
          <Text
            style={[
              styles.headerTitle,
              {
                color: isDark ? colors.textPrimary : colors.textQuaternary,
              },
            ]}
          >
            {getTitle()}
          </Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* WebView Content */}
        <View style={styles.webViewContainer}>
          <WebView
            source={{ uri: webViewUrl }}
            style={styles.webView}
            startInLoadingState={true}
            renderLoading={() => (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.accent} />
              </View>
            )}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp('3%'),
    paddingTop: hp('2%'),
    paddingBottom: hp('2%'),
  },
  backButton: {
    position: 'relative',
    top: 0,
    left: 0,
  },
  headerTitle: {
    fontFamily: 'Comfortaa-Medium',
    fontSize: 22,
    lineHeight: 31,
    letterSpacing: 0.98,
    flex: 1,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  webViewContainer: {
    flex: 1,
  },
  webView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});

export default LegalScreen;
