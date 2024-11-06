import React, { useEffect, useRef, useState } from "react";
import "./PageChat.scss"
import MessagesList from "../../components/MessagesList";
import Layout from "../../components/Layout";
import FooterChat from "../../components/FooterChat";
import {HeaderPageChat} from "../../components/Headers";
import { createNewMessage, getMessagesByChatId } from "../../api/messages/messages";
import { getChatFromById } from "../../api/chat/chat";
import { useParams } from "react-router-dom";

const PageChat = () => {
  const messagesRef = useRef(null)
  const { chatId } = useParams();
  const chat = getChatFromById(chatId);
  const [newMessage, setNewMessage] = useState(null)
  const messages = getMessagesByChatId(chatId);

  useEffect(() => {
    messagesRef.current.scrollTo(0, messagesRef.current.scrollHeight)
  }, [newMessage]);

  const sendMessage = (newMessageText) => {
    const createdMessage = createNewMessage(newMessageText, chatId)
    setNewMessage(createdMessage)
  }

  return (
    <Layout>
      <HeaderPageChat userName={chat.userName} userAvatar={chat.userAvatar} />
      <main className="messages" ref={messagesRef}>
        <MessagesList messages={messages} newMessage={newMessage} />
      </main>
      <FooterChat sendMessage={sendMessage} />
    </Layout>
  );
};

export default PageChat;
