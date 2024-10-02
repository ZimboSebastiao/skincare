import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useContext } from "react";
import { getCurrentDate } from "../utils/dateUtils";
import { getGreeting } from "../utils/greetingUtils";
import { globalStyles } from "../utils/globalStyles";
import CustomAvatar from "../components/CustomAvatar";
import { ImageContext } from "../context/ImageContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Svg, { Polygon } from 'react-native-svg';

export default function Home() {
  const { selectedImage } = useContext(ImageContext);

  const currentDate = getCurrentDate();
  const greeting = getGreeting();

  return (
    <View style={styles.container}>
      <View style={styles.viewMenu}>
        <Text style={[styles.textoMenu, globalStyles.semiBoldText]}>
          Hoje é, {currentDate}
        </Text>
        <View style={styles.viewImagem}>
          <CustomAvatar imageUri={selectedImage} size={80} />
          <View>
            <Text style={[globalStyles.semiBoldText, styles.textoImagem]}>
              {greeting},
            </Text>
            <Text style={[globalStyles.semiBoldText, styles.textoImagem]}>
              Aicha
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.viewPaginas}>
        <View style={styles.viewPagina}>
          <Pressable style={styles.buttonWrapper}>
            <Svg height="100" width="100">
              <Polygon
                points="0,0 100,0 100,100 0,100 
                        0,0 56,79 98,65 72,29
                        39,1 21,-11 12,-14 56,79"
                fill="black"
              />
            </Svg>
            <View style={styles.buttonContent}>
              <MaterialCommunityIcons
                name="clipboard-check-outline"
                size={50}
                color={"#ff80c3"}
              />
            </View>
              <Text style={styles.buttonText}>Diário</Text>
          </Pressable>
        </View>

        <View style={styles.viewPagina}>
          <Pressable style={styles.buttonWrapper}>
            <Svg height="100" width="100">
              <Polygon
                points="30,0 100,70 50,100 0,50"
                fill="blue"
              />
            </Svg>
            <View style={styles.buttonContent}>
              <MaterialCommunityIcons
                name="emoticon-outline"
                size={50}
                color={"#ff80c3"}
              />
            </View>
              <Text style={styles.buttonText}>Humor</Text>
          </Pressable>
        </View>

        <View style={styles.viewPagina}>
          <Pressable style={styles.buttonWrapper}>
            <Svg height="100" width="100">
              <Polygon
                points="50,0 100,100 0,100"
                fill="orange"
              />
            </Svg>
            <View style={styles.buttonContent}>
              <MaterialCommunityIcons
                name="star-shooting-outline"
                size={50}
                color={"#ff80c3"}
              />
            </View>
              <Text style={styles.buttonText}>Percepções</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
  },
  viewMenu: {
    marginVertical: 30,
    padding: 15,
  },
  textoMenu: {
    fontSize: 15,
    color: "#a6a2a2",
  },
  viewImagem: {
    width: "52%",
    paddingTop: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textoImagem: {
    fontSize: 16,
  },
  viewPaginas: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  viewPagina: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonWrapper: {
    position: 'relative', // Permite sobreposição de conteúdo
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContent: {
    position: 'absolute', // Sobrepõe o conteúdo dentro do botão
    justifyContent: "center",
    alignItems: "center",
    width: '100%',
    height: '100%',
  },
  buttonText: {
    color: "#ff80c3",
    marginTop: 5,
  },
});
