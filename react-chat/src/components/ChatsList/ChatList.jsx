import React from "react";
import ChatRow from "../ChatRow";
import styles from "./ChatList.module.scss"
import Spinner from "../Spinner/Spinner.jsx";

const ChatList = ({ chats, newRow, isLoading }) => {
  const isNew = (chatId) => {
    if (newRow === null) return false
    return chatId === newRow.id
  }

  if (isLoading) {
    return <Spinner />
  }
  else if (chats.length === 0) {
    return <span className={styles.notFound}>Чатов нет</span>
  }

  return (
    <ul className={styles.chats__inner}>
      {chats.map((chat) =>
        <ChatRow key={chat.id} chat={chat} isNew={isNew(chat.id)} />
      )}
    </ul>
  );
};

export default ChatList;
