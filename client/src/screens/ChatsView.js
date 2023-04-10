import React, { useContext, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import {screens} from '../config/screens'
import {AuthenticatedUserContext} from '../context/AuthenticatedUser/AuthenticatedUserContext'
import { ChatsContext } from "../context/Chats/ChatsContext";
import ChatsViewHeader from "../components/ChatsViewHeader";
import NewChatButton from "../components/NewChatButton";
import Search from "../components/Search";
import Loading from "../components/Loading";
import ChatList from "../components/ChatList";
import { colors } from "../config/colors";

const ChatView = () => {
  const navigation = useNavigation();
  const { token } = useContext(AuthenticatedUserContext);
  const { chats, getAllChatsOfUser } = useContext(ChatsContext);
  const [filteredData, setFilteredData] = useState(chats);

  useFocusEffect(
    React.useCallback(() => {
      if (token)
      {
        const fetchData = async () => {
          await getAllChatsOfUser(setFilteredData);
        };
        fetchData();
      }
    }, [token])
  );

  const handleFilter = (filteredData) => {
    setFilteredData(filteredData);
  };

  const handlePress = () => {
    navigation.navigate(screens.CreateChat);
  };

  if (!chats) {
    return <Loading />;
  }

  return (
    <>
      <ChatsViewHeader canGoBack={false} canGoToSettings={true}/>
      <View style={styles.searchContainer}>
        <Search data={chats} filterParam="name" onFilter={handleFilter} />
      </View>
      <ChatList filteredData={filteredData} />
      <NewChatButton onPress={handlePress} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchContainer: {
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.text,
  },
});

export default ChatView;
