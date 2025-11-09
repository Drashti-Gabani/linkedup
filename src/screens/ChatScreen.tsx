import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../hooks/useTheme';
import { useNavigation } from '@react-navigation/native';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainTabParamList, MainStackParamList } from '../navigation/types';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

type ChatScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Chat'>,
  NativeStackNavigationProp<MainStackParamList>
>;

const ChatScreen: React.FC = () => {
  const navigation = useNavigation<ChatScreenNavigationProp>();
  const { colors, isDark } = useTheme();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleMessagePress = (messageId: string) => {
    navigation.navigate('Conversation' as never);
  };

  const renderMessageItem = ({ item }: { item: (typeof messages)[0] }) => (
    <TouchableOpacity
      style={styles.messageItem}
      onPress={() => handleMessagePress(item.id)}
    >
      <View style={styles.messageContent}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
          {item.hasUnread && <View style={styles.unreadDot} />}
        </View>
        <View style={styles.messageInfo}>
          <View style={styles.messageHeader}>
            <Text
              style={[
                styles.messageName,
                { color: colors.heading },
              ]}
            >
              {item.name}
            </Text>
          </View>
          <Text
            style={[
              styles.messageText,
              { color: colors.textPrimary },
            ]}
          >
            {item.message}
          </Text>
        </View>
        <View style={styles.timeContainer}>
          <Text style={[styles.messageTime, { color: '#ADAFBB' }]}>
            {item.time}
          </Text>
          {item.unreadCount > 0 && (
            <View style={styles.unreadCountContainer}>
              <Text style={styles.unreadCountText}>{item.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const messages = [
    {
      id: '1',
      name: 'Penelope',
      message: "You: Hey! What's up, long time..",
      time: '50 min',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      hasUnread: false,
      unreadCount: 0,
    },
    {
      id: '2',
      name: 'Elizabeth',
      message: 'Ok, see you then.',
      time: '33 min',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      hasUnread: false,
      unreadCount: 0,
    },
    {
      id: '3',
      name: 'Abigail',
      message: 'Typing..',
      time: '27 min',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
      hasUnread: true,
      unreadCount: 3,
    },
    {
      id: '4',
      name: 'Emelie',
      message: 'Sticker 😍',
      time: '23 min',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
      hasUnread: true,
      unreadCount: 1,
    },
  ];

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.backButtonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <View
              style={[
                styles.buttonContainer,
                { backgroundColor: colors.headerButtonBackground },
              ]}
            >
              <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M15 18L9 12L15 6"
                  stroke={colors.headerButtonIcon}
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.headerText}>
          <Text
            style={[
              styles.inboxTitle,
              { color: colors.heading },
            ]}
          >
            Inbox
          </Text>
          <Text
            style={[
              styles.messageCount,
              { color: colors.textMuted },
            ]}
          >
            33 messages
          </Text>
        </View>

        <View style={styles.backButtonContainer} />
      </View>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <View
          style={[
            styles.searchInput,
            { backgroundColor: colors.searchBackground },
          ]}
        >
          <Svg
            width={24}
            height={20}
            viewBox="0 0 24 20"
            fill="none"
            style={styles.searchIcon}
          >
            <Path
              d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z"
              stroke={colors.searchIcon}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
          <TextInput
            style={[
              styles.searchText,
              { color: colors.searchIcon },
            ]}
            placeholder="Search"
            placeholderTextColor={colors.placeholder}
          />
        </View>
      </View>

      {/* Messages List */}
      <View style={styles.messagesContainer}>
        <Text
          style={[
            styles.sectionTitle,
            { color: colors.heading },
          ]}
        >
          Messages
        </Text>

        <FlatList
          data={messages}
          renderItem={renderMessageItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp('8%'),
    paddingVertical: hp('1.5%'),
    marginTop: hp('1%'),
  },
  backButtonContainer: {
    width: wp('11.6%'),
    height: hp('6%'),
  },
  backButton: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    flex: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    alignItems: 'center',
    flex: 1,
  },
  inboxTitle: {
    fontFamily: 'Comfortaa',
    fontSize: hp('3.4%'),
    fontWeight: '700',
    lineHeight: hp('3.8%'),
    letterSpacing: -0.9,
    textAlign: 'center',
  },
  messageCount: {
    fontFamily: 'Sofia Pro',
    fontSize: hp('1.7%'),
    fontWeight: '400',
    lineHeight: hp('2.6%'),
    letterSpacing: -0.45,
    textAlign: 'center',
    marginTop: hp('0.3%'),
  },
  searchContainer: {
    paddingHorizontal: wp('9.7%'),
    paddingVertical: hp('1.5%'),
  },
  searchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    height: hp('5.6%'),
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E8E6EA',
    paddingHorizontal: wp('5.6%'),
  },
  searchIcon: {
    marginRight: wp('2.8%'),
  },
  searchText: {
    flex: 1,
    fontFamily: 'Sk-Modernist',
    fontSize: hp('1.6%'),
    fontWeight: '400',
    lineHeight: hp('2.1%'),
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: wp('9.7%'),
    paddingTop: hp('1%'),
  },
  flatListContent: {
    paddingBottom: hp('2%'),
  },
  sectionTitle: {
    fontFamily: 'Comfortaa',
    fontSize: hp('2.1%'),
    fontWeight: '700',
    lineHeight: hp('2.7%'),
    marginBottom: hp('2.5%'),
  },
  messageItem: {
    marginBottom: hp('1.2%'),
  },
  messageContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp('0.7%'),
  },
  avatarContainer: {
    position: 'relative',
    marginRight: wp('3.8%'),
  },
  avatar: {
    width: wp('13.5%'),
    height: wp('13.5%'),
    borderRadius: wp('6.75%'),
  },
  messageInfo: {
    flex: 1,
  },
  messageHeader: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: hp('0.4%'),
  },
  messageName: {
    fontFamily: 'Sk-Modernist',
    fontSize: hp('1.6%'),
    fontWeight: '700',
    lineHeight: hp('2.1%'),
    textAlign: 'center',
  },
  messageTime: {
    fontFamily: 'Sk-Modernist',
    fontSize: hp('1.4%'),
    fontWeight: '700',
    lineHeight: hp('1.8%'),
    textAlign: 'right',
  },
  messageText: {
    fontFamily: 'Sk-Modernist',
    fontSize: hp('1.6%'),
    fontWeight: '400',
    lineHeight: hp('2.1%'),
  },
  timeContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 20,
    gap: hp('0.5%'),
  },
  unreadDot: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: wp('3.5%'),
    height: wp('3.5%'),
    borderRadius: wp('1.75%'),
    backgroundColor: '#65E700',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  unreadCountContainer: {
    backgroundColor: '#9253FF',
    borderRadius: wp('2.5%'),
    paddingHorizontal: wp('2%'),
    paddingVertical: wp('0.5%'),
    minWidth: wp('5%'),
    height: wp('5%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('0.2%'),
    alignSelf: 'center',
  },
  unreadCountText: {
    color: '#FFFFFF',
    fontSize: hp('1%'),
    fontWeight: '700',
    fontFamily: 'Sk-Modernist',
  },
});

export default ChatScreen;
