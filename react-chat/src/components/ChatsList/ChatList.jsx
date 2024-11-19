import React from "react";
import ChatRow from "../ChatRow";
import "./ChatList.scss"
import Spinner from "../Spinner/Spinner.jsx";

const ChatList = ({ chats, newRow }) => {
  const isNew = (chatId) => {
    if (newRow === null) return false
    return chatId === newRow.id
  } 

  if (chats === null) {
    return <Spinner />
  }

  if (chats.length === 0) {
    return <span className="notFound">Чатов нет</span>
  }
  else {
    return (
      <ul className="chats__inner">
        {chats.map((chat) =>
          <ChatRow key={chat.id} chat={chat} isNew={isNew(chat.id)} />
        )}
      </ul>
    );
  }
};

export default ChatList;
