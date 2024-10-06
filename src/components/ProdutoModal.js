import React, { useState } from "react";
import { Modal, Portal, Button } from "react-native-paper";
import { View, StyleSheet, TextInput } from "react-native";
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
          value={nome}
          onChangeText={setNome}
          placeholder="Nome do Produto"
          style={styles.inputs}
        />

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
          placeholder="Data de Expiração"
          value={dataExpiracao}
          onChangeText={setDataExpiracao}
          style={styles.input}
        />
        <TextInput
          placeholder="Valor Pago"
          value={valorPago}
          onChangeText={setValorPago}
          style={styles.inputs}
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
    borderRadius: 15,
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
  inputs: {
    borderColor: "#ccc",
    borderWidth: 0.9,
    padding: 10,
    borderRadius: 7,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 0.9,
    padding: 10,
    borderRadius: 7,
    marginBottom: 10,
  },
});

export default ProdutoModal;
