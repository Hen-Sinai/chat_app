import React from "react";
import { StyleSheet, FlatList } from "react-native";
import { colors } from "../config/colors";
import ChatItem from "./ChatItem";
import Loading from "./Loading";

const ChatList = ({ filteredData }) => {
  const renderItem = ({ item }) => {
    return (
      <ChatItem chat={item}/>
    );
  };

  return (
    <>
      <FlatList
      data={filteredData}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      style={styles.container}
    />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default ChatList;
