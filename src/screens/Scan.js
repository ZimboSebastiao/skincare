import React, { useState, useEffect, useRef } from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import { Camera } from "expo-camera";

export default function Scan() {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState("front"); // Usando strings simples
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>Sem acesso à câmera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera 
        ref={cameraRef} 
        style={styles.camera} 
        type={cameraType === "front" ? Camera.Type.front : Camera.Type.back} 
      />
      <Button
        title="Trocar Câmera"
        onPress={() => {
          setCameraType(prevType => (prevType === "front" ? "back" : "front"));
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
    width: "100%",
  },
});
