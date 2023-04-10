import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {screens} from '../config/screens'
import {colors} from '../config/colors'
import Toast from "react-native-toast-message";
import { AuthenticatedUserContext } from "../context/AuthenticatedUser/AuthenticatedUserContext";

const Login = () => {
  const navigation = useNavigation();
  const { login } = useContext(AuthenticatedUserContext);
  const [phoneNumber, setPhoneNumber] = useState("");
  const isButtonDisabled = phoneNumber.length !== 10;

  const handleLogin = async () => {
    await login(phoneNumber);
  };

  const handleSignUp = () => {
    navigation.navigate(screens.Signup);
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
      <TouchableOpacity
        style={[styles.button, isButtonDisabled && { opacity: 0.5 }]}
        onPress={handleLogin}
        disabled={isButtonDisabled}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Toast />
      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpButtonText}>Sign Up</Text>
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
    height: 50,
    marginVertical: 8,
    padding: 8,
    borderWidth: 1,
    color: colors.text,
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
  signUpButton: {
    marginTop: 16,
  },
  signUpButtonText: {
    color: colors.text,
    textDecorationLine: "underline",
  },
});

export default Login;
