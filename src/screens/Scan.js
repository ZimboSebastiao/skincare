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
    console.log("Imagem capturada:", imageUri); // Log da imagem capturada
    setImage(imageUri);
    setResult(null);
    setError(null);
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
        "https://opencv-hg7j.onrender.com/analyze-skin",
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
            navigation.navigate("Rotina");
          }}
        >
          <MaterialCommunityIcons name="chevron-left" size={35} />
        </Pressable>

        <View style={styles.viewTexto}>
          <Text style={[globalStyles.mediumText]}>Análise de Pele</Text>
          <Text style={[styles.textoMenu, globalStyles.mediumText]}>
            Hoje é, {currentDate}
          </Text>
        </View>
      </View>

      <View style={styles.scanIcon}>
        <Image
          source={require("../../assets/images/scaneer.png")}
          style={styles.scanImage}
        />
      </View>
      <View style={styles.viewDescricao}>
        <Text style={[styles.textoDescricao, globalStyles.mediumText]}>
          Capture uma foto do seu rosto para uma análise de pele personalizada
          feita por nossa inteligência artificial. Após a captura, envie a
          imagem e receba recomendações de produtos adequados ao seu tipo de
          pele
        </Text>
      </View>

      {image && (
        <View style={styles.viewImagem}>
          <Image
            source={{ uri: image }}
            style={{ width: 300, height: 300, marginVertical: 20 }}
          />
        </View>
      )}

      {/* Botões de ação */}
      <Button title="Tirar Foto" onPress={takePicture} />
      <Button
        title="Enviar para Análise"
        onPress={uploadImage}
        disabled={loading}
      />

      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      {error && <Text style={{ color: "red" }}>{`Erro: ${error}`}</Text>}

      {result && (
        <View style={{ marginTop: 20 }}>
          <Text>{`Tipo de Pele: ${
            result.analysis_result?.skinType || "Desconhecido"
          }`}</Text>

          {result.analysis_result?.colorAnalysis ? (
            <>
              <Text>{`Média de Matiz (Hue): ${
                result.analysis_result.colorAnalysis.meanHue?.toFixed(2) ||
                "N/A"
              }`}</Text>
              <Text>{`Média de Saturação: ${
                result.analysis_result.colorAnalysis.meanSaturation?.toFixed(
                  2
                ) || "N/A"
              }`}</Text>
              <Text>{`Média de Valor: ${
                result.analysis_result.colorAnalysis.meanValue?.toFixed(2) ||
                "N/A"
              }`}</Text>
            </>
          ) : (
            <Text>Análise de cor não disponível.</Text>
          )}

          {result.analysis_result?.problems?.length > 0 ? (
            <View>
              <Text>Problemas Detectados:</Text>
              {result.analysis_result.problems.map((problem, index) => (
                <Text key={index}>{`- ${problem}`}</Text>
              ))}
            </View>
          ) : (
            <Text>Sem problemas detectados.</Text>
          )}

          {/* Exibir a imagem processada */}
          {result.processed_image && (
            <View>
              <Text>Imagem Processada:</Text>
              <Image
                source={{
                  uri: `data:image/png;base64,${result.processed_image}`,
                }}
                style={{ width: 300, height: 300, marginVertical: 20 }}
                onLoad={() =>
                  console.log("Imagem processada carregada com sucesso!")
                }
                onError={(error) =>
                  console.error("Erro ao carregar imagem processada:", error)
                }
              />
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  viewImagem: {
    backgroundColor: "red",
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
    // backgroundColor: "red",
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
    padding: 20,
    marginBottom: 50,
  },
  viewDescricao: {
    padding: 20,
    marginBottom: 30,
  },
  textoDescricao: {
    fontSize: 16,
    color: "#a6a2a2",
    textAlign: "center",
  },
});
