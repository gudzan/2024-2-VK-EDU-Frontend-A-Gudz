import React, { useEffect, useRef, useState } from "react";
import "./PageChat.scss"
import MessagesList from "../../components/MessagesList";
import Layout from "../../components/Layout";
import FooterChat from "../../components/FooterChat";
import { HeaderPageChat } from "../../components/Headers";
import { useNavigate, useParams } from "react-router-dom";
import chatService from "../../api/chat/chatService";
import messageService from "../../api/message/messageService";
import ROUTES from "../../config/routes";
import song from "../../assets/audio/notification.mp3"

const PageChat = () => {
  const navigate = useNavigate();
  const messagesRef = useRef(null)
  const { chatId } = useParams();
  const [newMessage, setNewMessage] = useState(null)
  const [messages, setMessages] = useState(null)
  const [chat, setChat] = useState(null)
  const [chats, setChats] = useState(null)
  const [prevChats, setPrevChats] = useState(null)

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

  function getLastMessages(current, prev) {
    if (current === null || prev === null) {
      return []
    }
    current = current.filter(item => item.id !== chatId && (item.last_message.text !== "" || item.last_message.files.length > 0 || item.last_message.voice !== undefined || item.last_message.voice !== null));
    prev = prev.filter(item => item.id !== chatId && (item.last_message.text !== "" || item.last_message.files.length > 0 || item.last_message.voice !== undefined || item.last_message.voice !== null));
    return current.filter((item, index) =>
      item.last_message.id !== prev[index].last_message.id
    );
  }

  const getAllChats = async () => {
    try {
      const results = await chatService.getAllChats();
      setChats(results)
    } catch (error) {
      navigate(ROUTES.auth); console.log(error);
    }
  }

  function notifyMe(senderName, text, icon) {
    if (!("Notification" in window)) {
      alert("This browser does not support Desktop notifications");
    }
    if (Notification.permission === "granted") {
      callNotify(senderName, text, icon);
      return;
    }
    if (Notification.permission !== "denied") {
      Notification.requestPermission((permission) => {
        if (permission === "granted") {
          callNotify(senderName, text, icon);
        }
      });
      return;
    }
  }

  function callNotify(title, msg, icone) {
    var audio = new Audio(song);
    new Notification(title, { body: msg, icon: icone, vibrate: [200, 100, 200] });
    audio.play();
  }

  useEffect(() => {
    if (chats !== null && prevChats !== null) {
      const lastMessages = getLastMessages(chats, prevChats)
      console.log(lastMessages);
      if (lastMessages.length > 0) {
        lastMessages.forEach(element => {
          notifyMe(element.last_message.sender.username, getTextForNotify(element.last_message), element.avatar)
        });
        setPrevChats(chats)
      }
    }
    else if (prevChats === null) {
      setPrevChats(chats)
    }
  }, [chats, prevChats])

  function getTextForNotify(lastMessage) {
    if (lastMessage.files.length > 0) {
      return "Фото"
    }
    else if (lastMessage.voice) {
      return "Голосовое сообщение"
    }
    else {
      return lastMessage.text
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
    getAllChats();
    const intervalId = setInterval(() => {
      getAllChats();
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
    console.log(messages);
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
      <main className="messages" ref={messagesRef}>
        <MessagesList messages={messages} newMessage={newMessage} />
      </main>
      <FooterChat sendMessage={sendMessage} />
    </Layout>
  );
};

export default PageChat;
