import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { globalStyles } from "../utils/globalStyles";
import { getCurrentDate } from "../utils/dateUtils";
import ProdutoModal from "../components/ProdutoModal";
import { loadProducts } from "../utils/storageUtils";
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

  const handleAddProduct = (product) => {
    setProdutos((prev) => [...prev, product]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.viewMenu}>
        <Pressable
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <MaterialCommunityIcons name="chevron-left" size={35} />
        </Pressable>

        <View style={styles.viewTexto}>
          <Text style={[globalStyles.mediumText]}>Produtos</Text>
          <Text style={[styles.textoMenu, globalStyles.mediumText]}>
            Hoje é, {currentDate}
          </Text>
        </View>
      </View>

      <View style={styles.cuidados}>
        <Text style={[styles.textoCuidados, globalStyles.semiBoldText]}>
          Adicione Aqui os seus Produtos!
        </Text>
      </View>
      {produtos.length === 0 ? (
        <View style={styles.viewFeadback}>
          <Image
            source={require("../../assets/images/triste.png")}
            style={styles.animationImage}
          />
          <View style={styles.feadback}>
            <Text style={[styles.textoFeadback, globalStyles.semiBoldText]}>
              Meu estoque de produtos está vazio
            </Text>
            <Text style={styles.textoMoreInfo}>
              Acompanhe todos os seus produtos para a pele, datas de validade,
              seus gastos e muito mais.
            </Text>
          </View>
        </View>
      ) : (
        <ScrollView style={styles.viewProdutos}>
          {produtos.map((produto, index) => (
            <View key={index} style={styles.produto}>
              <View>
                <Image
                  source={require("../../assets/images/tube.png")}
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

              <Pressable style={styles.lixeira}>
                <Trash2 size={35} color="#ba1e2b" />
              </Pressable>
            </View>
          ))}
        </ScrollView>
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
    backgroundColor: "#D5E9E9",
    padding: 10,
    marginBottom: 20,
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
    padding: 20,
  },
  botaoAdd: {
    backgroundColor: "#79B7B7",
    padding: 14,
    width: "100%",
    borderRadius: 20,
  },
  textoBotaoAdd: {
    color: "#ffff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  produto: {
    backgroundColor: "#79B7B7",
    margin: 10,
    padding: 10,
    borderRadius: 20,
    flexDirection: "row",
  },
  nome: {
    padding: 2,
    fontSize: 14.5,
    color: "white",
    fontWeight: "bold",
  },
  infoProdutos: {
    padding: 2,
    fontSize: 14,
    color: "white",
  },
  demaisInfo: {
    // backgroundColor: "red",
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
    // backgroundColor: "yellow",
    width: 55,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
});
