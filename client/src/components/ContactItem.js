import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { colors } from "../config/colors";

const ContactItem = ({ contact, onPress }) => {
  const [backgroundColor, setBackgroundColor] = useState(colors.background);

  const handlePress = () => {
    if (backgroundColor === colors.background) setBackgroundColor(colors.buttonText);
    else setBackgroundColor(colors.background);
    onPress(contact);
  };
  return (
    <TouchableOpacity onPress={() => handlePress()}>
      <View style={[styles.itemContainer, { backgroundColor }]}>
        <Image
          source={{ uri: contact.profilePicture }}
          style={styles.profilePicture}
        />
        <View style={styles.itemDetails}>
          <View style={styles.nameAndTime}>
            <Text style={styles.name}>{contact.name}</Text>
          </View>
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
    color: colors.text
  },
});

export default ContactItem;
