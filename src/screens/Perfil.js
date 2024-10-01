import { View, Text, StyleSheet, Button } from "react-native";
import React, { useState, useContext } from "react";

import * as ImagePicker from "expo-image-picker";
import { pickImageFromGallery } from "../helpers/imagePickerHelper";
import CustomAvatar from "../components/CustomAvatar";
import { ImageContext } from "../context/ImageContext";

export default function Perfil() {
  const { selectedImage, setSelectedImage } = useContext(ImageContext);

  const handlePickImage = async () => {
    const imageUri = await pickImageFromGallery();
    if (imageUri) {
      setSelectedImage(imageUri); // Isso também salva no AsyncStorage
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <CustomAvatar imageUri={selectedImage} />
        <Button title="Selecionar Foto" onPress={handlePickImage} />
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
