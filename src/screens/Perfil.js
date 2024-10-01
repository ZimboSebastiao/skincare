import { View, Text, StyleSheet, Button } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Avatar } from "react-native-paper";
import CustomAvatar from "../components/CustomAvatar";

export default function Perfil() {
  const [selectedImage, setSelectedImage] = useState(null);

  // Função para abrir a galeria e selecionar a imagem
  const pickImage = async () => {
    // Pedir permissão para acessar a galeria
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permissão para acessar as fotos é necessária!");
      return;
    }

    // Abrir a galeria e selecionar a imagem
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri); // Armazena a URI da imagem selecionada
    }
  };
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <CustomAvatar imageUri={selectedImage} />

        <Button title="Selecionar Foto" onPress={pickImage} />
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
});
