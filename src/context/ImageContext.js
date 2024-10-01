import React, { createContext, useState } from "react";

// Cria o contexto
export const ImageContext = createContext();

// Provedor do contexto
export const ImageProvider = ({ children }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <ImageContext.Provider value={{ selectedImage, setSelectedImage }}>
      {children}
    </ImageContext.Provider>
  );
};
