// src/screens/Skinbot.js
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { GiftedChat, Bubble, InputToolbar, Send } from "react-native-gifted-chat";
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
            backgroundColor: '#B0EDFF', // Mensagem do bot
          },
          right: {
            backgroundColor: '#cbafed', // Mensagem do usuário
          },
        }}
      />
    );
  };

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View style={styles.sendContainer}>
          <Text style={styles.sendText}>Enviar</Text>
        </View>
      </Send>
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
    
    <View style={styles.chatContainer}>
      <Text style={styles.alertText}>
        Esta consulta de saúde com IA não é uma opinião médica. Consulte seu médico para um diagnóstico e prescrição precisos.
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
      />
    </View>
  );
}

const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    backgroundColor: 'white', 
  },
  inputContainer: {
    backgroundColor: 'transparent',
    overflow: "hidden",  
    backgroundColor: '#ffff',   
    margin: 25, 
    borderRadius: 10, 
    borderWidth: 1,
    borderColor: "gray"
  
  },
  sendContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 14,
  },
  sendText: {
    color: '#007aff', 
    fontWeight: 'bold',
  },
  errorMessage: {
    backgroundColor: '#ffdddd', 
    color: 'red',
  },
  alertText: {
    color: '#3b393a',
    fontWeight: "bold",
    padding: 20,
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20
  },
});
