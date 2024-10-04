import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getCurrentDate } from "../utils/dateUtils";
import { globalStyles } from "../utils/globalStyles";

export default function Diario({navigation}) {

  const currentDate = getCurrentDate();

  return (
    <View style={styles.container}>
      <View style={styles.viewMenu}>
        <Pressable onPress={() => {navigation.navigate("Home")}}>

        <MaterialCommunityIcons
          name="chevron-left"
          size={35}
        />
        </Pressable>

        <View style={styles.viewTexto}>
          <Text style={[globalStyles.mediumText]}>Diário</Text>
        <Text style={[styles.textoMenu, globalStyles.mediumText]}>
          Hoje é, {currentDate}
        </Text>
        </View>

      </View>

      <View style={styles.viewScan}>
        <Text style={[globalStyles.mediumText, styles.viewTextoScan]}>Verifique a saúde da pele</Text>

        <Pressable onPress={() => {console.log("Oi");}}>

        <View style={styles.viewScanImagem} >
        <Image
              source={require("../../assets/images/face-scan.png")}
              style={styles.animationImage}
            />
          <Text style={[globalStyles.mediumText, styles.viewTextoScan, styles.textoImagem]}>Scan com IA</Text>
        </View>
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
    width: "73%"
  },
  textoMenu: {
    fontSize: 13,
    color: "#a6a2a2",
  },
  viewTexto: {
    justifyContent: "center",
    alignItems: "center"
  },
  viewScan:{
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
    borderRadius: 15
  },
  textoImagem: {
 
    margin: 12
  }
});
