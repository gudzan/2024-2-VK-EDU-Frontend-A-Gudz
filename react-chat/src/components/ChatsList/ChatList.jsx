import React from "react";
import ChatRow from "../ChatRow";
import "./ChatList.scss"

const ChatList = ({ chats, newRow }) => {
  const isNew = (chatId) => {
    if (newRow === null) return false
    return chatId === newRow.id
  }

  if (chats.length === 0) {
    return <span className="notFound">Чатов нет</span>
  }

  return (
    <ul className="chats__inner">
      {chats.map((chat) =>
        <ChatRow key={chat.id} chat={chat} isNew={isNew(chat.id)} />
      )}
    </ul>
  );
};

export default ChatList;
