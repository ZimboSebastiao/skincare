import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Splash from "./src/screens/Splash";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  // useEffect para controlar o tempo de exibição da Splash Screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 4300);

    // Limpando o timer caso o componente seja desmontado
    return () => clearTimeout(timer);
  }, []);

  // Exibir a tela de splash enquanto showSplash for true
  if (showSplash) {
    return <Splash />;
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
