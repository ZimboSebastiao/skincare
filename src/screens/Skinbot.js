// src/screens/Skinbot.js
import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { sendMessageToChatGemini } from "../api/gemini.js";

export default function Skinbot() {
  const [messages, setMessages] = useState([]);

  const onSend = async (newMessages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );

    const userMessage = newMessages[0].text;

    try {
      const botResponse = await sendMessageToChatGemini(userMessage);

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

// Estilos (opcional)
const styles = StyleSheet.create({
  // Adicione seus estilos aqui, se necessário
});
