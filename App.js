import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import Splash from "./src/screens/Splash";
import Home from "./src/screens/Home";
import Rotina from "./src/screens/Rotina";
import Nova from "./src/screens/Nova";
import Skinbot from "./src/screens/Skinbot";
import Perfil from "./src/screens/Perfil";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const Tab = createBottomTabNavigator();

  // Configuração do Splash
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 4300);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <Splash />;
  }

  return (
    <NavigationContainer style={styles.container}>
      <Tab.Navigator
        initialRouteName={Home}
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#ffff",
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, size }) => (
              <MaterialCommunityIcons
                name="home"
                size={30}
                color={focused ? "#756AB6" : "#B1AFAF"}
              />
            ),
            tabBarLabelStyle: { fontSize: 13.4 },
            tabBarActiveTintColor: "#756AB6",
            tabBarInactiveTintColor: "#B1AFAF",
          }}
        />

        <Tab.Screen
          name="Rotina"
          component={Rotina}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, size }) => (
              <MaterialCommunityIcons
                name="clipboard-list"
                size={30}
                color={focused ? "#756AB6" : "#B1AFAF"}
              />
            ),
            tabBarLabelStyle: { fontSize: 13.4 },
            tabBarActiveTintColor: "#756AB6",
            tabBarInactiveTintColor: "#B1AFAF",
          }}
        />
        <Tab.Screen
          name=" "
          component={Nova}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, size }) => (
              <MaterialCommunityIcons
                name="plus-circle"
                size={40}
                color={focused ? "#756AB6" : "#B1AFAF"}
              />
            ),

            tabBarActiveTintColor: "#756AB6",
            tabBarInactiveTintColor: "#B1AFAF",
          }}
        />
        <Tab.Screen
          name="SkinBot"
          component={Skinbot}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, size }) => (
              <MaterialCommunityIcons
                name="discord"
                size={30}
                color={focused ? "#756AB6" : "#B1AFAF"}
              />
            ),
            tabBarLabelStyle: { fontSize: 13.4 },

            tabBarActiveTintColor: "#756AB6",
            tabBarInactiveTintColor: "#B1AFAF",
          }}
        />
        <Tab.Screen
          name="Perfil"
          component={Perfil}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, size }) => (
              <MaterialCommunityIcons
                name="account"
                size={30}
                color={focused ? "#756AB6" : "#B1AFAF"}
              />
            ),
            tabBarLabelStyle: { fontSize: 13.4 },

            tabBarActiveTintColor: "#756AB6",
            tabBarInactiveTintColor: "#B1AFAF",
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
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
