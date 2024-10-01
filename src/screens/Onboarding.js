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
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
        duration: 1800,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          setIsAnimating(false);
        }, 4000); // 4 segundos
      });
    }
  }, [isAnimating, translateY]);

  const handleFinishOnboarding = async () => {
    await AsyncStorage.setItem("@has_seen_onboarding", "true");
    navigation.replace("Home");
  };

  if (hasSeenOnboarding) {
    return null;
  }

  const onboardingData = [
    {
      key: "1",
      title: "Bem-vindo ao App!",
      description: "Descubra a melhor forma de cuidar da sua pele.",
      image: require("../../assets/images/logo.png"),
    },
    {
      key: "2",
      title: "Ritual Personalizado",
      description: "Receba dicas personalizadas para a sua rotina de skincare.",
      image: require("../../assets/images/favicon.png"),
    },
    {
      key: "3",
      title: "Mantenha-se Atualizado",
      description: "Fique por dentro das últimas novidades e tendências.",
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.page}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      {item.key === "3" && (
        <Button title="Começar" onPress={handleFinishOnboarding} />
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
            source={require("../../assets/images/logo.png")} // Imagem que aparecerá na animação
            style={styles.animationImage}
          />
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
    height: height, // Define a altura da animação
    alignItems: "center",
    justifyContent: "center",
  },
  animationImage: {
    width: 200, // Ajuste a largura da imagem de animação conforme necessário
    height: 200, // Ajuste a altura da imagem de animação conforme necessário
    resizeMode: "contain",
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
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
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
});

export default Onboarding;
