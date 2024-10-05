import React from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { globalStyles } from "../utils/globalStyles";
import { getCurrentDate } from "../utils/dateUtils";

export default function Rotina({ navigation }) {
  const currentDate = getCurrentDate();
  return (
    <View style={styles.container}>
      <View style={styles.viewMenu}>
        <Pressable
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <MaterialCommunityIcons name="chevron-left" size={35} />
        </Pressable>

        <View style={styles.viewTexto}>
          <Text style={[globalStyles.mediumText]}>Rotinas</Text>
          <Text style={[styles.textoMenu, globalStyles.mediumText]}>
            Hoje é, {currentDate}
          </Text>
        </View>
      </View>

      <View style={styles.cuidados}>
        <Text style={[styles.textoCuidados, globalStyles.semiBoldText]}>
          Crie sua rotina diária de cuidados com a pele.
        </Text>
      </View>

      <View style={styles.viewRotinas}>
        <View style={styles.rotinaManha}>
          <Image
            source={require("../../assets/images/sun.png")}
            style={styles.animationImage}
          />
          <View>
            <Text>Crie uma Rotina Matinal</Text>
            <Text style={[styles.textoHora, globalStyles.mediumText]}>
              08:00
            </Text>
          </View>
        </View>

        <View style={styles.rotinaNoite}>
          <Image
            source={require("../../assets/images/lua.png")}
            style={styles.animationImage}
          />
          <View>
            <Text>Crie uma Rotina Noturna</Text>
            <Text style={[styles.textoHora, globalStyles.text]}>21h00</Text>
          </View>
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
    padding: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "73%",
  },
  viewTexto: {
    justifyContent: "center",
    alignItems: "center",
  },
  textoMenu: {
    fontSize: 13,
    color: "#a6a2a2",
  },
  cuidados: {
    backgroundColor: "#D5E9E9",
    padding: 10,
  },
  viewRotinas: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: "auto",
  },
  rotinaManha: {
    backgroundColor: "#EFA383",
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    margin: "3%",
    borderRadius: 15,
  },
  rotinaNoite: {
    backgroundColor: "#AE92E6",
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    margin: "3%",
    borderRadius: 15,
  },
  animationImage: {
    width: 35,
    height: 35,
    resizeMode: "contain",
    borderRadius: 100,
    backgroundColor: "transparent",
  },
  textoHora: {
    color: "#f0eded",
  },
});
