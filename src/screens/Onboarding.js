import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  FlatList,
  Dimensions,
  Animated,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { globalStyles } from "../utils/globalStyles";

const { width, height } = Dimensions.get("window");

const Onboarding = ({ navigation }) => {
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true); // Estado para controlar a animação
  const translateY = useRef(new Animated.Value(-height)).current; // Inicializa a animação fora da tela

  useEffect(() => {
    const checkOnboarding = async () => {
      const value = await AsyncStorage.getItem("@has_seen_onboarding");
      if (value === "true") {
        setHasSeenOnboarding(true);
      }
    };
    checkOnboarding();
  }, []);

  useEffect(() => {
    if (isAnimating) {
      Animated.timing(translateY, {
        toValue: height / 14,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          setIsAnimating(false);
        }, 3000); // 3 segundos
      });
    }
  }, [isAnimating, translateY]);

  const handleFinishOnboarding = async () => {
    await AsyncStorage.setItem("@has_seen_onboarding", "true");
    navigation.navigate("Home");
  };

  if (hasSeenOnboarding) {
    return null;
  }

  const onboardingData = [
    {
      key: "1",
      title: ["Descubra Sua Rotina", "De Cuidados Com A ", "Pele Perfeita"],
      image: require("../../assets/images/casual.png"),
    },
    {
      key: "2",
      title: [
        "Analise Sua Pele Para",
        "Recomendações De",
        "Cuidados Personalizados",
      ],

      image: require("../../assets/images/isometric.gif"),
    },
    {
      key: "3",
      title: [
        "Conheça AI Health: Seu",
        "Assistente Inteligente",
        "De Cuidados Com A Pele",
      ],
      image: require("../../assets/images/chatbot.png"),
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.page}>
      <Image source={item.image} style={styles.image} />
      {item.title.map((line, index) => (
        <Text key={index} style={styles.title}>
          {line}
        </Text>
      ))}
      <Text style={styles.description}>{item.description}</Text>
      {item.key === "3" && (
        // <Button title="Começar" onPress={handleFinishOnboarding} />
        <Pressable style={styles.botaoComecar} onPress={handleFinishOnboarding}>
          <Text style={styles.textoComecar}>Começar</Text>
        </Pressable>
      )}
    </View>
  );

  const onViewRef = React.useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  });
  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });

  return (
    <View style={styles.container}>
      {isAnimating ? (
        <Animated.View
          style={[styles.animationContainer, { transform: [{ translateY }] }]}
        >
          <Image
            source={require("../../assets/images/logo_transparent.png")}
            style={styles.animationImage}
          />
          <View style={styles.inicialImagem}>
            <Image
              source={require("../../assets/images/brown.png")}
              style={styles.animationImage}
            />
          </View>
          <View style={styles.viewInicial}>
            <Text style={[globalStyles.semiBoldText, styles.textoInicial]}>
              Transforme Sua Pele
            </Text>
            <Text style={[globalStyles.semiBoldText, styles.textoInicial]}>
              Com Cuidados
            </Text>
            <Text style={[globalStyles.semiBoldText, styles.textoInicial]}>
              Personalizados
            </Text>
          </View>
        </Animated.View>
      ) : (
        <>
          <FlatList
            data={onboardingData}
            renderItem={renderItem}
            keyExtractor={(item) => item.key}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flatListContainer}
            style={{ width }}
            onViewableItemsChanged={onViewRef.current}
            viewabilityConfig={viewConfigRef.current}
          />
          <View style={styles.dotsContainer}>
            {onboardingData.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  currentIndex === index
                    ? styles.activeDot
                    : styles.inactiveDot,
                ]}
              />
            ))}
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
  },
  animationContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: height,
    alignItems: "center",
    justifyContent: "center",
  },
  animationImage: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    borderRadius: 100,
  },
  flatListContainer: {
    flexGrow: 1,
  },
  page: {
    width,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  image: {
    width: "100%",
    height: 250,
    resizeMode: "contain",
    marginBottom: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 6,
    color: "#ff80c3",
    justifyContent: "center",
    alignItems: "center",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 5,
  },
  activeDot: {
    backgroundColor: "#ff80c3",
  },
  inactiveDot: {
    backgroundColor: "#c2bebe",
  },
  textoInicial: {
    color: "#ff80c3",
    fontSize: 23,
  },
  viewInicial: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30,
  },
  inicialImagem: {
    backgroundColor: "#fafafa",
    padding: 10,
    borderRadius: 100,
  },
  botaoComecar: {
    backgroundColor: "#6a9ca7",
    width: "70%",
    padding: 15,
    borderRadius: 25,
    marginTop: 60,
  },
  textoComecar: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "#ffff",
  },
});

export default Onboarding;
