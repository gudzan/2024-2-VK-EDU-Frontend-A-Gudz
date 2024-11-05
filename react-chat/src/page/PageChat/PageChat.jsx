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

  const getAllChats = async () => {
    try {
      const chat = await chatService.getChat(chatId);
      if (chat) {
        setChat(chat)
      }
    } catch (error) {
      navigate(ROUTES.auth); console.log(error);
    }
  }

  useEffect(() => {
    getAllChats()
    let isMounted = true;

    const getMessages = async () => {
      try {
        const results = await messageService.getMessages(chatId);
        setMessages(results)
        if (isMounted) {
          await getMessages()
        }
      } catch (e) {
        setTimeout(() => {
          getMessages()
        }, 1000)
      }
    }
    getMessages()
    return () => {
      isMounted = false;
    };
  }, [])

  useEffect(() => {
    messagesRef.current.scrollTo(0, messagesRef.current.scrollHeight)
  }, [newMessage]);

  const sendMessage = async (newMessageText) => {
    try {
      const data = await messageService.createNewMessage(newMessageText, chatId);
      if (data) {
        setNewMessage(data)
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
