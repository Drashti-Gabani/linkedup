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

interface GuidelineCardProps {
  iconSource: any;
  title: string;
  description: string;
  colors: any;
  gradients: any;
}

const GuidelineCard: React.FC<GuidelineCardProps> = ({
  iconSource,
  title,
  description,
  colors,
  gradients,
}) => {
  return (
    <View style={styles.cardWrapper}>
      <View
        style={[
          styles.card,
          { backgroundColor: colors.backgroundCard },
        ]}
      >
        <View style={styles.cardContent}>
          <Text style={[styles.cardTitle, { color: colors.accent }]}>{title}</Text>
          <Text
            style={[
              styles.cardDescription,
              { color: colors.textPrimary },
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
  const { colors, gradients } = useTheme();
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
      <BackButton onPress={() => navigation.goBack()} size="medium" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.highlight} />
          <Text
            style={[styles.title, { color: colors.heading }]}
          >
            Welcome
          </Text>
          <Text style={[styles.subtitle, { color: colors.textDisabled }]}>
            We are glad for you to be here. Please, follow these guidelines
          </Text>
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
            />
            <GuidelineCard
              iconSource={guidelines[2].iconSource}
              title={guidelines[2].title}
              description={guidelines[2].description}
              colors={colors}
              gradients={gradients}
            />
          </View>
          <View style={styles.cardsColumn}>
            <GuidelineCard
              iconSource={guidelines[1].iconSource}
              title={guidelines[1].title}
              description={guidelines[1].description}
              colors={colors}
              gradients={gradients}
            />
            <GuidelineCard
              iconSource={guidelines[3].iconSource}
              title={guidelines[3].title}
              description={guidelines[3].description}
              colors={colors}
              gradients={gradients}
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
    marginTop: hp('5%'),
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
    marginTop: hp('5%'),
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
    fontWeight: '700',
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
    backgroundColor: '#F8F8F8',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
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
