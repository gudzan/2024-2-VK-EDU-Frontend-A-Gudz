import React from "react";
import "./MessagesList.scss"
import Message from "../Message/Message";

const MessagesList = ({ messages, newMessage  }) => {
  return (
    <ul className="message__inner">
      {messages.map((message) => (
        <Message key={message.id} message={message} isNew={newMessage !== null && message.id === newMessage.id} />
      ))}
    </ul>
  );
};

export default MessagesList;
