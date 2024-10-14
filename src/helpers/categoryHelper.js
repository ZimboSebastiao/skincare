const categories = {
  "Área dos Olhos": [],
  "Óleos Faciais": [],
  Máscaras: [],
  "Protetores Solares": [],
  Séruns: [],
  Hidratantes: [],
  Tônicos: [],
  Esfoliantes: [],
  Limpadores: [],
};

// Função para adicionar um produto a uma categoria
export const addProductToCategory = (category, product) => {
  if (categories[category]) {
    categories[category].push(product);
  } else {
    console.error("Categoria não encontrada");
  }
};

// Função para acessar produtos de uma categoria
export const getProductsByCategory = (category) => {
  return categories[category] || [];
};

// Exportando todas as categorias
export const getAllCategories = () => Object.keys(categories);
