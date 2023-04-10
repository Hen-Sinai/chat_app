import React, { createContext, useState, useContext } from "react";
import { AuthenticatedUserContext } from "../AuthenticatedUser/AuthenticatedUserContext";
import { handleServerError } from "../../config/toastConfig";
import * as api from "./api";

export const ChatsContext = createContext([]);

const ChatsProvider = ({ children }) => {
  const { user, token } = useContext(AuthenticatedUserContext);
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [chatId, setChatId] = useState(null);

  const mainpulateChat = (chats) => {
    const chatsData = chats.map((chat) => {
      const currChat = chat.Chat;
      currChat.id = chat.ChatId;
      if (currChat.chatType === "private") {
        currChat.name = currChat.Users[0].name;
        currChat.profilePicture = currChat.Users[0].profilePicture;
      }
      return currChat;
    });
    return chatsData;
  };

  const getAllChatsOfUser = async (setFilteredData) => {
    try {
      const response = await api.getAllChatsOfUser(token);
      const manipulated = mainpulateChat(response.data.chats);
      // console.log('manipulated', manipulated)
      setChats(manipulated);
      setFilteredData(manipulated);
    } catch (error) {
      console.log(error);
      handleServerError(error.response.status);
    }
  };

  const checkIfPrivateChatExist = (chatUsers) => {
    for (let i = 0; i < chats.length; i++) {
      const chat = chats[i];
      if (chat.Users[0].name === chatUsers[0].name) {
        setChatId(chat.id);
        return true;
      }
    }
    return false;
  };

  const createChat = async (name, chatUsers) => {
    try {
      let chatType;
      chatUsers.length === 1 ? (chatType = "private") : (chatType = "group");
      const usersPhoneNumber = chatUsers.map((user) => {
        return user.phoneNumber;
      });
      if (chatType === "private" && checkIfPrivateChatExist(chatUsers)) {
        return;
      }
      usersPhoneNumber.push(user.phoneNumber);
      const response = await api.createChat(
        token,
        chatType,
        usersPhoneNumber,
        name
      );
      const chat = response.data;
      if (chatType === "private") {
        chat.name = chatUsers[0].name;
        chat.profilePicture = chatUsers.profilePicture;
      }
      // console.log(chat)
      setChatId(chat.id);
      setChats([...chats, chat]);
    } catch (error) {
      console.log(error);
      handleServerError(error.response.status);
    }
  };

  const getChatData = async () => {
    try {
      const response = await api.getChatById(token, chatId);
      const currChat = response.data.chat;
      if (currChat.chatType === "private") {
        currChat.name = currChat.Users[0].name;
        currChat.profilePicture = currChat.Users[0].profilePicture;
      }
      setCurrentChat(currChat);
      setMessages(currChat.Messages);
    } catch (error) {
      console.log(error);
      handleServerError(error.response.status);
    }
  };

  const sendMessage = async (content) => {
    try {
      await api.sendMessage(token, chatId, content);
    } catch (error) {
      console.log(error);
      handleServerError(error.response.status);
    }
  };

  return (
    <ChatsContext.Provider
      value={{
        chats,
        setChats,
        createChat,
        getAllChatsOfUser,
        chatId,
        setChatId,
        getChatData,
        currentChat,
        sendMessage,
        messages,
        setMessages,
      }}
    >
      {children}
    </ChatsContext.Provider>
  );
};

export default ChatsProvider;
