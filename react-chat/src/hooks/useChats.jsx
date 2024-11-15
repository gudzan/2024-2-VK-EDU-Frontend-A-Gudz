import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ROUTES from "../config/routes";
import chatService from "../api/chat/chatService";
const ChatsContext = React.createContext();

export const useChats = () => {
  return useContext(ChatsContext);
};

export const ChatsProvider = ({ children }) => {
  const navigate = useNavigate();
  const [chats, setChats] = useState(null)
  const [prevChats, setPrevChats] = useState(null)

  const getAllChats = async () => {
    try {
      const results = await chatService.getAllChats();
      setChats(results)
    } catch (error) {
      navigate(ROUTES.auth); 
      console.log(error);
    }
  }

  useEffect(() => {
    getAllChats();
    const intervalId = setInterval(() => {
      getAllChats();
    }, 5000);

    return () => {
      clearInterval(intervalId)
    };
  }, [])
  
  return (
    <ChatsContext.Provider value={{ chats, setChats, prevChats, setPrevChats, getAllChats }}>
      {children}
    </ChatsContext.Provider>
  );
};