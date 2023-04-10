import React, { useState, useContext } from "react";
import { StyleSheet, View, TextInput, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { screens } from "../config/screens";
import { colors } from "../config/colors";
import { AuthenticatedUserContext } from "../context/AuthenticatedUser/AuthenticatedUserContext";
import { ChatsContext } from "../context/Chats/ChatsContext";
import ChatsViewHeader from "../components/ChatsViewHeader";
import ContactsList from "../components/ContactsList";
import NewChatButton from "../components/NewChatButton";

const ChatView = () => {
  const navigation = useNavigation();
  const { user } = useContext(AuthenticatedUserContext);
  const { createChat } = useContext(ChatsContext);
  const [chatUsers, setChatUsers] = useState([]);
  const [name, setName] = useState('');

  const handlePress = async () => {
    await createChat(name, chatUsers);
    navigation.replace(screens.Chat);
  };

  return (
    <>
      <ChatsViewHeader canGoBack={true} canGoToSettings={false}/>
      {chatUsers.length > 1 ? (
        <View style={styles.container}>
          <View style={styles.rowContainer}>
            <Image
              source={{ uri: user.profilePicture }}
              style={styles.profilePicture}
            />
            <TextInput
              onChangeText={(text) => setName(text)}
              style={styles.input}
              placeholder={`Name the group chat`}
              placeholderTextColor={colors.text}
            />
          </View>
        </View>
      ) : null}
      <ContactsList chatUsers={chatUsers} setChatUsers={setChatUsers} />
      {chatUsers.length === 1 || (chatUsers.length > 1 && name.length !== 0) ? 
      <NewChatButton onPress={handlePress} /> : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 8,
    borderColor: colors.text,
    paddingVertical: 8,
    paddingHorizontal: 16,
    margin: 16,
    backgroundColor: colors.background,
  },
  profilePicture: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  input: {
    color: colors.text,
    flex: 1,
    height: 60,
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    fontSize: 16
  },
});

export default ChatView;
