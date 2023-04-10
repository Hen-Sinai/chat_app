import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ChatView from "../screens/ChatsView";
import CreateChat from "../screens/CreateChat";
import UserInfo from "../screens/UserInfo";
import Chat from "../screens/Chat";
import ChatsProvider from "../context/Chats/ChatsContext";
const Stack = createStackNavigator();

const ChatStack = () => {
  return (
    <ChatsProvider>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={"ChatView"}
      >
        <Stack.Screen name="UserInfo" component={UserInfo} />
        <Stack.Screen name="ChatView" component={ChatView} />
        <Stack.Screen name="CreateChat" component={CreateChat} />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
    </ChatsProvider>
  );
};

export default ChatStack;
