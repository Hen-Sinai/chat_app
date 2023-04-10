import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../config/colors";

const NewChatButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress()} style={styles.button}>
      <MaterialIcons name="chat" size={24} color={colors.text} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 16,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.buttonText,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
});

export default NewChatButton;
