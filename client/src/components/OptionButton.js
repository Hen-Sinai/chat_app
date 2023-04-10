import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../config/colors";
import {screens} from '../config/screens'

const OptionButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={()=>{navigation.navigate(screens.UserInfo)}} style={styles.button}>
      <Feather name="settings" size={24} color={colors.text} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginLeft: 16,
  },
});

export default OptionButton;
