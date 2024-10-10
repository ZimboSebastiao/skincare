import React from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { globalStyles } from "../utils/globalStyles";
import { getCurrentDate } from "../utils/dateUtils";
import Svg, { Path } from "react-native-svg";

export default function Rotina({ navigation }) {
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
        <Pressable
          style={styles.rotinaManha}
          onPress={() => {
            navigation.navigate("Manha");
          }}
        >
          <Image
            source={require("../../assets/images/sun.png")}
            style={styles.animationImage}
          />
          <View style={styles.botaoRotina}>
            <Text style={styles.textoRotinaTitulo}>
              Crie uma Rotina Matinal
            </Text>
            <Text style={[styles.textoHora, globalStyles.mediumText]}>
              08h00
            </Text>
          </View>
        </Pressable>

        <Pressable style={styles.rotinaNoite}>
          <Image
            source={require("../../assets/images/lua.png")}
            style={styles.animationImage}
          />
          <View style={styles.botaoRotina}>
            <Text style={styles.textoRotinaTitulo}>
              Crie uma Rotina Noturna
            </Text>
            <Text style={[styles.textoHora, globalStyles.text]}>21h00</Text>
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
    backgroundColor: "#ff80c3",
    padding: 10,
  },
  textoCuidados: {
    color: "#ffff",
  },
  viewRotinas: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: "auto",
  },
  rotinaManha: {
    backgroundColor: "#FFE5E5",
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    margin: "3%",
    borderRadius: 15,
    elevation: 1,
  },
  rotinaNoite: {
    backgroundColor: "#F1DAEA",
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    margin: "3%",
    borderRadius: 15,
    elevation: 1,
  },
  animationImage: {
    width: 35,
    height: 35,
    resizeMode: "contain",
    borderRadius: 100,
    backgroundColor: "transparent",
  },
  textoHora: {
    color: "#aba7a7",
  },
  textoRotinaTitulo: {
    fontSize: 17,
    color: "#0B224C",
    fontWeight: "bold",
  },
  botaoRotina: {
    padding: 10,
    paddingBottom: 0,
    justifyContent: "flex-end",
  },
});
