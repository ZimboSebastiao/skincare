import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getCurrentDate } from "../utils/dateUtils";
import { globalStyles } from "../utils/globalStyles";

export default function Calendario({ navigation }) {
  const currentDate = getCurrentDate();

  return (
    <View style={styles.container}>
      <View style={styles.viewMenu}>
        <Pressable
          onPress={() => {
            navigation.navigate("Início");
          }}
        >
          <MaterialCommunityIcons name="chevron-left-circle" size={35} />
        </Pressable>

        
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
    padding: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "73%",
  },
  textoMenu: {
    fontSize: 13,
    color: "#a6a2a2",
  },
  viewTexto: {
    justifyContent: "center",
    alignItems: "center",
  },
  viewScan: {
    padding: 16,
  },
  viewTextoScan: {
    fontSize: 18,
    marginBottom: 15,
  },
  animationImage: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    borderRadius: 100,
    borderColor: "#ffff",
    backgroundColor: "#ffff",
  },
  viewScanImagem: {
    backgroundColor: "#F6EEFB",
    padding: 13,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 15,
  },
  textoImagem: {
    margin: 12,
  },
  viewSkinInfo: {
    padding: 16,
  },
  viewSkinOpcao: {
    backgroundColor: "#F6EEFB",
    padding: 13,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 15,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },

});
