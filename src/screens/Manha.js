import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { globalStyles } from "../utils/globalStyles";
import { getCurrentDate } from "../utils/dateUtils";
import Svg, { Path } from "react-native-svg";
import { Plus } from "lucide-react-native";
import { getAllCategories } from "../helpers/categoryHelper";
import { Checkbox } from "react-native-paper";

export default function Manha({ navigation }) {
  const currentDate = getCurrentDate();
  const [selectedCategories, setSelectedCategories] = useState({});
  const categories = getAllCategories(); 

   // Função para lidar com a seleção/deseleção de categorias
   const toggleCategory = (category) => {
    setSelectedCategories((prevSelected) => ({
      ...prevSelected,
      [category]: !prevSelected[category],
    }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.viewMenu}>
        <Pressable
          onPress={() => {
            navigation.navigate("Rotina");
          }}
        >
          <MaterialCommunityIcons name="chevron-left-circle" size={35} />
        </Pressable>

        <View style={styles.viewTexto}>
          <Text style={[globalStyles.mediumText]}>Rotina Matinal</Text>
          <Text style={[styles.textoMenu, globalStyles.mediumText]}>
            Hoje é, {currentDate}
          </Text>
        </View>


      </View>


       <View>
        <Text style={styles.title}>Selecione os produtos de cuidados com a pele:</Text>
        {categories.map((category) => (
          <View key={category} style={styles.checkboxContainer}>
            <Checkbox
              status={selectedCategories[category] ? 'checked' : 'unchecked'}
              onPress={() => toggleCategory(category)}
            />
            <Text style={styles.checkboxLabel}>{category}</Text>
          </View>
        ))}
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
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
  },
});
