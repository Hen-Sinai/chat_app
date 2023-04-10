import React, { useState, useRef } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { colors } from "../config/colors";
import { screens } from "../config/screens";

const Verification = ({phoneNumber}) => {
  const navigation = useNavigation();
  const [code, setCode] = useState();
  const [inputCode, setInputCode] = useState("");
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);
  const input4Ref = useRef(null);
  const isButtonDisabled = inputCode.length !== 4;
  const client = twilio(process.env.ACCOUNT_ID, process.env.AUTH_TOKEN);

  useFocusEffect(
    React.useCallback(() => {
      const code = Math.floor(Math.random() * 9000) + 1000;
      const message = `Your verification code is ${code}`;

      client.messages
        .create({
          body: message,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: phoneNumber,
        })
        .then((message) => console.log(message.sid))
        .catch((error) => console.log(error));
      
      setCode(code);
    }, [])
  );

  const handleCancel = () => {
    navigation.navigate(screens.Signup);
  };

  const handleCodeChange = (value, index) => {
    const newCode =
      inputCode.slice(0, index) + value + inputCode.slice(index + 1);

    if (value && index < 3) {
      switch (index) {
        case 0:
          input2Ref.current.focus();
          break;
        case 1:
          input3Ref.current.focus();
          break;
        case 2:
          input4Ref.current.focus();
          break;
        default:
          break;
      }
    }

    setInputCode(newCode);
  };

  const handleVerify = () => {
    if (code == inputCode) {
      navigation.navigate(screens.ChatView);
    } else {
      console.log("Unmatch");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Enter Verification Code</Text>
      <View style={styles.inputContainer}>
        <TextInput
          ref={input1Ref}
          style={styles.input}
          value={inputCode[0]}
          onChangeText={(value) => handleCodeChange(value, 0)}
          keyboardType="numeric"
          maxLength={1}
        />
        <TextInput
          ref={input2Ref}
          style={styles.input}
          value={inputCode[1]}
          onChangeText={(value) => handleCodeChange(value, 1)}
          keyboardType="numeric"
          maxLength={1}
        />
        <TextInput
          ref={input3Ref}
          style={styles.input}
          value={inputCode[2]}
          onChangeText={(value) => handleCodeChange(value, 2)}
          keyboardType="numeric"
          maxLength={1}
        />
        <TextInput
          ref={input4Ref}
          style={styles.input}
          value={inputCode[3]}
          onChangeText={(value) => handleCodeChange(value, 3)}
          keyboardType="numeric"
          maxLength={1}
        />
      </View>
      <TouchableOpacity
        style={[styles.button, isButtonDisabled && { opacity: 0.5 }]}
        onPress={() => handleVerify()}
        disabled={isButtonDisabled}
      >
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
      <Toast />
      <TouchableOpacity style={styles.cancelButton}>
        <Text style={styles.cancelButtonText} onPress={() => handleCancel()}>
          Cancel
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 200,
  },
  input: {
    width: 50,
    height: 50,
    borderRadius: 5,
    textAlign: "center",
    fontSize: 24,
    backgroundColor: "#F4F4F4",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
  cancelButton: {
    marginTop: 16,
  },
  cancelButtonText: {
    color: colors.text,
    textDecorationLine: "underline",
  },
});

export default Verification;
