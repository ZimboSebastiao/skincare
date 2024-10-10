import React from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Pressable,
} from "react-native";

const FormPage2 = ({ navigation }) => {
  const handleNext = () => {
    navigation.navigate("FormPage3");
  };

  const handleSkip = () => {
    navigation.navigate("Início");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Formulário 2</Text>
      <TextInput placeholder="Digite algo" style={styles.input} />
      <View style={styles.buttonContainer}>
        <Pressable style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.buttonText}>Pular</Text>
        </Pressable>
        <Button title="Próximo" onPress={handleNext} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 20 },
  buttonContainer: { flexDirection: "row", justifyContent: "space-between" },
  skipButton: { padding: 10, backgroundColor: "#ff80c3", borderRadius: 5 },
  buttonText: { color: "#fff", fontWeight: "bold" },
});

export default FormPage2;
