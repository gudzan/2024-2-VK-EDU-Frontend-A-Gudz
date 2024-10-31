import React from "react";
import { usePage } from "../../hooks/usePage";
import DeliveredIcon from "../DliveredIcon/DeliveredIcon";
import { transformDate } from "../../utils";
import "./ChatRow.scss"

const ChatRow = ({ chat, isNew }) => {
  const { setChatId } = usePage()
  const liClassName = `chat${isNew ? " chat--new" : ""}`
  const lastMessageTime = transformDate(chat.lastMessageTime)

  const goBack = () => setChatId(chat.id)

  return (
    <li className={liClassName}>
      <a className="chat__link" onClick={goBack}>
        <img src={chat.userAvatar} alt="user avatar" />
        <div className="chat__main">
          <span className="chat__main-name">{chat.userName}</span>
          <span className="chat__main-message">{chat.lastMessage}</span>
        </div>
        <div className="chat__info">
          <span className="chat__info-time">{lastMessageTime}</span>
          <div className="material-icons"><DeliveredIcon chatIcon={chat.lastMessageIcon} /></div>
        </div>
      </a>
    </li>
  );
};

export default ChatRow;
