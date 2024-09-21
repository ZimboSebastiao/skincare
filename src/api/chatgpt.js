// src/api/chatgpt.js
import axios from "axios";
import { OPENAI_API_KEY } from "@env";

// Função de espera
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const sendMessageToChatGPT = async (message, retries = 3) => {
  while (retries > 0) {
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "Você é um assistente de skincare. Dê dicas de produtos de skincare, seu modo de uso, benefícios, desvantagens e vantagens, nada mais.",
            },
            {
              role: "user",
              content: message,
            },
          ],
          max_tokens: 150,
          temperature: 0.5,
        },
        {
          headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Log da resposta da API para depuração
      console.log("Resposta da API:", response.data);

      if (response.data.choices && response.data.choices.length > 0) {
        return response.data.choices[0].message.content.trim();
      } else {
        throw new Error("Resposta inválida da API.");
      }
    } catch (error) {
      if (error.response && error.response.status === 429) {
        retries--;
        const waitTime = 2000 * (3 - retries);
        console.warn(
          `Limite de requisições excedido. Tentando novamente em ${
            waitTime / 1000
          } segundos...`
        );
        await delay(waitTime);
      } else if (error.response && error.response.status === 403) {
        console.error(
          "Cota insuficiente. Verifique seu plano e detalhes de faturamento."
        );
        return "Cota insuficiente. Verifique seu plano e detalhes de faturamento.";
      } else {
        console.error(
          "Erro ao processar a mensagem: ",
          error.response ? error.response.data : error.message
        );
        throw new Error("Erro ao processar a mensagem ou problema de limite.");
      }
    }
  }

  return "Limite de tentativas atingido. Por favor, tente novamente mais tarde.";
};
