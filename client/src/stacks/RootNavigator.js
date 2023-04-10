import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {colors} from '../config/colors'
import { AuthenticatedUserContext } from "../context/AuthenticatedUser/AuthenticatedUserContext";
import AuthStack from "./AuthStack";
import ChatStack from "./ChatStack";
import { StyleSheet, SafeAreaView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const RootNavigator = () => {
  const { user } = useContext(AuthenticatedUserContext);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
          {user ? <ChatStack /> : <AuthStack />}
        </SafeAreaView>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
});

export default RootNavigator;
