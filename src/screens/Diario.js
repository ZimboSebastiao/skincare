import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Diario({navigation}) {
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

  },
  viewMenu: {
    backgroundColor: "red",
    marginVertical: 30,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "55%"
  }
});
