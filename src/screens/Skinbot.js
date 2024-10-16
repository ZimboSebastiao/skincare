// src/screens/Skinbot.js
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import {
  GiftedChat,
  Bubble,
  InputToolbar,
  Send,
} from "react-native-gifted-chat";
import Icon from "react-native-vector-icons/Ionicons";
import { sendMessageToChatGemini } from "../api/gemini.js";

export default function Skinbot() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const onSend = async (newMessages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );

    const userMessage = newMessages[0].text;

    // Ativar o indicador de digitação
    setIsTyping(true);

    try {
      // Simular um atraso enquanto a mensagem é processada
      const botResponse = await sendMessageToChatGemini(userMessage);

      const botMessage = {
        _id: Math.random().toString(),
        text: botResponse,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "AI Health",
          avatar: require("../../assets/images/bot.png"),
        },
      };

      setTimeout(() => {
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, botMessage)
        );
        setIsTyping(false);
      }, 2000); // Simula 2 segundos de digitação
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
      setIsTyping(false); // Desativar o indicador em caso de erro
    }
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: "#F2F8FD", // Mensagem do bot
          },
          right: {
            backgroundColor: "#0076FD", // Mensagem do usuário
          },
        }}
      />
    );
  };

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View style={{ marginBottom: 11 }}>
          <Icon name="send" size={24} color="#0075FD" />
        </View>
      </Send>
    );
  };

  const renderInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          borderRadius: 16,
          backgroundColor: "#f2f8fc",
          marginHorizontal: 8,
          margin: 10,
          borderTopWidth: 0,
        }}
      />
    );
  };

  return (
    <View style={styles.chatContainer}>
      <Text style={styles.alertText}>
        Esta consulta de saúde com IA não é uma opinião médica. Consulte seu
        médico para um diagnóstico e prescrição precisos.
      </Text>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{ _id: 1 }}
        renderBubble={renderBubble}
        renderSend={renderSend}
        renderInputToolbar={renderInputToolbar}
        placeholder="Digite sua mensagem..."
        placeholderTextColor="#5e5f61"
        isTyping={isTyping}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  inputContainer: {
    backgroundColor: "transparent",
    overflow: "hidden",
    backgroundColor: "#ffff",
    margin: 25,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "gray",
  },
  sendContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 14,
  },
  sendText: {
    color: "#007aff",
    fontWeight: "bold",
  },
  errorMessage: {
    backgroundColor: "#ffdddd",
    color: "red",
  },
  alertText: {
    color: "#a6a2a2",
    padding: 20,
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
  },
});
