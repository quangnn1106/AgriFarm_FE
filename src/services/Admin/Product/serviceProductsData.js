'use client'
// Create a context
import React, { createContext, useContext, useState } from 'react';

// Create a context
const ProductContext = createContext();

// Create a provider component
export const ProductProvider = ({ children }, createProducts) => {
  const [products, setProducts] = useState([]);

  setProducts(createProducts)

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};

// Consume the context using useContext hook
export const useProductContext = () => {
  return useContext(ProductContext);
};