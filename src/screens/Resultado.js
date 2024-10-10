import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

export default function Resultado({ route }) {
  const { result } = route.params;

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={styles.title}>Resultado da Análise de Pele</Text>

      {/* Exibir a imagem original tirada */}
      <Text style={styles.text}>Imagem Original:</Text>
      <Image
        source={{ uri: `data:image/png;base64,${result.original_image}` }}
        style={styles.image}
      />

      {/* Exibir a imagem processada */}
      <Text style={styles.text}>Imagem Processada:</Text>
      <Image
        source={{ uri: `data:image/png;base64,${result.processed_image}` }}
        style={styles.image}
      />

      <Text style={styles.text}>
        Tipo de Pele: {result.analysis_result.skinType}
      </Text>

      {/* Exibir outras informações, como problemas detectados, etc. */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
});
