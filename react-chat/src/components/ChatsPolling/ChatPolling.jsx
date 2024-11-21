import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { chatRequest } from "../../store/chats";


const ChatPolling = ({ children }) => {
  const dispatch = useDispatch();
  const { isSuccess } = useSelector((state) => state.auth)

  const getAllChats = async () => {
    if (isSuccess) {
      dispatch(chatRequest())
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
  }, [isSuccess])

  return (
    <>
      {children}
    </>
  );
}

export default ChatPolling;
