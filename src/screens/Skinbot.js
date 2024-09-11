import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function Skinbot() {
  return (
    <View style={styles.container}>
      <Text>SkinBot</Text>
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
