import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { globalStyles } from "../utils/globalStyles";
import { getCurrentDate } from "../utils/dateUtils";
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

      <View style={styles.viewProdutos}>
        <Text style={styles.title}>Selecione os produtos de cuidados com a pele</Text>
        <View style={styles.produtos}> 
          {categories.map((category) => (
            <View key={category} style={styles.checkboxContainer}>
              <Checkbox
                status={selectedCategories[category] ? 'checked' : 'unchecked'}
                onPress={() => toggleCategory(category)}
                color="#ff80c3"
              />
              <Text style={styles.checkboxLabel}>{category}</Text>
            </View>
          ))}
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
  viewProdutos: {
    padding: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  produtos: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between", 
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: '50%', 
    marginVertical: 5, 
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 13,
  },
});
