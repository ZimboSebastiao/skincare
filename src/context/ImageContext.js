import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ImageContext = createContext();

// Chaves para armazenar a imagem no AsyncStorage
const STORAGE_KEY = "@selected_image_uri";

// Função para salvar a URI no AsyncStorage
const saveImageToStorage = async (imageUri) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, imageUri);
  } catch (error) {
    console.error("Erro ao salvar imagem no armazenamento", error);
  }
};

// Função para carregar a URI do AsyncStorage
const loadImageFromStorage = async () => {
  try {
    const imageUri = await AsyncStorage.getItem(STORAGE_KEY);
    return imageUri;
  } catch (error) {
    console.error("Erro ao carregar imagem do armazenamento", error);
    return null;
  }
};

// Provedor do contexto
export const ImageProvider = ({ children }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Carrega a imagem armazenada quando o app inicia
  useEffect(() => {
    const loadStoredImage = async () => {
      const storedImage = await loadImageFromStorage();
      if (storedImage) {
        setSelectedImage(storedImage);
      }
    };
    loadStoredImage();
  }, []);

  // Atualiza a imagem no estado e no AsyncStorage
  const updateImage = (imageUri) => {
    setSelectedImage(imageUri);
    saveImageToStorage(imageUri);
  };

  return (
    <ImageContext.Provider
      value={{ selectedImage, setSelectedImage: updateImage }}
    >
      {children}
    </ImageContext.Provider>
  );
};
