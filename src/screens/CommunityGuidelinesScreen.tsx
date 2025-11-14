import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../hooks/useTheme';
import { wp, hp } from '../utils/responsive';
import { MainStackNavigationProp } from '../navigation/types';
import BackButton from '../components/BackButton';
import GradientButton from '../components/GradientButton';
import { guidelineIcons } from '../assets/images';
import ScreenTitle from '../components/ScreenTitle';

interface GuidelineCardProps {
  iconSource: any;
  title: string;
  description: string;
  colors: any;
  gradients: any;
  isDark: boolean;
}

const GuidelineCard: React.FC<GuidelineCardProps> = ({
  iconSource,
  title,
  description,
  colors,
  gradients,
  isDark,
}) => {
  const cardBackgroundColor = isDark ? '#2E2E2E' : '#FFFFFF';
  const cardShadowColor = 'rgba(164, 164, 164, 0.2)';

  return (
    <View style={styles.cardWrapper}>
      <View
        style={[
          styles.card,
          {
            backgroundColor: cardBackgroundColor,
            shadowColor: cardShadowColor,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 1,
            shadowRadius: 75,
            elevation: 8,
          },
        ]}
      >
        <View style={styles.cardContent}>
          <Text style={[styles.cardTitle, { color: colors.accent }]}>
            {title}
          </Text>
          <Text
            style={[
              styles.cardDescription,
              {
                color: isDark ? '#C6C6C6' : '#000000',
              },
            ]}
          >
            {description}
          </Text>
        </View>
        <View style={styles.iconBadge}>
          <LinearGradient
            colors={gradients.primary}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.iconBadgeGradient}
          >
            <Image
              source={iconSource}
              style={styles.iconImage}
              resizeMode="contain"
            />
          </LinearGradient>
        </View>
      </View>
    </View>
  );
};

const CommunityGuidelinesScreen: React.FC = () => {
  const { colors, gradients, isDark } = useTheme();
  const navigation = useNavigation<MainStackNavigationProp>();

  const guidelines = [
    {
      iconSource: guidelineIcons.honest,
      title: 'Be honest',
      description: 'Provide us your correct info for perfect match.',
    },
    {
      iconSource: guidelineIcons.respect,
      title: 'Respect',
      description: 'Be respectful dnd refrain from using bad language.',
    },
    {
      iconSource: guidelineIcons.privacy,
      title: 'Privacy',
      description: "Don't share any personal contact info to anyone.",
    },
    {
      iconSource: guidelineIcons.vigilant,
      title: 'Be Vigilant',
      description: 'Report rude behaviors or fake profiles to us',
    },
  ];

  const handleAgree = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Main' }],
    });
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        bounces={false}
      >
        <BackButton onPress={() => navigation.goBack()} size="medium" />

        {/* Header */}
        <View style={styles.header}>
          <ScreenTitle
            title="Welcome"
            titleSize="large"
            subtitle="We are glad for you to be here. Please, follow these guidelines"
            containerMarginBottom={hp('1%')}
          />
        </View>

        {/* Guidelines Cards Grid */}
        <View style={styles.cardsGrid}>
          <View style={styles.cardsColumn}>
            <GuidelineCard
              iconSource={guidelines[0].iconSource}
              title={guidelines[0].title}
              description={guidelines[0].description}
              colors={colors}
              gradients={gradients}
              isDark={isDark}
            />
            <GuidelineCard
              iconSource={guidelines[2].iconSource}
              title={guidelines[2].title}
              description={guidelines[2].description}
              colors={colors}
              gradients={gradients}
              isDark={isDark}
            />
          </View>
          <View style={styles.cardsColumn}>
            <GuidelineCard
              iconSource={guidelines[1].iconSource}
              title={guidelines[1].title}
              description={guidelines[1].description}
              colors={colors}
              gradients={gradients}
              isDark={isDark}
            />
            <GuidelineCard
              iconSource={guidelines[3].iconSource}
              title={guidelines[3].title}
              description={guidelines[3].description}
              colors={colors}
              gradients={gradients}
              isDark={isDark}
            />
          </View>
        </View>

        <GradientButton text="I understand & Agree" onPress={handleAgree} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: hp('3%'),
  },
  header: {
    alignItems: 'center',
    marginTop: hp('10%'),
    marginBottom: hp('4%'),
    paddingHorizontal: wp('20%'),
    position: 'relative',
  },
  highlight: {
    position: 'absolute',
    backgroundColor: '#F2F2F2',
    width: 96,
    height: 18,
    top: 16,
    zIndex: -1,
  },
  title: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: 32,
    letterSpacing: -0.64,
    marginBottom: 16,
    textAlign: 'center',
    lineHeight: 47,
  },
  subtitle: {
    fontFamily: 'Sofia Pro',
    fontSize: 16,
    lineHeight: 26,
    textAlign: 'center',
    letterSpacing: -0.32,
    color: '#B2B2B2',
  },
  cardsGrid: {
    flexDirection: 'row',
    paddingHorizontal: wp('7.5%'),
    gap: 16,
    marginBottom: hp('6%'),
  },
  cardsColumn: {
    flex: 1,
    gap: 16,
  },
  cardWrapper: {
    position: 'relative',
  },
  card: {
    borderRadius: 15,
    minHeight: 140,
    position: 'relative',
    marginBottom: 10,
  },
  cardContent: {
    padding: 20,
    paddingTop: 24,
    paddingRight: 16,
    gap: 10,
  },
  cardTitle: {
    fontFamily: 'Sofia Pro',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: -0.36,
    color: '#8239FF',
    lineHeight: 18,
    marginBottom: 4,
  },
  cardDescription: {
    fontFamily: 'Sofia Pro',
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 22,
    letterSpacing: -0.3,
  },
  iconBadge: {
    position: 'absolute',
    top: -15,
    right: -10,
    width: 45,
    height: 45,
    borderRadius: 22.5,
    overflow: 'hidden',
    shadowColor: '#8239FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  iconBadgeGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
    width: 25,
    height: 25,
  },
});

export default CommunityGuidelinesScreen;
