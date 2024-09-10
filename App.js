import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Splash from "./src/screens/Splash";
import Home from "./src/screens/Home";
import Rotina from "./src/screens/Rotina";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const Tab = createBottomTabNavigator();

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
    <NavigationContainer style={styles.container}>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Rotina" component={Rotina} />
      </Tab.Navigator>
    </NavigationContainer>
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
