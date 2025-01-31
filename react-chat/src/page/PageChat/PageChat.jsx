import { useEffect, useRef, useState } from "react";
import styles from "./PageChat.module.scss";
import MessagesList from "../../components/MessagesList";
import Layout from "../../components/Layout";
import FooterChat from "../../components/FooterChat";
import { useNavigate, useParams } from "react-router-dom";
import chatApi from "../../api/chat/chatApi";
import messageApi from "../../api/message/messageApi";
import { notifyMe } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/auth/auth";
import { setPrevChats } from "../../store/chats/chats";
import { selectChats, selectPrevChats } from "../../store/chats/chatsSelectors";
import Header from "../../components/Headers/Header/Header";
import ROUTES from "../../config/routes";

const PageChat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const messagesRef = useRef(null);
  const { chatId } = useParams();
  const [newMessage, setNewMessage] = useState(null);
  const [messages, setMessages] = useState(null);
  const [chat, setChat] = useState(null);
  const chats = useSelector(selectChats);
  const prevChats = useSelector(selectPrevChats);

  const getChat = async () => {
    try {
      const chat = await chatApi.getChat(chatId);
      if (chat) {
        setChat(chat);
      }
    } catch (error) {
      if (error.status === 401) {
        dispatch(logOut());
      }
      if (error.status === 404) {
        navigate(ROUTES.root);
      }
    }
  };

  const getDiffChats = (current, prev) => {
    const filter = (item) => {
      return item.id !== chatId
        && item.last_message !== undefined && item.last_message !== null
        && (item.last_message.text !== "" || item.last_message.files.length > 0 || item.last_message.voice !== undefined || item.last_message.voice !== null);
    };

    if (current.length === 0 || prev.length === 0) {
      return [];
    }

    current = current.filter(filter);
    prev = prev.filter(filter);

    return current.filter((item, index) =>
      item.last_message.id !== prev[index].last_message.id
    );
  };

  useEffect(() => {
    if (chats.length !== 0 && prevChats.length !== 0) {
      const diffChats = getDiffChats(chats, prevChats);
      if (diffChats.length > 0) {
        diffChats.forEach(element => {
          notifyMe(element.last_message, element.avatar);
        });
        dispatch(setPrevChats(chats));
      }
    }
    else if (prevChats.length === 0) {
      dispatch(setPrevChats(chats));
    }
  }, [chats, prevChats]);

  const getMessages = async () => {
    try {
      const results = await messageApi.getMessages(chatId);
      setMessages(results);
    } catch (error) {
      console.log(error);
      if (error.status === 401) {
        dispatch(logOut());
      }
    }
  };

  useEffect(() => {
    getChat();
    getMessages();
    const intervalId = setInterval(() => {
      getMessages();
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    messagesRef.current.scrollTo(0, messagesRef.current.scrollHeight);
  }, [messages, newMessage]);

  const sendMessage = async (formData) => {
    formData.append("chat", chatId);
    try {
      const data = await messageApi.createNewMessage(formData);
      if (data) {
        setNewMessage(data);
        getMessages();
      }
    } catch (error) {
      console.log(error);
      if (error.status === 401) {
        dispatch(logOut());
      }
    }
  };

  return (
    <Layout>
      <Header chat={chat} />
      <main className={styles.messages} ref={messagesRef}>
        <MessagesList messages={messages} newMessage={newMessage} />
      </main>
      <FooterChat sendMessage={sendMessage} />
    </Layout>
  );
};

export default PageChat;
