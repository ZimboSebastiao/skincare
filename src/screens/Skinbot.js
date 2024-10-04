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

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#89b0e0', // Mensagem do bot
          },
          right: {
            backgroundColor: '#cbafed', // Mensagem do usuário
          },
        }}
      />
    );
  };

  const renderInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={styles.inputContainer}
      />
    );
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{ _id: 1 }}
      renderBubble={renderBubble}
      renderInputToolbar={renderInputToolbar}
    />
  );
}

const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    backgroundColor: 'red', // Cor de fundo do chat
  },
  inputContainer: {
    backgroundColor: '#ffff', // Cor de fundo do input
    borderTopWidth: 1,
    borderTopColor: '#F3EBFD',
    margin: 45,
    padding: 10,

  },
  errorMessage: {
    backgroundColor: '#ffdddd', // Cor de fundo para mensagens de erro
    color: 'red',
  },
});
