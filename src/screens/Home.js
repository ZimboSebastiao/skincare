import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { getCurrentDate } from "../utils/dateUtils";
import { getGreeting } from "../utils/greetingUtils";

export default function Home() {
  const currentDate = getCurrentDate();
  const greeting = getGreeting();

  return (
    <View style={styles.container}>
      <Text>Hoje é, {currentDate}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    alignItems: "center",
    justifyContent: "center",
  },
});
