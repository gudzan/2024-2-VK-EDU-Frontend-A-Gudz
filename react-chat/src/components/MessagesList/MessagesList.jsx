import React from "react";
import "./MessagesList.scss"
import Message from "../Message/Message";
import Spinner from "../Spinner/Spinner.jsx";

const MessagesList = ({ messages, newMessage }) => {
  const isNew = (messageId) => {
    if (newMessage === null) return false
    return messageId === newMessage.id
  }

  const userId = localStorage.getItem("userId");

  if (messages === null) {
    return <Spinner />
  }
  
  if (messages.length === 0) {
    return null
  }
  else {
    messages.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
    return (
      <ul className="message__inner">
        {messages.map((message) => (
          <Message key={message.id} userId={userId} message={message} isNew={isNew(message.id)} />
        ))}
      </ul>
    );
  }
};

export default MessagesList;