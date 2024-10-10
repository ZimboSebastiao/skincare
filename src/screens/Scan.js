import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Image,
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Pressable,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { globalStyles } from "../utils/globalStyles";
import { getCurrentDate } from "../utils/dateUtils";

export default function Scan({ navigation }) {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isPictureTaken, setIsPictureTaken] = useState(false);
  const currentDate = getCurrentDate();

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permissão de câmera é necessária.");
      }
    })();
  }, []);

  const takePicture = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.canceled) {
      return;
    }

    const imageUri = result.assets[0].uri;
    setImage(imageUri);
    setResult(null);
    setError(null);
    setIsPictureTaken(true); // Atualize o estado para ocultar as views
  };

  const uploadImage = async () => {
    if (!image) {
      Alert.alert("Por favor, tire uma foto primeiro.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const imageData = await FileSystem.readAsStringAsync(image, {
        encoding: FileSystem.EncodingType.Base64,
      });
      console.log(
        "Imagem codificada em base64:",
        imageData.substring(0, 30) + "..."
      ); // Log da imagem em base64 (apenas os primeiros 30 caracteres para não sobrecarregar o log)

      const response = await fetch(
        // "https://opencv-hg7j.onrender.com/analyze-skin",
        "http://192.168.15.11:5000/analyze-skin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: imageData }),
        }
      );

      if (!response.ok) {
        throw new Error("Falha na análise da imagem");
      }

      const result = await response.json();
      console.log("Resultado da análise:", result); // Log do resultado da análise
      setResult(result);
    } catch (err) {
      setError(err.message);
      Alert.alert("Erro ao enviar a imagem", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        // justifyContent: "center",
        // alignItems: "center",
      }}
    >
      <View style={styles.viewMenu}>
        <Pressable
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <MaterialCommunityIcons name="chevron-left-circle" size={35} />
        </Pressable>

        <View style={styles.viewTexto}>
          <Text style={[globalStyles.mediumText]}>Análise de Pele</Text>
          <Text style={[styles.textoMenu, globalStyles.mediumText]}>
            Hoje é, {currentDate}
          </Text>
        </View>
      </View>

      {!isPictureTaken && ( // Ocultar quando a foto for tirada
        <>
          <View style={styles.scanIcon}>
            <Image
              source={require("../../assets/images/scaneer.png")}
              style={styles.scanImage}
            />
          </View>
          <View style={styles.viewDescricao}>
            <Text style={[styles.textoDescricao, globalStyles.mediumText]}>
              Capture uma foto do seu rosto para uma análise de pele
              personalizada feita por nossa inteligência artificial. Após a
              captura, envie a imagem e receba recomendações de produtos
              adequados ao seu tipo de pele
            </Text>
          </View>
        </>
      )}
      {image && (
        <View style={styles.viewImagem}>
          <Image
            source={{ uri: image }}
            style={{ width: 350, height: 350, borderRadius: 20 }}
          />
        </View>
      )}

      <View style={styles.viewBotoes}>
        <View style={styles.viewBotao}>
          <Pressable style={styles.botao} onPress={takePicture}>
            <Text style={styles.textoBotao}>Tirar Foto</Text>
          </Pressable>
        </View>
        <View style={styles.viewBotao}>
          <Pressable
            style={styles.botao}
            onPress={uploadImage}
            disabled={loading}
          >
            <Text style={styles.textoBotao}>Enviar para Análise</Text>
          </Pressable>
        </View>
      </View>

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#ff80c3" />
        </View>
      )}

      {error && <Text style={{ color: "red" }}>{`Erro: ${error}`}</Text>}

      {result && (
        <View style={{ marginTop: 20 }}>
          <Pressable
            style={styles.visualizarBotao}
            onPress={() => navigation.navigate("Resultado", { result })}
          >
            <Text style={styles.textoBotao}>Visualizar Resultado</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  viewImagem: {
    backgroundColor: "#ff80c3",
    borderWidth: 2,
    margin: 15,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ff80c3",
    borderRadius: 20,
    elevation: 1,
  },
  viewMenu: {
    marginVertical: 30,
    padding: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "73%",
  },
  textoMenu: {
    fontSize: 13,
    color: "#a6a2a2",
  },
  viewTexto: {
    justifyContent: "center",
    alignItems: "center",
  },
  scanImage: {
    width: 210,
    height: 210,
    resizeMode: "contain",
    backgroundColor: "transparent",
  },
  scanIcon: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginBottom: 20,
  },
  viewDescricao: {
    padding: 20,
    marginBottom: 20,
  },
  textoDescricao: {
    fontSize: 16,
    color: "#a6a2a2",
    textAlign: "center",
  },
  viewBotoes: {
    padding: 10,
  },
  viewBotao: {
    margin: 10,
  },
  botao: {
    backgroundColor: "#ff80c3",
    padding: 15,
    borderRadius: 20,
  },
  textoBotao: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
    color: "#ffff",
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(247, 242, 242, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  visualizarBotao: {
    backgroundColor: "#ff80c3",
    padding: 15,
    borderRadius: 20,
    margin: 10,
  },
  textoBotao: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
  },
});
