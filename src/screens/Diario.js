import { View, Text, StyleSheet, Pressable } from "react-native";
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

        <View>
          <Text style={[globalStyles.mediumText]}>DIario</Text>
        <Text style={[styles.textoMenu, globalStyles.text]}>
          Hoje é, {currentDate}
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
    backgroundColor: "red",
    marginVertical: 30,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "55%"
  },
  textoMenu: {
    fontSize: 13,
    color: "#a6a2a2",
  },
});
