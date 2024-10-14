import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { globalStyles } from "../utils/globalStyles";
import { getCurrentDate } from "../utils/dateUtils";
import ProdutoModal from "../components/ProdutoModal";
import { loadProducts } from "../utils/storageUtils";
import { deleteProduct } from "../utils/deleteProduct";
import {
  addProductToCategory,
  getAllCategories,
  getProductsByCategory,
} from "../helpers/categoryHelper";
import { Trash2 } from "lucide-react-native";

export default function Produtos({ navigation }) {
  const currentDate = getCurrentDate();
  const [modalVisible, setModalVisible] = useState(false);
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const loadedProducts = await loadProducts();
      setProdutos(loadedProducts);
    };
    fetchProducts();
  }, []);

  const handleDeleteProduct = async (productName) => {
    const success = await deleteProduct(productName);
    if (success) {
      setProdutos((prev) =>
        prev.filter((produto) => produto.nome !== productName)
      );
    }
  };

  const confirmDelete = (productName) => {
    Alert.alert(
      "Confirmação de Exclusão",
      `Você tem certeza que deseja excluir o produto "${productName}"?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Confirmar",
          onPress: () => handleDeleteProduct(productName),
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  const handleAddProduct = (product) => {
    setProdutos((prev) => [...prev, product]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.viewMenu}>
        <Pressable
          onPress={() => {
            navigation.navigate("Início");
          }}
        >
          <MaterialCommunityIcons name="chevron-left-circle" size={35} />
        </Pressable>

        <View style={styles.viewTexto}>
          <Text style={[globalStyles.mediumText]}>Produtos</Text>
          <Text style={[styles.textoMenu, globalStyles.mediumText]}>
            Hoje é, {currentDate}
          </Text>
        </View>
      </View>

      {produtos.length === 0 ? (
        <View style={styles.viewFeadback}>
          <Image
            source={require("../../assets/images/triste.png")}
            style={styles.animationImage}
          />
          <View style={styles.feadback}>
            <Text style={[styles.textoFeadback, globalStyles.semiBoldText]}>
              Seu estoque de produtos está vazio
            </Text>
            <Text style={styles.textoMoreInfo}>
              Acompanhe todos os seus produtos para a pele, datas de validade,
              seus gastos e muito mais.
            </Text>
          </View>
        </View>
      ) : (
        <>
          <View style={styles.cuidados}>
            <Text style={[styles.textoCuidados, globalStyles.semiBoldText]}>
              Quantidade:
            </Text>
            <Text style={[styles.textoCuidados, globalStyles.semiBoldText]}>
              Valor Total: R$
            </Text>
          </View>

          <ScrollView style={styles.viewProdutos}>
            {produtos.map((produto, index) => (
              <Pressable key={index} style={styles.produto}>
                <View>
                  <Image
                    source={require("../../assets/images/cream.png")}
                    style={styles.produtoImage}
                  />
                </View>

                <View>
                  <Text style={styles.nome}>{produto.nome}</Text>
                  <Text style={styles.infoProdutos}>
                    Categoria: {produto.categoria}
                  </Text>
                  <View style={styles.demaisInfo}>
                    <Text style={styles.infoProdutos}>
                      Expiração: {produto.dataExpiracao}
                    </Text>
                    <Text style={styles.infoProdutos}>
                      Valor: {produto.valorPago}
                    </Text>
                  </View>
                </View>

                <Pressable
                  style={styles.lixeira}
                  onPress={() => confirmDelete(produto.nome)}
                >
                  <Trash2 size={25} color="#ed1111" />
                </Pressable>
              </Pressable>
            ))}
          </ScrollView>
        </>
      )}

      <View style={styles.viewBotaoAdd}>
        <Pressable
          style={styles.botaoAdd}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textoBotaoAdd}>Add Produto</Text>
        </Pressable>
      </View>
      <ProdutoModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={handleAddProduct}
      />
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
    padding: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "73%",
  },
  viewTexto: {
    justifyContent: "center",
    alignItems: "center",
  },
  textoMenu: {
    fontSize: 13,
    color: "#a6a2a2",
  },
  cuidados: {
    padding: 10,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textoCuidados: {
    color: "#0B224C",
  },
  viewFeadback: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: "auto",
  },
  animationImage: {
    width: 65,
    height: 65,
    resizeMode: "contain",
    borderRadius: 100,
    backgroundColor: "transparent",
  },
  feadback: {
    justifyContent: "center",
    alignItems: "center",
    padding: 35,
  },
  textoFeadback: {
    width: "100%",
  },
  textoMoreInfo: {
    fontSize: 13,
    color: "#a6a2a2",
    textAlign: "center",
  },
  viewBotaoAdd: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  botaoAdd: {
    backgroundColor: "#ff80c3",
    padding: 15,
    width: "100%",
    borderRadius: 20,
  },
  textoBotaoAdd: {
    color: "#ffff",
    fontSize: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
  produto: {
    backgroundColor: "#faf7f7",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    elevation: 1,
  },
  nome: {
    padding: 2,
    fontSize: 14.5,
    color: "#4E4E4E",
    fontWeight: "bold",
  },
  infoProdutos: {
    padding: 2,
    fontSize: 14,
    color: "#4E4E4E",
  },
  demaisInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  produtoImage: {
    width: 65,
    height: 65,
    resizeMode: "contain",
    backgroundColor: "transparent",
  },
  lixeira: {
    width: 55,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
});
