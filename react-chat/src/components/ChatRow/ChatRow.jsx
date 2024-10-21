import React from "react";
import { usePage } from "../../hooks/usePage";
import DeliveredIcon from "../DliveredIcon/DeliveredIcon";
import { transformDate } from "../../utils";
import "./ChatRow.scss"

const ChatRow = ({ chat, isNew }) => {
  const { setChatId } = usePage()

  return (
    <li className={`chat${isNew ? " chat--new" : ""}`}>
      <a className="chat__link" onClick={() => setChatId(chat.id)}>
        <img src={chat.userAvatar} />
        <div className="chat__main">
          <span className="chat__main-name">{chat.userName}</span>
          <span className="chat__main-message">{chat.lastMessage}</span>
        </div>
        <div className="chat__info">
          <span className="chat__info-time">{transformDate(chat.lastMessageTime)}</span>
          <div className="material-icons"><DeliveredIcon chatIcon={chat.lastMessageIcon}/></div>
        </div>
      </a>
    </li>
  );
};

export default ChatRow;
