// src/screens/Skinbot.js
import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
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


const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    backgroundColor: 'red', // Cor de fundo do chat
  },
  messageContainer: {
    backgroundColor: 'red', // Cor de fundo das mensagens
    borderRadius: 10,
    padding: 10,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  userMessage: {
    backgroundColor: 'red', // Cor de fundo das mensagens do usuário
  },
  botMessage: {
    backgroundColor: '#e0e0e0', // Cor de fundo das mensagens do bot
  },
  inputContainer: {
    backgroundColor: '#fff', // Cor de fundo do input
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  sendButton: {
    backgroundColor: '#007aff', // Cor do botão de enviar
  },
  errorMessage: {
    backgroundColor: '#ffdddd', // Cor de fundo para mensagens de erro
    color: 'red',
  },
});
