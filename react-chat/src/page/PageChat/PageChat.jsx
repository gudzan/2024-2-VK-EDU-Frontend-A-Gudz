import React, { useEffect, useRef, useState } from "react";
import styles from "./PageChat.module.scss"
import MessagesList from "../../components/MessagesList";
import Layout from "../../components/Layout";
import FooterChat from "../../components/FooterChat";
import { HeaderPageChat } from "../../components/Headers";
import { useNavigate, useParams } from "react-router-dom";
import chatService from "../../api/chat/chatService";
import messageService from "../../api/message/messageService";
import ROUTES from "../../config/routes";
import { useChats } from "../../hooks/useChats";
import { notifyMe } from "../../utils";

const PageChat = () => {
  const navigate = useNavigate();
  const messagesRef = useRef(null)
  const { chatId } = useParams();
  const [newMessage, setNewMessage] = useState(null)
  const [messages, setMessages] = useState(null)
  const [chat, setChat] = useState(null)
  const { chats, prevChats, setPrevChats } = useChats()

  const getChat = async () => {
    try {
      const chat = await chatService.getChat(chatId);
      if (chat) {
        setChat(chat)
      }
    } catch (error) {
      navigate(ROUTES.auth);
      console.log(error);
    }
  }

  const getDiffChats = (current, prev) => {
    const filter = (item) => {
      return item.id !== chatId 
      && item.last_message !== undefined 
      && (item.last_message.text !== "" || item.last_message.files.length > 0 || item.last_message.voice !== undefined || item.last_message.voice !== null)
    }

    if (current === null || prev === null) {
      return []
    }

    current = current.filter(filter);
    prev = prev.filter(filter);

    return current.filter((item, index) =>
      item.last_message.id !== prev[index].last_message.id
    );
  }

  useEffect(() => {
    if (chats !== null && prevChats !== null) {
      const diffChats = getDiffChats(chats, prevChats)
      if (diffChats.length > 0) {
        diffChats.forEach(element => {
          notifyMe(element.last_message, element.avatar)
        });
        setPrevChats(chats)
      }
    }
    else if (prevChats === null) {
      setPrevChats(chats)
    }
  }, [chats, prevChats])

  const getMessages = async () => {
    try {
      const results = await messageService.getMessages(chatId);
      setMessages(results)
    } catch (e) {
      navigate(ROUTES.auth);
      console.log(error);
    }
  }

  useEffect(() => {
    getChat()
    getMessages();
    const intervalId = setInterval(() => {
      getMessages();
    }, 5000);

    return () => {
      clearInterval(intervalId)
    };
  }, [])

  useEffect(() => {
    messagesRef.current.scrollTo(0, messagesRef.current.scrollHeight)
  }, [messages, newMessage]);

  const sendMessage = async (formData) => {
    formData.append('chat', chatId);
    try {
      const data = await messageService.createNewMessage(formData);
      if (data) {
        setNewMessage(data)
        getMessages();
      }
    } catch (error) {
      navigate(ROUTES.auth);
      console.log(error);
    }
  }

  return (
    <Layout>
      <HeaderPageChat chat={chat} />
      <main className={styles.messages} ref={messagesRef}>
        <MessagesList messages={messages} newMessage={newMessage} />
      </main>
      <FooterChat sendMessage={sendMessage} />
    </Layout>
  );
};

export default PageChat;
