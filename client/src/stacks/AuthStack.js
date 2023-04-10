import React from "react";
import {screens} from '../config/screens'
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import Verification from "../screens/Verification";

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={screens.Login}>
      <Stack.Screen name={screens.Login} component={Login} />
      <Stack.Screen name={screens.Signup} component={Signup} />
      {/* <Stack.Screen name={screens.Verification} component={Verification} /> */}
    </Stack.Navigator>
  );
};

export default AuthStack;
