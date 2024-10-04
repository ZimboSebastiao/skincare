import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Diario() {
  return (
    <View style={styles.container}>
      <View style={styles.viewMenu}>
        <MaterialCommunityIcons
          name="chevron-left"
          size={30}
        />
        <View>
          <Text>DIario</Text>
          <Text>DIario</Text>
        </View>

      </View>
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
  viewMenu: {
    backgroundColor: "red"
  }
});
