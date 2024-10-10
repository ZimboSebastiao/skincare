import React, { useState, useEffect, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, ActivityIndicator, View } from "react-native";
import * as Font from "expo-font";
import { Icon, Button } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Provider as PaperProvider } from "react-native-paper";
import {
  BotMessageSquare,
  House,
  ClipboardList,
  CirclePlus,
  UserRound,
  Clock,
  ShoppingBag,
} from "lucide-react-native";
import { Ionicons } from "@expo/vector-icons";

import AnimatedIcon from "./src/components/AnimatedIcon";
import Onboarding from "./src/screens/Onboarding";
import Splash from "./src/screens/Splash";
import Home from "./src/screens/Home";
import Rotina from "./src/screens/Rotina";
import Nova from "./src/screens/Produtos";
import Skinbot from "./src/screens/Skinbot";
import Perfil from "./src/screens/Perfil";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from "./src/utils/fonts";
import { ImageProvider } from "./src/context/ImageContext";
import FormPage1 from "./src/screens/FormPage1";
import FormPage2 from "./src/screens/FormPage2";
import FormPage3 from "./src/screens/FormPage3";
import FormPage4 from "./src/screens/FormPage4";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Diario from "./src/screens/Diario";
import Noite from "./src/screens/Noite";
import Manha from "./src/screens/Manha";
import Produtos from "./src/screens/Produtos";
import Scan from "./src/screens/Scan";
import { navigationRef, navigate } from "./src/navigationRef";
import Resultado from "./src/screens/Resultado";

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
  // Função para navegar para a tela "Rotina"
  const navigateToRotina = () => {
    navigationRef.current?.navigate("Rotina");
  };

  // Retorna a navegação com as fontes carregadas
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#fff",
      }}
    >
      <View
        ref={navigationRef}
        style={{
          position: "absolute",
          padding: 5,
          alignSelf: "center",
          backgroundColor: "#fff",
          width: 70,
          height: 70,
          borderRadius: 35,
          bottom: 25,
          zIndex: 2,
        }}
      >
        <Button
          icon={{
            name: "plus",
            type: "feather",
            color: "#fff",
            style: { marginRight: 0 },
          }}
          onPress={navigateToRotina}
          buttonStyle={{
            backgroundColor: "#ff80c3",
            width: 60,
            height: 60,
            borderRadius: 30,
          }}
          containerViewStyle={{ alignSelf: "center" }}
        />
      </View>
      <ImageProvider>
        <PaperProvider>
          <NavigationContainer ref={navigationRef}>
            {hasSeenOnboarding ? (
              <Tab.Navigator
                initialRouteName="Home"
                screenOptions={{
                  tabBarStyle: {
                    backgroundColor: "#121212",
                    borderTopColor: "#121212",
                    height: "8%",
                  },
                }}
              >
                <Tab.Screen
                  name="Início"
                  component={Home}
                  options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                      <AnimatedIcon focused={focused} IconComponent={House} />
                    ),
                    tabBarLabelStyle: { fontSize: 11 },
                    tabBarActiveTintColor: "#ff80c3",
                    tabBarInactiveTintColor: "#ffff",
                  }}
                />
                <Tab.Screen
                  name="Produtos"
                  component={Produtos}
                  options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                      <AnimatedIcon
                        focused={focused}
                        IconComponent={ShoppingBag}
                      />
                    ),
                    tabBarLabelStyle: { fontSize: 11 },
                    tabBarActiveTintColor: "#ff80c3",
                    tabBarInactiveTintColor: "#ffff",
                  }}
                />
                <Tab.Screen
                  name="Rotina"
                  component={Rotina}
                  options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                      <AnimatedIcon focused={focused} IconComponent={Clock} />
                    ),
                    tabBarLabelStyle: { fontSize: 11 },
                    tabBarActiveTintColor: "#ff80c3",
                    tabBarInactiveTintColor: "#ffff",
                    // tabBarStyle: { display: "none" },
                  }}
                />

                <Tab.Screen
                  name="AI Health"
                  component={Skinbot}
                  options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                      <AnimatedIcon
                        focused={focused}
                        IconComponent={BotMessageSquare}
                      />
                    ),
                    tabBarLabelStyle: { fontSize: 11 },
                    tabBarActiveTintColor: "#ff80c3",
                    tabBarInactiveTintColor: "#ffff",
                    // tabBarStyle: { display: "none" },
                  }}
                />
                <Tab.Screen
                  name="Perfil"
                  component={Perfil}
                  options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                      <AnimatedIcon
                        focused={focused}
                        IconComponent={UserRound}
                      />
                    ),
                    tabBarLabelStyle: { fontSize: 11 },
                    tabBarActiveTintColor: "#ff80c3",
                    tabBarInactiveTintColor: "#ffff",
                  }}
                />
                <Tab.Screen
                  name="Diario"
                  component={Diario}
                  options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                      <MaterialCommunityIcons
                        name="account"
                        color={focused ? "#ff80c3" : "#ffff"}
                      />
                    ),
                    tabBarLabelStyle: { fontSize: 13.4 },
                    tabBarActiveTintColor: "#ff80c3",
                    tabBarInactiveTintColor: "#ffff",
                    tabBarButton: () => null,
                    // tabBarStyle: { display: "none" },
                  }}
                />
                <Tab.Screen
                  name="Noite"
                  component={Noite}
                  options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                      <MaterialCommunityIcons
                        name="account"
                        color={focused ? "#ff80c3" : "#ffff"}
                      />
                    ),
                    tabBarLabelStyle: { fontSize: 13.4 },
                    tabBarActiveTintColor: "#ff80c3",
                    tabBarInactiveTintColor: "#ffff",
                    tabBarButton: () => null,
                    // tabBarStyle: { display: "none" },
                  }}
                />
                <Tab.Screen
                  name="Manha"
                  component={Manha}
                  options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                      <MaterialCommunityIcons
                        name="account"
                        color={focused ? "#ff80c3" : "#ffff"}
                      />
                    ),
                    tabBarLabelStyle: { fontSize: 13.4 },
                    tabBarActiveTintColor: "#ff80c3",
                    tabBarInactiveTintColor: "#ffff",
                    tabBarButton: () => null,
                    // tabBarStyle: { display: "none" },
                  }}
                />
                <Tab.Screen
                  name="Scan"
                  component={Scan}
                  options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                      <MaterialCommunityIcons
                        name="account"
                        color={focused ? "#ff80c3" : "#ffff"}
                      />
                    ),
                    tabBarLabelStyle: { fontSize: 13.4 },
                    tabBarActiveTintColor: "#ff80c3",
                    tabBarInactiveTintColor: "#ffff",
                    tabBarButton: () => null,
                    // tabBarStyle: { display: "none" },
                  }}
                />
                <Tab.Screen
                  name="Resultado"
                  component={Resultado}
                  options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                      <MaterialCommunityIcons
                        name="account"
                        color={focused ? "#ff80c3" : "#ffff"}
                      />
                    ),
                    tabBarLabelStyle: { fontSize: 13.4 },
                    tabBarActiveTintColor: "#ff80c3",
                    tabBarInactiveTintColor: "#ffff",
                    tabBarButton: () => null,
                    // tabBarStyle: { display: "none" },
                  }}
                />
              </Tab.Navigator>
            ) : (
              <Onboarding />
            )}
          </NavigationContainer>
        </PaperProvider>
      </ImageProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  // tabBar: {
  //   backgroundColor: '#6200ee', // Cor de fundo da Tab Bar
  //   height: 70, // Altura da Tab Bar
  //   borderTopWidth: 0, // Remover borda superior
  //   elevation: 5, // Sombra
  // },
  // fab: {
  //   position: 'absolute',
  //   bottom: 30, // Posiciona o FAB acima da Tab Bar
  //   left: '50%', // Centraliza horizontalmente
  //   marginLeft: -28, // Metade da largura do FAB para centralizá-lo
  //   backgroundColor: '#ff4081', // Cor do FAB
  // },
});
