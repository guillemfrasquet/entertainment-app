import { createContext, useContext, useEffect, useState } from "react";

// Creamos el contexto
const SavedItemsContext = createContext();

// Hook para acceder fácilmente al contexto
export const useSavedItems = () => useContext(SavedItemsContext);

// Proveedor del contexto
export const SavedItemsProvider = ({ children }) => {
  const [savedItems, setSavedItems] = useState(() => {
    const stored = localStorage.getItem('savedItems');
    return stored ? JSON.parse(stored) : [];
  });

  // Actualiza localStorage cada vez que cambie el array
  useEffect(() => {
    localStorage.setItem('savedItems', JSON.stringify(savedItems));
  }, [savedItems]);

  const toggleSaveItem = (key) => {
  setSavedItems((prev) =>
    prev.includes(key) 
      ? prev.filter((item) => item !== key)  // Si ya está en savedItems, lo elimina (quita ese key)
      : [...prev, key]                       // Si no está, lo añade al array
  );

  return (
    <SavedItemsContext.Provider value={{ savedItems, toggleSaveItem }}>
      {children}
    </SavedItemsContext.Provider>
  );
};
};