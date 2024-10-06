import React, { useState } from "react";
import { Modal, Portal, Button, TextInput } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { saveProduct } from "../utils/storageUtils";
import { getAllCategories } from "../helpers/categoryHelper";

const ProdutoModal = ({ visible, onClose, onAdd }) => {
  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("");
  const [dataExpiracao, setDataExpiracao] = useState("");
  const [valorPago, setValorPago] = useState("");
  const categories = getAllCategories(); // Obtém todas as categorias

  const handleAddProduct = () => {
    const product = { nome, categoria, dataExpiracao, valorPago };
    saveProduct(product);
    onAdd(product);
    onClose();
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={styles.modal}
      >
        <TextInput
          label="Nome do Produto"
          value={nome}
          onChangeText={setNome}
        />
        {/* Substitui o TextInput de categoria pelo Picker */}
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={categoria}
            onValueChange={(itemValue) => setCategoria(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Selecione uma categoria" value="" />
            {categories.map((category, index) => (
              <Picker.Item key={index} label={category} value={category} />
            ))}
          </Picker>
        </View>
        <TextInput
          label="Data de Expiração"
          value={dataExpiracao}
          onChangeText={setDataExpiracao}
        />
        <TextInput
          label="Valor Pago"
          value={valorPago}
          onChangeText={setValorPago}
        />
        <Button mode="contained" onPress={handleAddProduct}>
          Confirmar
        </Button>
        <Button onPress={onClose}>Cancelar</Button>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
  },
  pickerContainer: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  picker: {
    height: 50,
    width: "100%",
  },
});

export default ProdutoModal;
