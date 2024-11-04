import React, { useContext, useEffect, useState } from "react";
import { getAccessToken } from "../api/localSrorage";
const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuth, setAuth] = useState(getAccessToken() !== null);

  return (
    <AuthContext.Provider value={{ isAuth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};