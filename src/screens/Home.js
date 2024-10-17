import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  Animated,
} from "react-native";
import { getCurrentDate } from "../utils/dateUtils";
import { getGreeting } from "../utils/greetingUtils";
import { globalStyles } from "../utils/globalStyles";
import CustomAvatar from "../components/CustomAvatar";
import { ImageContext } from "../context/ImageContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Svg, { Path } from "react-native-svg";
import { Badge } from "react-native-paper";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import { Bell } from "lucide-react-native";
import Swiper from "react-native-swiper";

export default function Home({ navigation }) {
  const { selectedImage } = useContext(ImageContext);

  const currentDate = getCurrentDate();
  const greeting = getGreeting();

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "#6200ee",
      accent: "#03dac4",
    },
  };

  return (
    <>
      <View style={styles.viewMenu}>
        <View style={styles.viewNotificacao}>
          <Text style={[styles.textoMenu, globalStyles.semiBoldText]}>
            Hoje é, {currentDate}
          </Text>
          <Pressable style={styles.bellContainer}>
            <Bell color="#121212" size={30} />
            <Badge style={styles.badge} size={20}>
              3
            </Badge>
          </Pressable>
        </View>
        <View style={styles.viewImagem}>
          <View style={styles.avatarContainer}>
            <CustomAvatar imageUri={selectedImage} size={70} />
          </View>
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
      <ScrollView style={styles.container}>
        <View style={styles.viewPaginas}>
          <View style={styles.viewPagina}>
            <Pressable
              style={styles.buttonWrapper}
              onPress={() => {
                navigation.navigate("Scan");
              }}
            >
              <Svg
                width="90"
                height="110"
                viewBox="0 0 109 123"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Path
                  d="M16.8846 95.4338C-1.49599 85.665 -5.25823 60.9379 9.38521 46.1445L34.8438 20.4253C36.8506 18.3979 38.3812 15.9495 39.3247 13.2574V13.2574C44.2839 -0.892831 62.8106 -4.17536 72.3295 7.4097L84.5358 22.2654C88.9527 27.641 91.3672 34.3828 91.3672 41.3402V42.9851C91.3672 48.2103 92.8969 53.3212 95.7676 57.6872L105.534 72.541C114.546 86.2478 103.011 104.14 86.8065 101.589V101.589C78.8025 100.329 70.8861 104.312 67.1277 111.49L66.8739 111.975C59.7559 125.57 40.5021 126.132 32.6028 112.976L28.023 105.349C25.7179 101.51 22.4108 98.3708 18.4567 96.2693L16.8846 95.4338Z"
                  fill="#ff80c3"
                />
              </Svg>

              <View style={styles.buttonContent}>
                <Image
                  source={require("../../assets/images/generator.png")}
                  style={styles.produtoImage}
                />
              </View>
              <Text style={[styles.buttonText, globalStyles.text]}>
                Análise
              </Text>
            </Pressable>
          </View>
          <View style={styles.viewPagina}>
            <Pressable
              style={styles.buttonWrapper}
              onPress={() => {
                navigation.navigate("Relatorio");
              }}
            >
              <Svg
                width="90"
                height="110"
                viewBox="0 0 109 123"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Path
                  d="M16.8846 95.4338C-1.49599 85.665 -5.25823 60.9379 9.38521 46.1445L34.8438 20.4253C36.8506 18.3979 38.3812 15.9495 39.3247 13.2574V13.2574C44.2839 -0.892831 62.8106 -4.17536 72.3295 7.4097L84.5358 22.2654C88.9527 27.641 91.3672 34.3828 91.3672 41.3402V42.9851C91.3672 48.2103 92.8969 53.3212 95.7676 57.6872L105.534 72.541C114.546 86.2478 103.011 104.14 86.8065 101.589V101.589C78.8025 100.329 70.8861 104.312 67.1277 111.49L66.8739 111.975C59.7559 125.57 40.5021 126.132 32.6028 112.976L28.023 105.349C25.7179 101.51 22.4108 98.3708 18.4567 96.2693L16.8846 95.4338Z"
                  fill="#ff80c3"
                />
              </Svg>

              <View style={styles.buttonContent}>
                <Image
                  source={require("../../assets/images/docum.png")}
                  style={styles.produtoImage}
                />
              </View>
              <Text style={[styles.buttonText, globalStyles.text]}>
                Relatório
              </Text>
            </Pressable>
          </View>

          <View style={styles.viewPagina}>
            <Pressable
              style={styles.buttonWrapper}
              onPress={() => {
                navigation.navigate("Calendario");
              }}
            >
              <Svg
                width="90"
                height="110"
                viewBox="0 0 109 123"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Path
                  d="M16.8846 95.4338C-1.49599 85.665 -5.25823 60.9379 9.38521 46.1445L34.8438 20.4253C36.8506 18.3979 38.3812 15.9495 39.3247 13.2574V13.2574C44.2839 -0.892831 62.8106 -4.17536 72.3295 7.4097L84.5358 22.2654C88.9527 27.641 91.3672 34.3828 91.3672 41.3402V42.9851C91.3672 48.2103 92.8969 53.3212 95.7676 57.6872L105.534 72.541C114.546 86.2478 103.011 104.14 86.8065 101.589V101.589C78.8025 100.329 70.8861 104.312 67.1277 111.49L66.8739 111.975C59.7559 125.57 40.5021 126.132 32.6028 112.976L28.023 105.349C25.7179 101.51 22.4108 98.3708 18.4567 96.2693L16.8846 95.4338Z"
                  fill="#ff80c3"
                />
              </Svg>

              <View style={styles.buttonContent}>
                {/* <MaterialCommunityIcons
                name="clipboard-check-outline"
                size={45}
                color={"#2D2D2D"}
              /> */}
                <Image
                  source={require("../../assets/images/agenda.png")}
                  style={styles.produtoImage}
                />
              </View>
              <Text style={[styles.buttonText, globalStyles.text]}>
                Calendário
              </Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.jornada}>
          <Text style={[globalStyles.mediumText, styles.textoJornada]}>
            Verificação diária de Skincare
          </Text>

          <View>
            <Pressable style={styles.feito}>
              <Image
                source={require("../../assets/images/relogio.png")}
                style={styles.animationImage}
              />

              <Text style={styles.textoRotinas}>Rotina Matinal</Text>
            </Pressable>

            <Pressable style={styles.feito2}>
              <Image
                source={require("../../assets/images/cloud.png")}
                style={styles.animationImage}
              />

              <Text style={styles.textoRotinas}>Rotina Nortuna</Text>
            </Pressable>
          </View>
        </View>

        <View>
          <Text style={[globalStyles.mediumText, styles.textoSugestao]}>
            O que você quer fazer hoje?
          </Text>

          <View style={styles.viewSugestoes}>
            <View style={styles.sugestao1}>
              <Image
                source={require("../../assets/images/lupa.png")}
                style={styles.imagemSugestao}
              />
              <Text style={styles.textoProcurar}>Procurar Produtos</Text>
            </View>

            <View style={styles.sugestao2}>
              <Image
                source={require("../../assets/images/scan-code.png")}
                style={styles.imagemSugestao}
              />
              <Text style={styles.textoScanear}>Scanear Produtos</Text>
            </View>
          </View>
        </View>

        <View style={styles.wrapperContainer}>
          <Swiper
            style={styles.wrapper}
            showsButtons={false}
            autoplay={true}
            autoplayTimeout={1117}
            paginationStyle={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              alignItems: "center",
            }}
          >
            <View style={styles.slide1}>
              <Image
                source={require("../../assets/images/share.jpg")}
                style={styles.image}
              />
              <View style={styles.textContainer}>
                <Text style={styles.text}>Compartilhe o Skincare Routine</Text>
                <Text style={styles.textDescription}>
                  Ajude seus amigos a conhecer o melhor app de cuidados com a
                  pele 😍
                </Text>
              </View>
            </View>
            <View style={styles.slide2}>
              <Image
                source={require("../../assets/images/solar.jpg")}
                style={styles.image}
              />
              <View style={styles.textContainer}>
                <Text style={styles.text}>Faça Parte da Nossa Jornada</Text>
                <Text>Deixe sua pele radiante</Text>
              </View>
            </View>
            <View style={styles.slide3}>
              <Image
                source={require("../../assets/images/bell2.jpg")}
                style={styles.image}
              />
              <View style={styles.textContainer}>
                <Text style={styles.text}>Alerta de Irritação! 📢</Text>
                <Text style={styles.textDescription}>
                  Sinais de irritação? Use nossa IA para descobrir as possíveis
                  causas
                </Text>
              </View>
            </View>
          </Swiper>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffff",
    flex: 1,
  },
  viewMenu: {
    paddingTop: 40,
    backgroundColor: "#ffff",
    padding: 15,
    paddingBottom: 0,
    marginBottom: 0,
  },
  textoMenu: {
    fontSize: 15,
    color: "#a6a2a2",
  },
  viewImagem: {
    width: "50%",
    paddingTop: 14,
    paddingBottom: 35,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textoImagem: {
    fontSize: 16,
  },
  viewPaginas: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  viewPagina: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonWrapper: {
    position: "relative",
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContent: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    paddingBottom: 30,
  },
  buttonText: {
    color: "#2D2D2D",
    marginTop: 15,
    fontSize: 14,
  },
  jornada: {
    marginTop: 60,
    padding: 15,
  },
  textoJornada: {
    fontSize: 19,
    paddingBottom: 20,
  },
  feito: {
    margin: 10,
    backgroundColor: "#FFE5E5",
    padding: 15,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  feito2: {
    margin: 10,
    backgroundColor: "#F1DAEA",
    padding: 15,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  textoRotinas: {
    width: "48%",
    textAlign: "right",
    fontSize: 17,
    fontWeight: "bold",
    color: "#0B224C",
  },
  animationImage: {
    width: 90,
    height: 90,
    resizeMode: "contain",
  },

  produtoImage: {
    width: 55,
    height: 55,
    resizeMode: "contain",
    backgroundColor: "transparent",
  },
  viewNotificacao: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bellContainer: {
    position: "relative",
    padding: 5,
  },
  badge: {
    position: "absolute",
    top: -5,
    right: -10,
    backgroundColor: "red",
    color: "white",
  },
  wrapperContainer: {
    width: "90%",
    height: 110,
    margin: 20,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#ffff",
    elevation: 2,
    marginBottom: 50,
  },
  slide1: {
    flex: 1,
    backgroundColor: "#DCE6FF",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 0,
    margin: 0,
  },
  image: {
    width: 110,
    height: 112,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  textContainer: {
    flexDirection: "column",
    marginLeft: 6,
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    padding: 0,
    margin: 0,
  },
  text: {
    margin: 0,
    padding: 0,
    textAlign: "right",
    fontSize: 14,
    fontWeight: "bold",
  },
  slide2: {
    flex: 1,
    backgroundColor: "#EC71A8",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  slide3: {
    flex: 1,
    backgroundColor: "#F7E790",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  textDescription: {
    width: "45%",
  },
  avatarContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: "#ff80c3",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  textoSugestao: {
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
  },
  viewSugestoes: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 30,
  },
  sugestao1: {
    backgroundColor: "#e0cffc",
    padding: 10,
    borderRadius: 20,
  },
  sugestao2: {
    backgroundColor: "#d5e9f2",
    padding: 10,
    borderRadius: 20,
  },
  imagemSugestao: {
    width: 150,
    height: 100,
    resizeMode: "contain",
  },
  textoProcurar: {
    color: "#7a60a3",
    fontSize: 14,
    padding: 5,
    fontWeight: "black",
  },
  textoScanear: {
    color: "#54798a",
    fontSize: 14,
    padding: 5,
    fontWeight: "black",
  },
});
