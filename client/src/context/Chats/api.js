import axios from "axios";
import { serverAddress } from "../../config/ipAddress";

export const getAllChatsOfUser = async (token) => {
  return await axios.get(`${serverAddress}/chats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
};

export const getChatById = async (token, chatId) => {
  return await axios.get(`${serverAddress}/chats/${chatId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
};

export const createChat = async (token, chatType, usersPhoneNumber, name) => {
  return await axios.post(
    `${serverAddress}/chats`,
    {
      chatType,
      usersPhoneNumber,
      name,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}


export const sendMessage = async (token, chatId, content) => {
  return await axios.post(
    `${serverAddress}/messages/${chatId}`,
    {
      content,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
