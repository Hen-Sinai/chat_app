import React, { useContext } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { screens } from "../config/screens";
import { colors } from "../config/colors";
import { ChatsContext } from "../context/Chats/ChatsContext";

const ChatItem = ({ chat }) => {
  const navigation = useNavigation();
  const { setChatId } = useContext(ChatsContext);

  const getMinutes = (givenTime) => {
    const minutes = givenTime.getMinutes();
    if (minutes < 10) {
      return `0${minutes}`;
    }
    return minutes;
  };

  const editDate = (date) => {
    const givenTime = new Date(date);
    const yesterday = new Date(Date.now() - 86400000);
    const today = new Date();

    if (givenTime.toDateString() === today.toDateString()) {
      return `${givenTime.getHours()}:${getMinutes(givenTime)}`;
    } else if (givenTime.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return `${givenTime.getMonth()}`;
    }
  };

  const handlePress = () => {
    setChatId(chat.id);
    navigation.navigate(screens.Chat);
  };

  return (
    <TouchableOpacity onPress={() => handlePress()}>
      <View style={styles.itemContainer}>
        <Image
          source={{ uri: chat.profilePicture }}
          style={styles.profilePicture}
        />
        <View style={styles.itemDetails}>
          <View style={styles.nameAndTime}>
            <Text style={styles.name}>{chat.name}</Text>
            <Text style={styles.time}>{editDate(chat.updatedAt)}</Text>
          </View>
          <Text style={styles.message}>{chat.Messages[0]?.content}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.text,
    backgroundColor: colors.background,
  },
  profilePicture: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  itemDetails: {
    flex: 1,
  },
  nameAndTime: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
  },
  time: {
    fontSize: 18,
    color: colors.text,
  },
  message: {
    fontSize: 14,
    color: colors.text,
    textAlign: "left",
  },
});

export default ChatItem;
