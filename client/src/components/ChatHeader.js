import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { colors } from '../config/colors';
import GoBackButton from './GoBackButton';

const ChatHeader = ({chatName, profilePicture}) => {
  return (
    <View style={styles.container}>
      <GoBackButton />
      <Image source={{ uri: profilePicture}} style={styles.avatar} />
      <Text style={styles.text}>{chatName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.text,
    // marginTop: 24,
  },
  text: {
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 8,
    color: colors.text,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default ChatHeader;
