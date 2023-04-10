import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import {screens} from '../config/screens'
import { colors } from "../config/colors";
import { AuthenticatedUserContext } from "../context/AuthenticatedUser/AuthenticatedUserContext";

const Signup = () => {
  const navigation = useNavigation();
  const { signup } = useContext(
    AuthenticatedUserContext
  );
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const isButtonDisabled = phoneNumber.length !== 10 || name.length === 0;

  const handleLogin = () => {
    navigation.navigate(screens.Login);
  };

  const handleSignup = async () => {
    await signup(phoneNumber, name);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <TextInput
        style={styles.input}
        placeholder="Phone Number (format: xxxxxxxxxx)"
        placeholderTextColor={colors.text}
        keyboardType="phone-pad"
        autoCapitalize="none"
        onChangeText={(text) => setPhoneNumber(text)}
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setName(text)}
        placeholder="Username"
        placeholderTextColor={colors.text}
      />
      <TouchableOpacity
        style={[styles.button, isButtonDisabled && { opacity: 0.5 }]}
        onPress={handleSignup}
        disabled={isButtonDisabled}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <Toast />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 16,
    color: colors.text,
  },
  input: {
    width: "80%",
    height: 40,
    marginVertical: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: colors.text,
    borderRadius: 4,
  },
  button: {
    backgroundColor: colors.text,
    width: "80%",
    height: 40,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: colors.buttonText,
    fontSize: 16,
    fontWeight: "bold",
  },
  loginButton: {
    marginTop: 16,
  },
  loginButtonText: {
    color: colors.text,
    textDecorationLine: "underline",
  },
});

export default Signup;
