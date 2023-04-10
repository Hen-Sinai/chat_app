import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AuthenticatedUserContext } from "../context/AuthenticatedUser/AuthenticatedUserContext";
import Toast from "react-native-toast-message";
import ChatsViewHeader from "../components/ChatsViewHeader";

const UserInfo = () => {
  const { addUserInfo } = useContext(
    AuthenticatedUserContext
  );
  const [about, setAbout] = useState("");

  const handleAddUserInfo = async () => {
    await addUserInfo(about);
    setAbout('');
  };


  return (
    <>
      <ChatsViewHeader canGoBack={true} canGoToSettings={false}/>
      <View style={styles.container}>
        <Text style={styles.title}>Let Us Know You</Text>
        <TextInput
          value={about}
          multiline
          style={styles.aboutInput}
          onChangeText={(text) => setAbout(text)}
          placeholder="Tell Us About You"
        />
        <TouchableOpacity style={styles.button} onPress={() => handleAddUserInfo()}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
        <Toast />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    width: "80%",
    height: 40,
    marginVertical: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 4,
  },
  aboutInput: {
    width: "80%",
    height: 80,
    marginVertical: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 4,
  },
  button: {
    backgroundColor: "#03A17F",
    width: "80%",
    height: 40,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default UserInfo;
