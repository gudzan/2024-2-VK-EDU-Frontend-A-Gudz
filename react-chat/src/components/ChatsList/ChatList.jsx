import React from "react";
import ChatRow from "../ChatRow";
import "./ChatList.scss"

const ChatList = ({ chats, newRow }) => {

  return (
    <>
      {(chats.length === 0) ?
        (
          <span className="notFound">Чатов нет</span>
        ) : (
          <ul className="chats__inner">
            {chats.map((chat) =>
              <ChatRow key={chat.id} chat={chat} isNew={newRow !== null && chat.id === newRow.id} />
            )}
          </ul>
        )}
    </>
  );
};

export default ChatList;
