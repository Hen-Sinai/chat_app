import React, { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import { colors } from "../config/colors";
import { AuthenticatedUserContext } from "../context/AuthenticatedUser/AuthenticatedUserContext";
import io from "socket.io-client";

const Message = ({ message, senderName }) => {
  const { user } = useContext(AuthenticatedUserContext);
  return (
    <View
      style={user.name === senderName ? styles.containerMine : styles.container}
    >
      {user.name !== senderName ? (
        <Text style={styles.sender}> {senderName} </Text>
      ) : null}
      <Text style={user.name === senderName ? styles.textMine : styles.text}>
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.buttonText,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  containerMine: {
    backgroundColor: colors.text,
    padding: 10,
    borderRadius: 10,
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  text: {
    color: colors.black,
    fontSize: 16,
  },
  textMine: {
    color: colors.black,
    fontSize: 16,
    alignSelf: "flex-end",
  },
  sender: {
    fontWeight: "bold",
    color: colors.text,
  },
});

export default Message;
