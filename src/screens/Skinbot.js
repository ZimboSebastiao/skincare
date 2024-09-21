// src/screens/Skinbot
import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { sendMessageToChatGPT } from "../api/chatgpt";

export default function Skinbot() {
  const [messages, setMessages] = useState([]);

  const onSend = async (newMessages = []) => {
    try {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, newMessages)
      );

      const userMessage = newMessages[0].text;
      const botResponse = await sendMessageToChatGPT(userMessage);

      const botMessage = {
        _id: Math.random().toString(),
        text: botResponse,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "SkinBot",
        },
      };

      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, botMessage)
      );
    } catch (error) {
      // Exibe uma mensagem para o usuário sobre o limite de requisições
      const errorMessage = {
        _id: Math.random().toString(),
        text: "Limite de requisições da API excedido. Tente novamente mais tarde.",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "SkinBot",
        },
      };
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, errorMessage)
      );
    }
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{ _id: 1 }}
    />
  );
}
