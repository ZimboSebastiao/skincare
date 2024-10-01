import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

const Onboarding = ({ navigation }) => {
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0); // Estado para armazenar o índice da página atual

  useEffect(() => {
    const checkOnboarding = async () => {
      const value = await AsyncStorage.getItem("@has_seen_onboarding");
      if (value === "true") {
        setHasSeenOnboarding(true);
      }
    };
    checkOnboarding();
  }, []);

  const handleFinishOnboarding = async () => {
    await AsyncStorage.setItem("@has_seen_onboarding", "true");
    navigation.replace("Home"); // Navega para a tela principal do app
  };

  if (hasSeenOnboarding) {
    return null; // Não exibe nada se já passou pelo onboarding
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

  // Função para atualizar o índice da página atual
  const onViewRef = React.useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index); // Atualiza o índice da página
  });
  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });

  return (
    <View style={styles.container}>
      <FlatList
        data={onboardingData}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer}
        style={{ width }} // Definindo a largura da FlatList
        onViewableItemsChanged={onViewRef.current} // Atualiza o índice ao mudar de página
        viewabilityConfig={viewConfigRef.current} // Configuração de visibilidade
      />
      <View style={styles.dotsContainer}>
        {onboardingData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
  },
  flatListContainer: {
    flexGrow: 1,
  },
  page: {
    width, // Cada página ocupa a largura total da tela
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
    backgroundColor: "#ff80c3", // Cor do ponto ativo
  },
  inactiveDot: {
    backgroundColor: "#c2bebe", // Cor do ponto inativo
  },
});

export default Onboarding;
