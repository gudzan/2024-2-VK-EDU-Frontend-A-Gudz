import React, { useEffect, useRef, useState } from "react";
import "./PageChat.scss"
import MessagesList from "../../components/MessagesList";
import Layout from "../../components/Layout";
import FooterChat from "../../components/FooterChat";
import { HeaderPageChat } from "../../components/Headers";
import { useParams } from "react-router-dom";
import chatService from "../../api/chat/chatService";
import messageService from "../../api/message/messageService";

const PageChat = () => {
  const messagesRef = useRef(null)
  const { chatId } = useParams();
  const [newMessage, setNewMessage] = useState(null)
  const [messages, setMessages] = useState(null)
  const [chat, setChat] = useState(null)

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
    }, 10000);

    return () => {
      clearInterval(intervalId)
    };
  }, [])

  useEffect(() => {
    messagesRef.current.scrollTo(0, messagesRef.current.scrollHeight)
  }, [messages, newMessage]);

  const sendMessage = async (newMessageText) => {
    try {
      const data = await messageService.createNewMessage(newMessageText, chatId);
      if (data) {
        setNewMessage(data)
        setMessages([...messages, data])
      }
    } catch (error) {
      navigate(ROUTES.auth); console.log(error);
    }
  }

  return (
    <Layout>
      <HeaderPageChat chat={chat} />
      <main className="messages" ref={messagesRef}>
        <MessagesList messages={messages} newMessage={newMessage} />
      </main>
      <FooterChat sendMessage={sendMessage} />
    </Layout>
  );
};

export default PageChat;
