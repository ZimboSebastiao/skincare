import AsyncStorage from "@react-native-async-storage/async-storage";

// Função para deletar um produto pelo nome
export const deleteProduct = async (productName) => {
  try {
    const storedProducts = await AsyncStorage.getItem("products");
    const products = storedProducts ? JSON.parse(storedProducts) : [];

    // Filtrar os produtos removendo aquele que possui o nome passado
    const updatedProducts = products.filter(
      (product) => product.nome !== productName
    );

    // Atualizar o armazenamento local com a nova lista de produtos
    await AsyncStorage.setItem("products", JSON.stringify(updatedProducts));

    return true;
  } catch (error) {
    console.error("Erro ao deletar o produto:", error);
    return false;
  }
};
