import * as ImagePicker from "expo-image-picker";

// Função para abrir a galeria e selecionar a imagem
export const pickImageFromGallery = async () => {
  const permissionResult =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permissionResult.granted) {
    alert("Permissão para acessar as fotos é necessária!");
    return null;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) {
    return result.assets[0].uri; // Retorna a URI da imagem selecionada
  }

  return null;
};
