import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useState, useContext } from "react";
import { getCurrentDate } from "../utils/dateUtils";
import { getGreeting } from "../utils/greetingUtils";
import { globalStyles } from "../utils/globalStyles";
import CustomAvatar from "../components/CustomAvatar";
import { ImageContext } from "../context/ImageContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
            <Pressable style={styles.viewBotao1}> 
            <MaterialCommunityIcons
                    name="clipboard-check-outline"
                    size={50}
                    color={"#ff80c3"}
                  />
            </Pressable>
                <Text>Diário</Text>
          </View>

          <View style={styles.viewPagina}>
            <Pressable style={styles.viewBotao2}>
              
            <MaterialCommunityIcons
                    name="emoticon-outline"
                    size={50}
                    color={"#ff80c3"}
                  />
            </Pressable>
                <Text>Humor</Text>
          </View>

          <View style={styles.viewPagina}> 
            <Pressable style={styles.viewBotao3}> 
            <MaterialCommunityIcons
                    name="star-shooting-outline"
                    size={50}
                    color={"#ff80c3"}
                  />
            </Pressable>
                <Text>Percepções</Text>
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
  }
  ,
  viewPagina: {
    justifyContent: "center",
    alignItems: "center"
    
  }
  ,
  viewBotao1: {
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center"
    
  }
  ,
  viewBotao2: {
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center"
    
  }
  ,
  viewBotao3: {
    backgroundColor: "orange",
    justifyContent: "center",
    alignItems: "center"
    
  }
});
