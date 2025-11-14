import React, { useState } from 'react';
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
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../hooks/useTheme';
import { useNavigation } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'other';
  time: string;
  senderName: string;
}

const ConversationScreen: React.FC = () => {
  const navigation = useNavigation();
  const { colors, gradients, isDark } = useTheme();
  const [messageText, setMessageText] = useState('');

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSend = () => {
    if (messageText.trim()) {
      // Handle send message
      console.log('Send message:', messageText);
      setMessageText('');
    }
  };

  const messages: Message[] = [
    {
      id: '1',
      text: "Hi Travis, I'm sorry for not returning your call! Work has been crazy, how have you been?",
      sender: 'other',
      time: '2:56 PM',
      senderName: 'CATIE',
    },
    {
      id: '2',
      text: "Hi Catie! I've been good actually. Thanks for asking! How is college going for ya?",
      sender: 'me',
      time: '3:02 PM',
      senderName: 'TRAVIS',
    },
    {
      id: '3',
      text: "It's been going really good. Made some new friends. I'm coming home Friday for a bit!",
      sender: 'other',
      time: '3:25 PM',
      senderName: 'CATIE',
    },
    {
      id: '4',
      text: "That's awesome! Want to grab a few drinks this weekend?",
      sender: 'me',
      time: '5:07 PM',
      senderName: 'TRAVIS',
    },
    {
      id: '5',
      text: "That sounds great, I'd love to!",
      sender: 'other',
      time: '5:36 PM',
      senderName: 'CATIE',
    },
  ];

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={styles.messageContainer}>
      <View
        style={[
          styles.messageWrapper,
          item.sender === 'me'
            ? styles.myMessageWrapper
            : styles.otherMessageWrapper,
        ]}
      >
        <Text
          style={[
            styles.messageTime,
            {
              color: colors.messageTime,
              alignSelf: item.sender === 'me' ? 'flex-end' : 'flex-start',
              marginBottom: hp('0.3%'),
            },
          ]}
        >
          {item.senderName} {item.time}
        </Text>
        {item.sender === 'me' ? (
          <LinearGradient
            colors={gradients.secondary}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            angle={242}
            style={[styles.messageBubble, styles.myMessage]}
          >
            <Text style={styles.myMessageText}>{item.text}</Text>
          </LinearGradient>
        ) : (
          <View
            style={[
              styles.messageBubble,
              styles.otherMessage,
              {
                backgroundColor: colors.messageBackground,
                borderWidth: isDark ? 0 : 0.8,
                borderColor: isDark ? 'transparent' : colors.borderLight,
              },
            ]}
          >
            <Text
              style={[
                styles.messageText,
                {
                  color: colors.messageText,
                },
              ]}
            >
              {item.text}
            </Text>
          </View>
        )}
      </View>
    </View>
  );

  const renderMatchedOn = () => (
    <View style={styles.matchedOnContainer}>
      <View
        style={[
          styles.dividerLine,
          { backgroundColor: colors.messageDivider },
        ]}
      />
      <Text
        style={[
          styles.matchedOnText,
          { color: colors.messageTime },
        ]}
      >
        YOU MATCHED WITH CATIE ON 7/6/19
      </Text>
      <View
        style={[
          styles.dividerLine,
          { backgroundColor: colors.messageDivider },
        ]}
      />
    </View>
  );

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

        <View style={styles.userInfo}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
            }}
            style={styles.userAvatar}
          />
          <Text
            style={[styles.userName, { color: colors.heading }]}
          >
            Catie
          </Text>
          {isDark && (
            <Text style={[styles.lastActive, { color: colors.textMuted }]}>
              ACTIVE 5M AGO
            </Text>
          )}
        </View>

        <TouchableOpacity style={styles.unmatchButton}>
          <View
            style={[
              styles.buttonContainer,
              { backgroundColor: colors.headerButtonBackground },
            ]}
          >
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
              <Path
                d="M18 6L6 18M6 6L18 18"
                stroke={colors.headerButtonIcon}
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </View>
        </TouchableOpacity>
      </View>

      {/* Matched On Section */}
      {renderMatchedOn()}

      {/* Messages List */}
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        style={styles.messagesList}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
        inverted
      />

      {/* Message Input */}
      <View style={styles.inputContainer}>
        <View
          style={[
            styles.inputWrapper,
            {
              backgroundColor: colors.inputBackground,
              borderColor: colors.borderLight,
            },
          ]}
        >
          <TextInput
            style={[
              styles.textInput,
              { color: colors.fieldText },
            ]}
            placeholder="Message..."
            placeholderTextColor={colors.placeholder}
            value={messageText}
            onChangeText={setMessageText}
            multiline
            textAlignVertical="center"
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <LinearGradient
              colors={gradients.secondary}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              angle={242}
              style={styles.sendButtonGradient}
            >
              <Image
                source={require('../assets/icons/send-icon.png')}
                style={styles.sendIcon}
                resizeMode="contain"
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>
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
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: wp('6%'),
    paddingVertical: hp('1%'),
    marginTop: hp('1%'),
    minHeight: hp('13%'),
  },
  backButton: {
    width: wp('11.6%'),
    height: hp('6%'),
    marginTop: hp('1%'),
  },
  unmatchButton: {
    width: wp('11.6%'),
    height: hp('6%'),
    marginTop: hp('1%'),
  },
  buttonContainer: {
    flex: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingTop: hp('2%'),
  },
  userAvatar: {
    width: wp('16%'),
    height: wp('16%'),
    borderRadius: wp('8%'),
    marginBottom: hp('0.5%'),
  },
  userName: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: hp('3.1%'),
    lineHeight: hp('3.5%'),
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  lastActive: {
    fontFamily: 'Comfortaa-Medium',
    fontSize: hp('1.5%'),
    lineHeight: hp('1.7%'),
    textAlign: 'center',
    marginTop: hp('0.5%'),
  },
  matchedOnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('8%'),
    paddingVertical: hp('2%'),
    marginTop: hp('1%'),
  },
  dividerLine: {
    flex: 1,
    height: 0.5,
  },
  matchedOnText: {
    fontFamily: 'Comfortaa-Medium',
    fontSize: hp('1.2%'),
    lineHeight: hp('1.8%'),
    letterSpacing: 0.5,
    textAlign: 'center',
    marginHorizontal: wp('4%'),
  },
  messagesList: {
    flex: 1,
    paddingHorizontal: wp('7.7%'),
  },
  messagesContent: {
    paddingVertical: hp('2%'),
  },
  messageContainer: {
    width: '100%',
    marginBottom: hp('2%'),
  },
  messageWrapper: {
    width: '100%',
  },
  myMessageWrapper: {
    alignItems: 'flex-end',
  },
  otherMessageWrapper: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    borderRadius: 20,
    maxWidth: '100%',
  },
  myMessage: {
    maxWidth: '80%',
    borderTopRightRadius: 0,
  },
  otherMessage: {
    maxWidth: '80%',
    borderTopLeftRadius: 0,
    paddingHorizontal: 13,
    paddingVertical: 11,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 24,
    },
    shadowOpacity: 0.06,
    shadowRadius: 70,
    elevation: 5,
  },
  messageText: {
    fontFamily: 'Sofia Pro',
    fontSize: hp('2%'),
    fontWeight: '300',
    lineHeight: hp('3%'),
    flexWrap: 'wrap',
  },
  myMessageText: {
    fontFamily: 'Sofia Pro',
    fontSize: hp('2%'),
    fontWeight: '300',
    lineHeight: hp('3%'),
    flexWrap: 'wrap',
    color: '#FFFFFF',
    paddingHorizontal: 11,
    paddingVertical: 10,
  },
  messageTime: {
    fontFamily: 'Comfortaa-Medium',
    fontSize: hp('1.2%'),
    lineHeight: hp('1.8%'),
    letterSpacing: 0.5,
  },
  inputContainer: {
    paddingHorizontal: wp('7.7%'),
    paddingVertical: hp('2%'),
    paddingBottom: hp('3%'),
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 66,
    borderWidth: 1.2,
    paddingLeft: 22,
    paddingRight: 12,
    paddingTop: 9,
    paddingBottom: 8.67,
    height: 62.67,
    minHeight: 62.67,
  },
  textInput: {
    flex: 1,
    fontFamily: 'Sofia Pro',
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 27.846,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    marginVertical: 0,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  sendButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    overflow: 'hidden',
    marginLeft: 0,
  },
  sendButtonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendIcon: {
    width: 40,
    height: 40,
  },
});

export default ConversationScreen;
