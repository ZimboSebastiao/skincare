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
          <View>
            <Pressable>
              
            <MaterialCommunityIcons
                    name="clipboard-check-outline"
                    size={50}
                    color={"#ff80c3"}
                  />
                  <Text>Diário</Text>
            </Pressable>
          </View>
          <View>
            <Pressable>
              
            <MaterialCommunityIcons
                    name="emoticon-outline"
                    size={50}
                    color={"#ff80c3"}
                  />
                  <Text>Humor</Text>
            </Pressable>
          </View>
          <View>
            <Pressable>
              
            <MaterialCommunityIcons
                    name="star-shooting-outline"
                    size={50}
                    color={"#ff80c3"}
                  />
                  <Text>Percepções</Text>
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
    backgroundColor: "red"
  }
});
