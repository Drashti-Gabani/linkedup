import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../hooks/useTheme';
import { gradients } from '../theme/colors';
import { wp, hp } from '../utils/responsive';
import { AuthStackNavigationProp } from '../navigation/types';
import BackButton from '../components/BackButton';
import NextButton from '../components/NextButton';

type RelationshipType = 'casual' | 'professional' | 'marriage' | null;

const RelationshipTypeScreen: React.FC = () => {
  const { colors, isDark } = useTheme();
  const navigation = useNavigation<AuthStackNavigationProp>();

  const [selectedType, setSelectedType] = useState<RelationshipType>('casual');

  const handleNext = () => {
    console.log('Selected relationship type:', selectedType);
    navigation.navigate('SignUp');
  };

  const renderTypeButton = (
    type: RelationshipType,
    label: string,
    position: 'left' | 'center' | 'right',
  ) => {
    const isSelected = selectedType === type;
    const isFirst = position === 'left';
    const isLast = position === 'right';

    return (
      <TouchableOpacity
        style={styles.typeButtonWrapper}
        onPress={() => setSelectedType(type)}
        activeOpacity={0.8}
      >
        {isSelected ? (
          <LinearGradient
            colors={gradients.primary}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            angle={46}
            style={[
              styles.typeButton,
              {
                borderRightColor: colors.accent,
                borderColor: colors.accent,
              },
              isFirst && styles.typeButtonLeft,
              isLast && styles.typeButtonRight,
            ]}
          >
            <Text
              style={[styles.typeButtonText, { color: colors.iconSelected }]}
            >
              {label}
            </Text>
          </LinearGradient>
        ) : (
          <View
            style={[
              styles.typeButton,
              styles.typeButtonInactive,
              {
                borderRightColor: colors.accent,
                borderColor: colors.accent,
                backgroundColor: isDark
                  ? 'rgba(255, 255, 255, 0.1)'
                  : 'rgba(255, 255, 255, 0.25)',
              },
              isFirst && styles.typeButtonLeft,
              isLast && styles.typeButtonRight,
            ]}
          >
            <Text style={[styles.typeButtonText, { color: colors.accent }]}>
              {label}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
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

        {/* Main Content - using flexbox to fit in single screen */}
        <View style={styles.content}>
          {/* Heading Section */}
          <View style={styles.headingContainer}>
            <Text style={[styles.heading, { color: colors.heading }]}>
              The Relationship You're Looking For
            </Text>
            <Text style={[styles.subheading, { color: colors.subheading }]}>
              Choose any one
            </Text>
          </View>

          {/* Relationship Type Buttons - positioned to overlap with card */}
          <View style={styles.typeButtonsContainer}>
            {renderTypeButton('casual', 'Casual', 'left')}
            {renderTypeButton('professional', 'Professional', 'center')}
            {renderTypeButton('marriage', 'Marriage', 'right')}
          </View>

          {/* Card Section - flex to fill remaining space, starts at same y as buttons */}
          <View style={styles.cardSection}>
            <View style={styles.card}>
              <Image
                source={require('../assets/images/relationship-card-bg.png')}
                style={styles.cardBackground}
                resizeMode="cover"
              />
              <LinearGradient
                colors={[
                  'rgba(0, 0, 0, 0)',
                  isDark ? 'rgba(0, 0, 0, 0.85)' : 'rgba(1, 7, 9, 0.85)',
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.cardGradient}
              >
                <View style={styles.cardContent}>
                  <View style={styles.cardTitleContainer}>
                    <Text
                      style={[styles.cardTitle, { color: colors.iconSelected }]}
                    >
                      All are Welcome
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.cardDescription,
                      { color: colors.iconSelected },
                    ]}
                  >
                    - Meet New People, No Pressure – Connect without commitments
                    {'\n\n'}- Exciting chats & explore common interests{'\n\n'}-
                    Find Friends or Flings{'\n\n'}- Coffee? Movie? Casual
                    meetups anytime
                    {'\n\n'}- Enjoy the moment without long-term obligations
                  </Text>
                </View>
              </LinearGradient>
            </View>

            <Text style={[styles.switchText, { color: colors.textMuted }]}>
              You can switch above options anytime from your Profile
            </Text>
          </View>
        </View>

        {/* Next Button - positioned absolutely at bottom right matching Figma */}
        <NextButton
          onPress={handleNext}
          showText={true}
          textLabel="Next"
          size="medium"
        />
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
    paddingBottom: hp('5%'),
  },
  content: {
    flex: 1,
    paddingHorizontal: wp('6.52%'), // x: 27 in Figma
    paddingTop: hp('9%'), // Reduced from 11.78% to fit everything on screen
  },
  headingContainer: {
    alignItems: 'center',
    width: wp('67.39%'), // 279px width
    alignSelf: 'center',
    marginBottom: hp('4.41%'), // 40px gap to buttons (243 - 107 - 96 = 40px)
  },
  heading: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: wp('6.28%'), // 26px
    textAlign: 'center',
    marginBottom: hp('1.65%'), // 15px gap to subheading (79-64 = 15px)
    color: '#000000', // Will be overridden by inline style
  },
  subheading: {
    fontFamily: 'Sofia Pro',
    fontWeight: '400',
    fontSize: wp('4.11%'), // 17px
    lineHeight: wp('4.11%'), // 17px (1em)
    textAlign: 'center',
  },
  typeButtonsContainer: {
    flexDirection: 'row',
    width: wp('86.96%'), // 360px width
    height: hp('5.73%'), // 52px height
    overflow: 'hidden',
    marginBottom: hp('-5.73%'), // Negative margin to overlap with card (same height as buttons)
    alignSelf: 'center',
    zIndex: 5, // Above card
  },
  typeButtonWrapper: {
    flex: 1,
  },
  typeButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderWidth: 1,
  },
  typeButtonLeft: {
    borderTopLeftRadius: wp('4.35%'), // 18px
    borderBottomLeftRadius: 0,
  },
  typeButtonRight: {
    borderTopRightRadius: wp('4.35%'), // 18px
    borderBottomRightRadius: 0,
  },
  typeButtonInactive: {
    // backgroundColor will be set dynamically
  },
  typeButtonText: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: wp('3.86%'), // 16px
    textAlign: 'center',
  },
  cardSection: {
    flex: 1,
    alignItems: 'center',
    gap: hp('2%'), // 40px gap between card and switch text
    width: wp('86.96%'), // 360px width
    alignSelf: 'center',
    marginBottom: hp('8%'),
  },
  card: {
    width: '100%',
    flex: 1,
    minHeight: hp('50.11%'), // 455px minimum height
    maxHeight: hp('50.11%'), // 455px maximum height
    borderRadius: wp('4.83%'), // 20px border radius
    overflow: 'hidden',
    position: 'relative',
  },
  cardBackground: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  cardGradient: {
    flex: 1,
    justifyContent: 'flex-end',
    position: 'relative',
  },
  cardContent: {
    gap: hp('2.64%'), // 24px gap between title and description
    padding: wp('6.04%'), // 25px padding
  },
  cardTitleContainer: {
    width: wp('43.96%'), // 182px width
  },
  cardTitle: {
    fontFamily: 'Roboto-Bold',
    fontWeight: '700',
    fontSize: wp('5.8%'), // 24px
    lineHeight: wp('6.76%'), // 28.13px (1.171875em * 24)
  },
  cardDescription: {
    fontFamily: 'Sofia Pro',
    fontWeight: '300',
    fontSize: wp('3.38%'), // 14px
    lineHeight: wp('3.86%'), // 16px (1.1428571428571428em * 14)
  },
  switchText: {
    fontFamily: 'Comfortaa-Regular',
    fontSize: wp('4%'), // 16px
    textAlign: 'center',
  },
});

export default RelationshipTypeScreen;
