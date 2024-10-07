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
      {/* SVGs como fundo */}
      <Svg
        style={styles.backgroundSvg1}
        width="592"
        height="516"
        viewBox="0 0 252 216"
      >
        <Path
          d="M131.927 0.758265C141.143 -0.12561 148.663 8.018 147.05 17.1339L141.67 47.5381C139.944 57.2881 148.609 65.699 158.303 63.685L211.729 52.5855C217.311 51.4256 223.04 53.7675 226.211 58.5062L249.639 93.513C254.508 100.787 251.582 110.695 243.543 114.158L216.981 125.598C208.17 129.393 205.7 140.724 212.132 147.842L233.673 171.68C240.379 179.102 237.364 190.958 227.927 194.275L169.868 214.678C167.41 215.542 164.758 215.703 162.213 215.142L113.365 204.374C110.409 203.723 107.743 202.13 105.768 199.836L74.9545 164.043C73.1825 161.985 70.85 160.486 68.2413 159.73L10.268 142.93C1.50566 140.391 -2.5261 130.284 2.08281 122.41L32.8274 69.892C33.6038 68.5656 34.1566 67.1205 34.4635 65.6145L43.9314 19.1515C45.1605 13.1198 50.1853 8.59857 56.3128 8.01085L131.927 0.758265Z"
          fill="#F8ECF4"
        />
      </Svg>
      <Svg
        style={styles.backgroundSvg2}
        width="340"
        height="309"
        viewBox="0 0 240 209"
      >
        <Path
          d="M374.023 113.24C408.373 -40.8824 283.056 7.8904 182.64 7.8904C82.2233 7.8904 0.819824 62.4811 0.819824 129.822C0.819824 197.163 286 26 148 194C148 390 374.023 180.581 374.023 113.24Z"
          fill="#F8ECF4"
        />
      </Svg>
      <Svg
        style={styles.backgroundSvg3}
        width="442"
        height="307"
        viewBox="0 0 242 207"
      >
        <Path
          d="M315.5 117C344.5 275 238.702 225 153.926 225C69.1503 225 0.426025 169.036 0.426025 100C0.426025 30.9644 104.5 -61 167 59C320.074 -52 315.5 47.9644 315.5 117Z"
          fill="#F8ECF4"
        />
      </Svg>
      <Svg
        style={styles.backgroundSvg4}
        width="407"
        height="670"
        viewBox="0 0 242 207"
      >
        <Path
          d="M145 244C145 354.457 200.245 400 129 400C57.7553 400 0 310.457 0 200C0 89.5431 57.7553 0 129 0C200.245 0 145 133.543 145 244Z"
          fill="#F8ECF4"
        />
      </Svg>

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
              08:00
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
    backgroundColor: "#21D8EE",
    padding: 10,
  },
  textoCuidados: {
    color: "#0B224C",
  },
  viewRotinas: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: "auto",
  },
  rotinaManha: {
    backgroundColor: "#EFA383",
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    margin: "3%",
    borderRadius: 15,
  },
  rotinaNoite: {
    backgroundColor: "#AE92E6",
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
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
  textoRotinaTitulo: {
    fontSize: 17.5,
    color: "#ffff",
    fontWeight: "bold",
  },
  botaoRotina: {
    padding: 10,
    paddingBottom: 0,
    justifyContent: "flex-end",
  },
  backgroundSvg1: {
    position: "absolute",
    top: -190,
    left: -40,
  },
  backgroundSvg2: {
    position: "absolute",
    top: 200,
    right: -200,
  },
  backgroundSvg3: {
    position: "absolute",
    bottom: -150,
    left: -42,
  },
  backgroundSvg4: {
    position: "absolute",
    top: 80,
    right: 170,
  },
});
