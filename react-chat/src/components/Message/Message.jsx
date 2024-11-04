import React from "react";
import "./Message.scss"
import DeliveredIcon from "../DliveredIcon/DeliveredIcon";
import { transformDate } from "../../utils";
import classnames from 'classnames';

const Message = ({ message, userId, isNew }) => {
  console.log(message.sender.id, userId);
  
  const liClassName = classnames('message', {
    'message--my': message.sender.id === userId,
    'message--another': message.sender.id !== userId,
    'message--new': isNew
  });

  const infoClassName = classnames('message__info', {
    'message__info--my': message.sender.id === userId,
    'message__info--another': message.sender.id !== userId
  });

  const icon = message.sender.id === userId ? "done_all" : null

  return (
    <li className={liClassName}>
      <span className="message__text">{message.text}</span>
      <div className={infoClassName}>
        <span className="message__info-time">{transformDate(message.created_at)}</span>
        <div className="icons"><DeliveredIcon chatIcon={icon} /></div>
      </div>
    </li>
  );
};

export default Message
