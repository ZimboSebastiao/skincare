import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

export default function Resultado({ route }) {
  const { result } = route.params;

  console.log("RESULTADO: ", result);

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <View style={styles.viewImagens}>
        <Image
          source={{ uri: `data:image/png;base64,${result.original_image}` }}
          style={styles.image}
        />
        <Image
          source={{ uri: `data:image/png;base64,${result.processed_image}` }}
          style={styles.image}
        />
      </View>

      <Text style={styles.text}>
        Tipo de Pele: {result.analysis_result.skinType}
      </Text>
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
    width: 155,
    height: 155,
    borderRadius: 10,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  viewImagens: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 4,
    backgroundColor: "#ff80c3",
    borderColor: "#ff80c3",
    marginVertical: 30,
    padding: 10,
    elevation: 2,
  },
});
