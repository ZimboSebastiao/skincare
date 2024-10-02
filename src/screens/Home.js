import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useContext } from "react";
import { getCurrentDate } from "../utils/dateUtils";
import { getGreeting } from "../utils/greetingUtils";
import { globalStyles } from "../utils/globalStyles";
import CustomAvatar from "../components/CustomAvatar";
import { ImageContext } from "../context/ImageContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Svg, { Polygon, Path  } from 'react-native-svg';

export default function Home() {
  const { selectedImage } = useContext(ImageContext);

  const currentDate = getCurrentDate();
  const greeting = getGreeting();

  return (
    <View style={styles.container}>
      <View style={styles.viewMenu}>
        <Text style={[styles.textoMenu, globalStyles.semiBoldText]}>
          Hoje é, {currentDate}
        </Text>
        <View style={styles.viewImagem}>
          <CustomAvatar imageUri={selectedImage} size={80} />
          <View>
            <Text style={[globalStyles.semiBoldText, styles.textoImagem]}>
              {greeting},
            </Text>
            <Text style={[globalStyles.semiBoldText, styles.textoImagem]}>
              Aicha
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.viewPaginas}>

        <View style={styles.viewPagina}>
          <Pressable style={styles.buttonWrapper}>
          <Svg width="122" height="133" viewBox="0 0 122 133" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M18.5656 103.444C-2.09619 93.1658 -6.22413 65.4615 10.5438 49.6062L38.3851 23.2804C40.7971 20.9997 42.6561 18.198 43.8201 15.0893V15.0893C49.595 -0.333498 69.734 -4.02073 80.5986 8.3556L95.2436 25.0384C100.284 30.78 103.063 38.159 103.063 45.799V46.8092C103.063 52.6261 104.857 58.3015 108.201 63.0613L117.577 76.4077C128.307 91.6836 115.549 112.383 97.0805 109.662V109.662C88.351 108.376 79.7345 112.616 75.4268 120.316L74.9779 121.119C66.6486 136.009 45.4536 136.649 36.2414 122.288L31.0072 114.129C28.2355 109.808 24.3448 106.319 19.7487 104.033L18.5656 103.444Z" fill="#F1DAEA"/>
</Svg>


            <View style={styles.buttonContent}>
              <MaterialCommunityIcons
                name="clipboard-check-outline"
                size={50}
                color={"#ff80c3"}
              />
            </View>
              <Text style={styles.buttonText}>Diário</Text>
          </Pressable>
        </View>

        <View style={styles.viewPagina}>
          <Pressable style={styles.buttonWrapper}>
          <Svg width="109" height="122" viewBox="0 0 109 122" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M14.2456 82.056C-3.60009 74.0161 -3.85877 48.7688 13.8185 40.3649L15.4838 39.5733C20.3504 37.2596 24.289 33.3646 26.6566 28.524L29.9439 21.8031C35.9515 9.52039 47.9722 1.29867 61.5974 0.153218V0.153218C86.7294 -1.9596 107.185 20.0556 103.234 44.9649L102.059 52.3712C101.102 58.4108 102.114 64.5983 104.946 70.018V70.018C112.177 83.8557 106.915 100.936 93.1509 108.306L77.8474 116.5L71.196 118.983C53.7705 125.487 34.3737 116.617 27.8966 99.1811L26.3437 95.0008C24.2042 89.2417 19.8471 84.5795 14.2456 82.056V82.056Z" fill="#FFE5E5"/>
</Svg>


            <View style={styles.buttonContent}>
              <MaterialCommunityIcons
                name="emoticon-outline"
                size={50}
                color={"#ff80c3"}
              />
            </View>
              <Text style={styles.buttonText}>Humor</Text>
          </Pressable>
        </View>

        <View style={styles.viewPagina}>
          <Pressable style={styles.buttonWrapper}>
          <Svg width="110" height="123" viewBox="0 0 110 123" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M6.75469 87.2383C-3.39984 78.4617 -1.03102 62.1146 11.1971 56.5814V56.5814C16.5457 54.1611 20.4168 49.3318 21.6149 43.5846L25.3492 25.6718C25.706 23.96 26.2042 22.2808 26.8387 20.6515V20.6515C34.0418 2.15375 56.3098 -5.20822 73.1192 5.35074L88.2181 14.8351C96.6813 20.1514 102.848 28.4433 105.503 38.0785L106.928 43.2458C108.634 49.437 108.519 55.989 106.595 62.1162L103.685 71.3834C102.238 75.9942 103.136 81.0214 106.092 84.8453V84.8453C114.649 95.9183 104.451 111.578 90.8631 108.228L83.7201 106.467C77.0731 104.828 70.0842 107.254 65.8808 112.657L64.2318 114.777C54.0324 127.889 33.3809 124.602 27.7561 108.971V108.971C26.5296 105.563 24.4458 102.529 21.7054 100.16L6.75469 87.2383Z" fill="#FFF3DA"/>
</Svg>


            <View style={styles.buttonContent}>
              <MaterialCommunityIcons
                name="star-shooting-outline"
                size={50}
                color={"#ff80c3"}
              />
            </View>
              <Text style={styles.buttonText}>Percepções</Text>
          </Pressable>
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
    marginVertical: 30,
    padding: 15,
  },
  textoMenu: {
    fontSize: 15,
    color: "#a6a2a2",
  },
  viewImagem: {
    width: "52%",
    paddingTop: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textoImagem: {
    fontSize: 16,
  },
  viewPaginas: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  viewPagina: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonWrapper: {
    position: 'relative', // Permite sobreposição de conteúdo
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContent: {
    position: 'absolute', // Sobrepõe o conteúdo dentro do botão
    justifyContent: "center",
    alignItems: "center",
    width: '100%',
    height: '100%',
  },
  buttonText: {
    color: "#ff80c3",
    marginTop: 5,
  },
});
