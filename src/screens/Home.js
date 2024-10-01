import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { getCurrentDate } from "../utils/dateUtils";
import { getGreeting } from "../utils/greetingUtils";
import { globalStyles } from "../utils/globalStyles";

export default function Home() {
  const currentDate = getCurrentDate();
  const greeting = getGreeting();

  return (
    <View style={styles.container}>
      <View style={styles.viewMenu}>
        <Text style={[styles.textoMenu, globalStyles.semiBoldText]}>
          Hoje é, {currentDate}
        </Text>
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
});
