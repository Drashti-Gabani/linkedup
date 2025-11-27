import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
  iconColor: string;
  colors: any;
  isDark: boolean;
}

const GuidelineCard: React.FC<GuidelineCardProps> = ({
  iconSource,
  title,
  description,
  iconColor,
  colors,
  isDark,
}) => {
  const cardBackgroundColor = isDark
    ? colors.backgroundCard
    : colors.background;
  const cardShadowColor = isDark
    ? 'rgba(0, 0, 0, 0.3)'
    : 'rgba(130, 57, 255, 0.1)';
  // Use a more visible border color for light mode
  const borderColor = isDark ? colors.borderDark : '#EAEAEA'; // Light gray border that's visible on white

  return (
    <View style={styles.cardWrapper}>
      <View
        style={[
          styles.card,
          {
            backgroundColor: cardBackgroundColor,
            shadowColor: cardShadowColor,
            borderWidth: 1,
            borderColor: borderColor,
          },
        ]}
      >
        {/* Icon Badge Container - Centered */}
        <View style={styles.iconBadgeContainer}>
          <View
            style={[
              styles.iconBadge,
              {
                backgroundColor: iconColor,
                shadowColor: iconColor,
              },
            ]}
          >
            <View style={styles.iconBadgeGradient}>
              <Image
                source={iconSource}
                style={styles.iconImage}
                resizeMode="contain"
                tintColor="#FFFFFF"
              />
            </View>
          </View>
        </View>

        <View style={styles.cardContent}>
          <Text style={[styles.cardTitle, { color: colors.accent }]}>
            {title}
          </Text>
          <Text
            style={[
              styles.cardDescription,
              {
                color: isDark ? colors.textSecondary : colors.textPrimary,
              },
            ]}
          >
            {description}
          </Text>
        </View>
      </View>
    </View>
  );
};

const CommunityGuidelinesScreen: React.FC = () => {
  const { colors, isDark } = useTheme();
  const navigation = useNavigation<MainStackNavigationProp>();

  // All icons use the same accent color from theme
  const iconColor = colors.accent;

  const guidelines = [
    {
      iconSource: guidelineIcons.honest,
      title: 'Be honest',
      description: 'Provide us your correct info for perfect match.',
    },
    {
      iconSource: guidelineIcons.respect,
      title: 'Respect',
      description: 'Be respectful and refrain from using bad language.',
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
              iconColor={iconColor}
              colors={colors}
              isDark={isDark}
            />
            <GuidelineCard
              iconSource={guidelines[2].iconSource}
              title={guidelines[2].title}
              description={guidelines[2].description}
              iconColor={iconColor}
              colors={colors}
              isDark={isDark}
            />
          </View>
          <View style={styles.cardsColumn}>
            <GuidelineCard
              iconSource={guidelines[1].iconSource}
              title={guidelines[1].title}
              description={guidelines[1].description}
              iconColor={iconColor}
              colors={colors}
              isDark={isDark}
            />
            <GuidelineCard
              iconSource={guidelines[3].iconSource}
              title={guidelines[3].title}
              description={guidelines[3].description}
              iconColor={iconColor}
              colors={colors}
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
  cardsGrid: {
    flexDirection: 'row',
    paddingHorizontal: wp('7.5%'),
    gap: wp('4%'),
    marginBottom: hp('6%'),
  },
  cardsColumn: {
    flex: 1,
    gap: wp('4%'),
  },
  cardWrapper: {
    position: 'relative',
  },
  card: {
    borderRadius: wp('4%'),
    marginBottom: hp('1.2%'),
    shadowOffset: { width: 0, height: hp('0.25%') },
    shadowOpacity: 0.1,
    shadowRadius: wp('2%'),
    elevation: 3,
  },
  iconBadgeContainer: {
    position: 'absolute',
    top: hp('-2.5%'),
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },
  iconBadge: {
    width: wp('12%'),
    height: wp('12%'),
    borderRadius: wp('6%'),
    overflow: 'hidden',
    shadowOffset: { width: 0, height: hp('0.4%') },
    shadowOpacity: 0.25,
    shadowRadius: wp('2%'),
    elevation: 6,
  },
  cardContent: {
    padding: wp('2.5%'),
    gap: hp('1%'),
    paddingTop: hp('4%'),
    flex: 1,
    justifyContent: 'flex-start',
  },
  cardTitle: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: wp('4.2%'),
    letterSpacing: wp('-0.08%'),
    lineHeight: hp('2.5%'),
    textAlign: 'center',
  },
  cardDescription: {
    fontFamily: 'Comfortaa-Regular',
    fontSize: wp('3.5%'),
    lineHeight: hp('2.5%'),
    textAlign: 'center',
    marginBottom: hp('1%'),
  },
  iconBadgeGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
    width: wp('6%'),
    height: wp('6%'),
  },
});

export default CommunityGuidelinesScreen;
