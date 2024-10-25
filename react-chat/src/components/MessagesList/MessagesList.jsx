import React from "react";
import "./MessagesList.scss"
import Message from "../Message/Message";

const MessagesList = ({ messages, newMessage }) => {
  const isNew = (messageId) => {
    if(newMessage === null) return false
    return messageId === newMessage.id
  }

  return (
    <ul className="message__inner">
      {messages.map((message) => (
        <Message key={message.id} message={message} isNew={isNew(message.id)} />
      ))}
    </ul>
  );
};

export default MessagesList;
