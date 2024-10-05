import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveProduct = async (product) => {
  try {
    const storedProducts = await AsyncStorage.getItem("products");
    const products = storedProducts ? JSON.parse(storedProducts) : [];
    products.push(product);
    await AsyncStorage.setItem("products", JSON.stringify(products));
  } catch (error) {
    console.error("Erro ao salvar produto", error);
  }
};

export const loadProducts = async () => {
  try {
    const storedProducts = await AsyncStorage.getItem("products");
    return storedProducts ? JSON.parse(storedProducts) : [];
  } catch (error) {
    console.error("Erro ao carregar produtos", error);
    return [];
  }
};
