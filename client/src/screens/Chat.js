import React, { useState, useContext, useEffect, useRef } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import uuid from "react-native-uuid";
import { serverAddress } from "../config/ipAddress";
import { colors } from "../config/colors";
import { AuthenticatedUserContext } from "../context/AuthenticatedUser/AuthenticatedUserContext";
import { ChatsContext } from "../context/Chats/ChatsContext";
import Message from "../components/Message";
import ChatHeader from "../components/ChatHeader";
import Loading from "../components/Loading";
import io from "socket.io-client";
import { ContactTypes } from "expo-contacts";

const Chat = () => {
  const { user } = useContext(AuthenticatedUserContext);
  const { messages, setMessages, currentChat, getChatData, sendMessage } =
    useContext(ChatsContext);
  const [inputValue, setInputValue] = useState("");
  const [socket, setSocket] = useState(null);
  const flatListRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io(serverAddress); // Replace with your server's URL
    setSocket(socketRef.current);

    // socket.emit("join_room", currentChat.id);
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    if (currentChat && socket) {
      socket.emit("join_room", currentChat.id);
    }
  }, [currentChat]);

  useEffect(() => {
    if (socket) {
      socket.on("rec_message", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }
  }, [socket]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        await getChatData();
      };
      fetchData();
    }, [])
  );

  const handleChange = (value) => {
    setInputValue(value);
  };

  const handleSubmit = async () => {
    await sendMessage(inputValue);
    if (inputValue.trim() !== "") {
      const newMessage = {
        id: uuid.v4(),
        content: inputValue,
        User: {
          name: user.name,
        },
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      socket.emit("send_message", currentChat.id, newMessage); // Emit message to server

      setInputValue("");
    }
  };

  if (!currentChat || !messages) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <ChatHeader
        chatName={currentChat.name}
        profilePicture={currentChat.profilePicture}
      />
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Message message={item.content} senderName={item.User.name} />
        )}
        contentContainerStyle={styles.messagesContainer}
        onContentSizeChange={() => {
          console.log(messages);
          messages.length !== 0
            ? flatListRef.current.scrollToIndex({ index: messages.length - 1 })
            : null
        }
        }
        onScrollToIndexFailed={(error) => {
          flatListRef.current.scrollToOffset({
            offset: error.averageItemLength * error.index,
            animated: true,
          });
          setTimeout(() => {
            if (messages.length !== 0 && flatListRef.current !== null) {
              flatListRef.current.scrollToIndex({
                index: error.index,
                animated: true,
              });
            }
          }, 100);
        }}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputValue}
          onChangeText={handleChange}
          onSubmitEditing={handleSubmit}
          placeholder="Type a message"
          placeholderTextColor="#999"
          multiline
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.sendButton}>
          <MaterialIcons name="send" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  messagesContainer: {
    backgroundColor: colors.background,
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  inputContainer: {
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.text,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },
  sendButton: {
    marginLeft: 8,
  },
});

export default Chat;
