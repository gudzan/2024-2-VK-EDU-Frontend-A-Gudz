import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { chatRequest } from "../../store/chats/chats";

const ChatPolling = ({ children }) => {
  const dispatch = useDispatch();

  const getAllChats = async () => {
    dispatch(chatRequest())
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
    <>
      {children}
    </>
  );
}

export default ChatPolling;
