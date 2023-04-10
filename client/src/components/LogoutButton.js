import React, {useContext} from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors } from "../config/colors";
import { AuthenticatedUserContext } from "../context/AuthenticatedUser/AuthenticatedUserContext";

const LogoutButton = () => {
  const { logout } = useContext(
    AuthenticatedUserContext
  );

  const Logout = async () => {
    await logout();
  };

  return (
    <TouchableOpacity onPress={() => Logout()} style={styles.button}>
      <Feather name="log-out" size={24} color={colors.text} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginLeft: 16,
  },
});

export default LogoutButton;
