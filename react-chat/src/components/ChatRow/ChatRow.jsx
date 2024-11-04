import React from "react";
import DeliveredIcon from "../DliveredIcon/DeliveredIcon";
import { transformDate } from "../../utils";
import "./ChatRow.scss"
import { Link } from "react-router-dom";
import ROUTES from "../../config/routes";
import classnames from 'classnames';
import defaultAvatar from "../../assets/images/default-avatar.jpg"

const ChatRow = ({ chat, isNew }) => {
  const liClassName = classnames('chat', { 'chat--new': isNew });
  const avatar = chat.avatar === null ? defaultAvatar : chat.avatar
  const text = chat.last_message ? chat.last_message.text : ""
  const time = (chat.last_message && chat.last_message.created_at) ? transformDate(chat.last_message.created_at) : null
  const icon = time ? "done_all" : null
  
  return (
    <li className={liClassName}>
      <Link className="chat__link" to={`${ROUTES.chat}/${chat.id}`}>
        <img src={avatar} alt="user avatar" />
        <div className="chat__main">
          <span className="chat__main-name">{chat.title}</span>
          <span className="chat__main-message">{text}</span>
        </div>
        <div className="chat__info">
          <span className="chat__info-time">{time}</span>
          <div className="material-icons"><DeliveredIcon chatIcon={icon}/></div>
        </div>
      </Link>
    </li>
  );
};

export default ChatRow;
