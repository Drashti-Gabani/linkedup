import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  RootStackParamList,
  AuthStackParamList,
  MainStackParamList,
  MainTabParamList,
} from './types';

// Screens - Auth Stack
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import OTPScreen from '../screens/OTPScreen';
import OTPVerifyScreen from '../screens/OTPVerifyScreen';
import RelationshipTypeScreen from '../screens/RelationshipTypeScreen';
import GenderSelectionScreen from '../screens/GenderSelectionScreen';
import MediaScreen from '../screens/MediaScreen';
import InterestsScreen from '../screens/InterestsScreen';
import LifestyleAndBeliefsScreen from '../screens/LifestyleAndBeliefsScreen';
import HealthAndFoodScreen from '../screens/HealthAndFoodScreen';
import WhoAmIScreen from '../screens/WhoAmIScreen';
import EducationScreen from '../screens/EducationScreen';
import LanguagesScreen from '../screens/LanguagesScreen';
import IndustryScreen from '../screens/IndustryScreen';
import ProfessionRoleScreen from '../screens/ProfessionRoleScreen';
import MonthlyEarningScreen from '../screens/MonthlyEarningScreen';
import ProfessionalExperienceScreen from '../screens/ProfessionalExperienceScreen';

// Screens - Main Stack
import DiscoverScreen from '../screens/DiscoverScreen';
import MatchesScreen from '../screens/MatchesScreen';
import ChatScreen from '../screens/ChatScreen';
import SettingsScreen from '../screens/SettingsScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import MyProfileScreen from '../screens/MyProfileScreen';
import LikesScreen from '../screens/LikesScreen';
import FiltersScreen from '../screens/FiltersScreen';
import MatchScreen from '../screens/MatchScreen';
import ConversationScreen from '../screens/ConversationScreen';
import ProfileScreen from '../ProfileScreen';
import CommunityGuidelinesScreen from '../screens/CommunityGuidelinesScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import LegalScreen from '../screens/LegalScreen';

// Bottom Tab Bar Component
import BottomTabBar from '../components/BottomTabBar';
import { useTheme } from '../hooks/useTheme';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const MainStack = createNativeStackNavigator<MainStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

// Auth Stack Navigator (Onboarding flow)
const AuthNavigator: React.FC = () => {
  return (
    <AuthStack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <AuthStack.Screen name="Onboarding" component={OnboardingScreen} />
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="OTP" component={OTPScreen} />
      <AuthStack.Screen name="OTPVerify" component={OTPVerifyScreen} />
      <AuthStack.Screen
        name="RelationshipType"
        component={RelationshipTypeScreen}
      />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
      <AuthStack.Screen
        name="GenderSelection"
        component={GenderSelectionScreen}
      />
      <AuthStack.Screen name="Media" component={MediaScreen} />
      <AuthStack.Screen name="Interests" component={InterestsScreen} />
      <AuthStack.Screen
        name="LifestyleAndBeliefs"
        component={LifestyleAndBeliefsScreen}
      />
      <AuthStack.Screen name="HealthAndFood" component={HealthAndFoodScreen} />
      <AuthStack.Screen name="WhoAmI" component={WhoAmIScreen} />
      <AuthStack.Screen name="Education" component={EducationScreen} />
      <AuthStack.Screen name="Languages" component={LanguagesScreen} />
      <AuthStack.Screen name="Industry" component={IndustryScreen} />
      <AuthStack.Screen
        name="ProfessionalRole"
        component={ProfessionRoleScreen}
      />
      <AuthStack.Screen
        name="MonthlyEarning"
        component={MonthlyEarningScreen}
      />
      <AuthStack.Screen
        name="ProfessionalExperience"
        component={ProfessionalExperienceScreen}
      />
      <AuthStack.Screen
        name="CommunityGuidelines"
        component={CommunityGuidelinesScreen}
      />
    </AuthStack.Navigator>
  );
};

// Bottom Tab Navigator
const TabNavigator: React.FC = () => {
  const { colors, mode } = useTheme();

  return (
    <Tab.Navigator
      tabBar={props => {
        const activeTabId =
          props.state.index === 0
            ? 'home'
            : props.state.index === 1
            ? 'matches'
            : props.state.index === 2
            ? 'inbox'
            : 'settings';

        return (
          <BottomTabBar
            activeTab={activeTabId}
            onTabPress={tabId => {
              let routeName: keyof MainTabParamList;
              if (tabId === 'home') {
                routeName = 'Discover';
              } else if (tabId === 'inbox') {
                routeName = 'Chat';
              } else if (tabId === 'matches') {
                routeName = 'Matches';
              } else {
                routeName = 'Settings';
              }
              props.navigation.navigate(routeName);
            }}
          />
        );
      }}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Discover" component={DiscoverScreen} />
      <Tab.Screen name="Matches" component={MatchesScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

// Main Stack Navigator (includes tabs and other screens)
const MainNavigator: React.FC = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <MainStack.Screen name="MainTabs" component={TabNavigator} />
      <MainStack.Screen name="UserProfile" component={UserProfileScreen} />
      <MainStack.Screen name="MyProfile" component={MyProfileScreen} />
      <MainStack.Screen name="Likes" component={LikesScreen} />
      <MainStack.Screen
        name="Filters"
        component={FiltersScreen}
        options={{ presentation: 'modal' }}
      />
      <MainStack.Screen name="Match" component={MatchScreen} />
      <MainStack.Screen name="Conversation" component={ConversationScreen} />
      <MainStack.Screen name="Profile" component={ProfileScreen} />
      <MainStack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
      />
      <MainStack.Screen name="Legal" component={LegalScreen} />
      <MainStack.Screen name="Media" component={MediaScreen} />
      <MainStack.Screen name="Interests" component={InterestsScreen} />
      <MainStack.Screen name="WhoAmI" component={WhoAmIScreen} />
      <MainStack.Screen name="Education" component={EducationScreen} />
      <MainStack.Screen name="Languages" component={LanguagesScreen} />
      <MainStack.Screen name="Industry" component={IndustryScreen} />
      <MainStack.Screen
        name="ProfessionalRole"
        component={ProfessionRoleScreen}
      />
      <MainStack.Screen
        name="LifestyleAndBeliefs"
        component={LifestyleAndBeliefsScreen}
      />
    </MainStack.Navigator>
  );
};

// Root Navigator
const RootNavigator: React.FC = () => {
  // TODO: Add authentication state management here
  // For now, defaulting to Auth stack
  const isAuthenticated = false;

  return (
    <RootStack.Navigator
      initialRouteName={isAuthenticated ? 'Auth' : 'Main'}
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <RootStack.Screen name="Auth" component={AuthNavigator} />
      <RootStack.Screen name="Main" component={MainNavigator} />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
