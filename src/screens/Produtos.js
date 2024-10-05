import React from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { globalStyles } from "../utils/globalStyles";
import { getCurrentDate } from "../utils/dateUtils";
import Svg, { Path } from "react-native-svg";

export default function Produtos({ navigation }) {
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
          <Text style={[globalStyles.mediumText]}>Produtos</Text>
          <Text style={[styles.textoMenu, globalStyles.mediumText]}>
            Hoje é, {currentDate}
          </Text>
        </View>
      </View>

      <View style={styles.cuidados}>
        <Text style={[styles.textoCuidados, globalStyles.semiBoldText]}>
          Adicione Aqui os seus Produtos!
        </Text>
      </View>

      <View style={styles.viewFeadback}>
        <Image
          source={require("../../assets/images/triste.png")}
          style={styles.animationImage}
        />
        <View style={styles.feadback}>
          <Text style={[styles.textoFeadback, globalStyles.semiBoldText]}>
            Meu estoque de produtos está vazio
          </Text>
          <Text style={styles.textoMoreInfo}>
            Acompanhe todos os seus produtos para a pele, datas de validade,
            seus gastos e muito mais.
          </Text>
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
  viewFeadback: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: "auto",
  },
  animationImage: {
    width: 65,
    height: 65,
    resizeMode: "contain",
    borderRadius: 100,
    backgroundColor: "transparent",
  },
  feadback: {
    justifyContent: "center",
    alignItems: "center",
    padding: 35,
  },
  textoFeadback: {
    width: "100%",
  },
  textoMoreInfo: {
    fontSize: 13,
    color: "#a6a2a2",
    textAlign: "center",
  },
});
