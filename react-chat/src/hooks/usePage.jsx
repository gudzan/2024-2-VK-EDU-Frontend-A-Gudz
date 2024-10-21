import React, { useContext, useState } from "react";
const PageContext = React.createContext();

export const usePage = () => {
  return useContext(PageContext);
};

export const PageProvider = ({ children }) => {
  const [chatId, setChatId] = useState("");

  return (
    <PageContext.Provider value={{ chatId, setChatId }}>
      {children}
    </PageContext.Provider>
  );
};
