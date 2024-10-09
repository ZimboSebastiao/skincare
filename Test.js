import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, ActivityIndicator, View, TouchableOpacity } from "react-native";
import * as Font from "expo-font";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Provider as PaperProvider } from "react-native-paper";
import {
  BotMessageSquare,
  House,
  ClipboardList,
  Clock,
  ShoppingBag,
  UserRound,
} from "lucide-react-native";

import AnimatedIcon from "./src/components/AnimatedIcon";
import Onboarding from "./src/screens/Onboarding";
import Splash from "./src/screens/Splash";
import Home from "./src/screens/Home";
import Rotina from "./src/screens/Rotina";
import Produtos from "./src/screens/Produtos";
import Skinbot from "./src/screens/Skinbot";
import Perfil from "./src/screens/Perfil";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from "./src/utils/fonts";
import { ImageProvider } from "./src/context/ImageContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const Tab = createBottomTabNavigator();
  const [isLoading, setIsLoading] = useState(true);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);

  // Carregar fontes e Splash
  useEffect(() => {
    const loadResources = async () => {
      await Font.loadAsync({
        "Poppins-Regular": Poppins_400Regular,
        "Poppins-Medium": Poppins_500Medium,
        "Poppins-SemiBold": Poppins_600SemiBold,
      });
      setFontsLoaded(true);
    };

    loadResources();

    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 4200);

    return () => clearTimeout(timer);
  }, []);

  // Verificação do Onboarding
  useEffect(() => {
    const checkOnboarding = async () => {
      const value = await AsyncStorage.getItem("@has_seen_onboarding");
      setHasSeenOnboarding(value === "true");
      setIsLoading(false); // Atualiza o estado após a verificação
    };
    checkOnboarding();
  }, []);

  // Exibir o splash ou o indicador de carregamento enquanto as fontes são carregadas
  if (showSplash) {
    return <Splash />;
  }

  if (!fontsLoaded || isLoading) {
    return <ActivityIndicator size="large" />; // Mostra um carregando enquanto verifica
  }

  // Função para o botão central flutuante
  function CustomTabBarButton({ children, onPress }) {
    return (
      <TouchableOpacity
        style={{
          top: -30, // Faz o botão flutuar acima do TabBar
          justifyContent: "center",
          alignItems: "center",
          ...styles.shadow,
        }}
        onPress={onPress}
      >
        <View
          style={{
            width: 70,
            height: 70,
            borderRadius: 35,
            backgroundColor: "#ff944d",
          }}
        >
          {children}
        </View>
      </TouchableOpacity>
    );
  }
  

  // Retorna a navegação com as fontes carregadas
  return (
    <ImageProvider>
      <PaperProvider>
        <NavigationContainer style={styles.container}>
          {hasSeenOnboarding ? (
            <Tab.Navigator
              initialRouteName="Home"
              screenOptions={{
                tabBarStyle: {
                  backgroundColor: "#FFFFFF",
                  borderTopColor: "#FFFFFF",
                  height: "8%",
                },
                tabBarShowLabel: false, // Oculta os rótulos das tabs
              }}
            >
              <Tab.Screen
                name="Home"
                component={Home}
                options={{
                  headerShown: false,
                  tabBarIcon: ({ focused }) => (
                    <AnimatedIcon focused={focused} IconComponent={House} />
                  ),
                  tabBarActiveTintColor: "#ff80c3",
                  tabBarInactiveTintColor: "#b8bbbf",
                }}
              />
              <Tab.Screen
                name="Produtos"
                component={Produtos}
                options={{
                  headerShown: false,
                  tabBarIcon: ({ focused }) => (
                    <AnimatedIcon focused={focused} IconComponent={ShoppingBag} />
                  ),
                  tabBarActiveTintColor: "#ff80c3",
                  tabBarInactiveTintColor: "#b8bbbf",
                }}
              />
              <Tab.Screen
                name="CentralButton"
                component={Rotina} // Tela ao clicar no botão flutuante
                options={{
                  tabBarIcon: ({ focused }) => (
                    <MaterialCommunityIcons name="plus" size={40} color="grayff" />
                  ),
                  tabBarButton: (props) => <CustomTabBarButton {...props} />,
                }}
              />
              <Tab.Screen
                name="AI Health"
                component={Skinbot}
                options={{
                  headerShown: false,
                  tabBarIcon: ({ focused }) => (
                    <AnimatedIcon focused={focused} IconComponent={BotMessageSquare} />
                  ),
                  tabBarActiveTintColor: "#ff80c3",
                  tabBarInactiveTintColor: "gray",
                }}
              />
              <Tab.Screen
                name="Perfil"
                component={Perfil}
                options={{
                  headerShown: false,
                  tabBarIcon: ({ focused }) => (
                    <AnimatedIcon focused={focused} IconComponent={UserRound} />
                  ),
                  tabBarActiveTintColor: "#ff80c3",
                  tabBarInactiveTintColor: "gray",
                }}
              />
            </Tab.Navigator>
          ) : (
            <Onboarding />
          )}
        </NavigationContainer>
      </PaperProvider>
    </ImageProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gray",
    alignItems: "center",
    justifyContent: "center",
  },
  shadow: {
    shadowColor: "#7f5df0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
