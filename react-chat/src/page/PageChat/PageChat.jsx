import React, { useEffect, useRef, useState } from "react";
import "./PageChat.scss"
import MessagesList from "../../components/MessagesList";
import Layout from "../../components/Layout";
import FooterChat from "../../components/FooterChat";
import { HeaderPageChat } from "../../components/Headers";
import { useParams } from "react-router-dom";
import { instance } from "../../api/api.config";
import { Centrifuge } from "centrifuge";

const PageChat = () => {
  const messagesRef = useRef(null)
  const { chatId } = useParams();
  // const chat = getChatFromById(chatId);
  const [newMessage, setNewMessage] = useState(null)
  // const messages = getMessagesByChatId(chatId);
  const [messages, setMessages] = useState(null)
  const [chat, setChat] = useState(null)
  const id = localStorage.getItem('userId')

  const centrifuge = useRef()
  const subscription = useRef()

  const connect = () => {
    centrifuge.current = new Centrifuge('ws://vkedu-fullstack-div2.ru/api/connection/websocket/', {
      getToken: (ctx) =>
        new Promise((resolve, reject) =>
          fetch('https://vkedu-fullstack-div2.ru/api/centrifugo/connect/', {
            body: JSON.stringify(ctx),
            method: 'POST',
            headers: headers,
          })
            .then((res) => res.json())
            .then((data) => resolve(data.token))
            .catch((err) => reject(err))
        )
    });

    subscription.current = centrifuge.current.newSubscription(id, {
      getToken: (ctx) =>
        new Promise((resolve, reject) =>
          fetch('https://vkedu-fullstack-div2.ru/api/centrifugo/subscribe/', {
            body: JSON.stringify(ctx),
            method: 'POST',
            headers: headers,
          })
            .then((res) => res.json())
            .then((data) => resolve(data.token))
            .catch((err) => reject(err))
        )
    });

    subscription.current.on('publication', function (ctx) {
      console.log("helloo");
      console.log(ctx.data);
    });

    subscription.current.subscribe();
    centrifuge.current.connect();



  }

  useEffect(() => {
    connect()
  }, [])


  useEffect(() => {
    instance.get(`/api/messages/?chat=${chatId}`)
      .then((response) => {
        setMessages(response.data.results)
      })
      .catch((error) => {
        if (error.response.status === 401 && error.config.url === "/api/auth/refresh/") {
          navigate(ROUTES.auth)
        }
      })

    instance.get(`/api/chat/${chatId}`)
      .then((response) => {
        setChat(response.data)
      })
      .catch((error) => {
        if (error.response.status === 401 && error.config.url === "/api/auth/refresh/") {
          navigate(ROUTES.auth)
        }
      })

  }, [])

  useEffect(() => {
    messagesRef.current.scrollTo(0, messagesRef.current.scrollHeight)
  }, [newMessage]);

  const sendMessage = (newMessageText) => {
    console.log("centrifuge.current.state", centrifuge.current.state);

    console.log("subscription.current.state", subscription.current.state);
    instance.post(`/api/messages/`, {
      "text": newMessageText,
      "chat": chatId,
    })
      .then((response) => {
        setNewMessage(response.data)

        instance.get(`/api/messages/?chat=${chatId}`)
          .then((response) => {
            setMessages(response.data.results)
          })
          .catch((error) => {
            console.log(error);

            if (error.response.status === 401 && error.config.url === "/api/auth/refresh/") {
              navigate(ROUTES.auth)
            }
          })
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401 && error.config.url === "/api/auth/refresh/") {
          navigate(ROUTES.auth)
        }
      })
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
