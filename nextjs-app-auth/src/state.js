import { createContext, useContext, useState } from 'react';

export const AppContext = createContext();

export function AppWrapper({ children }) {
  
  const [commentsData, setCommentsData] = useState([]);
  const [productsData, setProductsData] = useState([]);

  return (
    <AppContext.Provider value={{commentsData, setCommentsData, productsData, setProductsData}}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}