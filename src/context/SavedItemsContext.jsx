import { createContext, useContext, useEffect, useState } from "react";

// Creamos el contexto
const SavedItemsContext = createContext();

// Hook para acceder fácilmente al contexto
export const useSavedItems = () => useContext(SavedItemsContext);

// Proveedor del contexto
export const SavedItemsProvider = ({ children }) => {
  const [savedItems, setSavedItems] = useState(() => {
    const stored = localStorage.getItem('savedItems');
    return stored ? JSON.parse(stored) : { series: [], movie: [] };
  });

  // Actualiza localStorage cada vez que cambie el array
  useEffect(() => {
    localStorage.setItem('savedItems', JSON.stringify(savedItems));
  }, [savedItems]);

  const toggleSaveItem = (type, id) => {
    setSavedItems((prev) => {
        id = String(id);
        const current = prev[type] || [];
        const exists = current.includes(id);
        const updated = exists
            ? current.filter((itemId) => itemId !== id)
            : [...current, id];

        return { ...prev, [type]: updated };
    });
  };

  const isSaved = (type, id) => {
    return savedItems[type]?.includes(String(id));
  };

  return (
    <SavedItemsContext.Provider value={{ savedItems, toggleSaveItem, isSaved }}>
      {children}
    </SavedItemsContext.Provider>
  );
};