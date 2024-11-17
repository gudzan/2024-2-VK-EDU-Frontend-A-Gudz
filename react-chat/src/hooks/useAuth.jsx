import React, { useContext, useEffect, useState } from "react";
import { getAccessToken, logOutLocalStorage } from "../api/localSrorage";
import { useNavigate } from "react-router-dom";
import ROUTES from "../config/routes";
const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isAuth, setAuth] = useState(getAccessToken() !== null);

  useEffect(() => {
    const at = getAccessToken()
    if (at === null) {
      toAuth()
    }
    

    console.log(at);
  }, [])

  const toAuth = () => {
    setAuth(false)
    logOutLocalStorage()
    navigate(ROUTES.auth)
  }

  return (
    <AuthContext.Provider value={{ isAuth, setAuth, toAuth }}>
      {children}
    </AuthContext.Provider>
  );
};