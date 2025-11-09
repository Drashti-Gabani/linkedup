import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';

// Auth Stack Param List (Onboarding flow)
export type AuthStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  SignUp: undefined; // Sign up screen
  OTP: undefined; // Phone number screen
  OTPVerify: undefined;
  RelationshipType: undefined;
  GenderSelection: undefined; // Match preference
  Media: undefined;
  Interests: undefined;
  LifestyleAndBeliefs: undefined;
  HealthAndFood: undefined;
  WhoAmI: undefined;
  Education: undefined;
  Languages: undefined;
  Industry: undefined;
  ProfessionalRole: undefined;
  MonthlyEarning: undefined;
  ProfessionalExperience: undefined;
  CommunityGuidelines: undefined;
};

// Main Tab Param List
export type MainTabParamList = {
  Discover: undefined;
  Matches: undefined;
  Chat: undefined;
  Settings: undefined;
};

// Main Stack Param List (screens accessible from tabs)
export type MainStackParamList = {
  MainTabs: undefined;
  UserProfile: undefined;
  MyProfile: undefined;
  Likes: undefined;
  Filters: undefined;
  Match: undefined;
  Conversation: undefined;
  Profile: undefined;
  CommunityGuidelines: undefined;
};

// Root Stack Param List (combines Auth and Main)
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type AuthStackNavigationProp =
  NativeStackNavigationProp<AuthStackParamList>;
export type MainTabNavigationProp = BottomTabNavigationProp<MainTabParamList>;
export type MainStackNavigationProp =
  NativeStackNavigationProp<MainStackParamList>;
export type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Navigation props for individual screens
export type OnboardingScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'Onboarding'
>;

export type LoginScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'Login'
>;

export type ProfileScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'Profile'
>;

export type SettingsScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Settings'>,
  NativeStackNavigationProp<MainStackParamList>
>;

export type InterestsScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'Interests'
>;

export type WhoAmIScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'WhoAmI'
>;

export type MonthlyEarningScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'MonthlyEarning'
>;

export type ProfessionalExperienceScreenNavigationProp =
  NativeStackNavigationProp<AuthStackParamList, 'ProfessionalExperience'>;

export type EducationScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'Education'
>;

export type LanguagesScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'Languages'
>;

export type IndustryScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'Industry'
>;

export type ProfessionRoleScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'ProfessionalRole'
>;

export type CommunityGuidelinesScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'CommunityGuidelines'
>;
