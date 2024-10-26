import React from "react";
import DeliveredIcon from "../DliveredIcon/DeliveredIcon";
import { transformDate } from "../../utils";
import "./ChatRow.scss"
import { Link } from "react-router-dom";

const ChatRow = ({ chat, isNew }) => {
  const liClassName = `chat${isNew ? " chat--new" : ""}`
  const lastMessageTime = transformDate(chat.lastMessageTime)
  return (
    <li className={liClassName}>
      <Link className="chat__link" to={`chat/${chat.id}`}>
      <img src={chat.userAvatar} alt="user avatar" />
        <div className="chat__main">
          <span className="chat__main-name">{chat.userName}</span>
          <span className="chat__main-message">{chat.lastMessage}</span>
        </div>
        <div className="chat__info">
          <span className="chat__info-time">{lastMessageTime}</span>
          <div className="material-icons"><DeliveredIcon chatIcon={chat.lastMessageIcon} /></div>
        </div>
      </Link>
    </li>
  );
};

export default ChatRow;
