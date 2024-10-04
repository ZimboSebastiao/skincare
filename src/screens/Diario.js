import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function Diario() {
  return (
    <View style={styles.container}>
      <Text>DIario</Text>
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
