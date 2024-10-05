import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, ActivityIndicator } from "react-native";
import * as Font from "expo-font";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  BotMessageSquare,
  House,
  ClipboardList,
  CirclePlus,
  UserRound,
  Clock,
} from "lucide-react-native";

import Onboarding from "./src/screens/Onboarding";
import Splash from "./src/screens/Splash";
import Home from "./src/screens/Home";
import Rotina from "./src/screens/Rotina";
import Nova from "./src/screens/Nova";
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
    }, 4300);

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

  // Retorna a navegação com as fontes carregadas
  return (
    <ImageProvider>
      <NavigationContainer style={styles.container}>
        {hasSeenOnboarding ? (
          <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
              tabBarStyle: {
                backgroundColor: "#ffff",
                height: 55,
                borderTopColor: "#ffff",
                height: "8%",
              },
            }}
          >
            <Tab.Screen
              name="Home"
              component={Home}
              options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                  <House size={30} color={focused ? "#ff80c3" : "#c2bebe"} />
                ),
                tabBarLabelStyle: { fontSize: 13.4 },
                tabBarActiveTintColor: "#ff80c3",
                tabBarInactiveTintColor: "#c2bebe",
              }}
            />
            <Tab.Screen
              name="Rotina"
              component={Rotina}
              options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                  <Clock size={30} color={focused ? "#ff80c3" : "#c2bebe"} />
                ),
                tabBarLabelStyle: { fontSize: 13.4 },
                tabBarActiveTintColor: "#ff80c3",
                tabBarInactiveTintColor: "#c2bebe",
                // tabBarStyle: { display: "none" },
              }}
            />
            <Tab.Screen
              name="Nova"
              component={Nova}
              options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                  <CirclePlus
                    size={50}
                    color={focused ? "#ff80c3" : "#c2bebe"}
                  />
                ),
                tabBarLabel: () => null,
              }}
            />
            <Tab.Screen
              name="AI Health"
              component={Skinbot}
              options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                  <BotMessageSquare
                    size={30}
                    color={focused ? "#ff80c3" : "#c2bebe"}
                  />
                ),
                tabBarLabelStyle: { fontSize: 13.4 },
                tabBarActiveTintColor: "#ff80c3",
                tabBarInactiveTintColor: "#c2bebe",
                // tabBarStyle: { display: "none" },
              }}
            />
            <Tab.Screen
              name="Perfil"
              component={Perfil}
              options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                  <UserRound
                    size={30}
                    color={focused ? "#ff80c3" : "#c2bebe"}
                  />
                ),
                tabBarLabelStyle: { fontSize: 13.4 },
                tabBarActiveTintColor: "#ff80c3",
                tabBarInactiveTintColor: "#c2bebe",
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
                    size={30}
                    color={focused ? "#ff80c3" : "#c2bebe"}
                  />
                ),
                tabBarLabelStyle: { fontSize: 13.4 },
                tabBarActiveTintColor: "#ff80c3",
                tabBarInactiveTintColor: "#c2bebe",
                tabBarButton: () => null,
                tabBarStyle: { display: "none" },
              }}
            />
          </Tab.Navigator>
        ) : (
          <Onboarding />
        )}
      </NavigationContainer>
    </ImageProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    alignItems: "center",
    justifyContent: "center",
  },
});
