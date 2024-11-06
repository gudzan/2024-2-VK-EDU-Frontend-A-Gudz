import React from "react";
import "./Message.scss"
import DeliveredIcon from "../DliveredIcon/DeliveredIcon";
import { transformDate } from "../../utils";
import classnames from 'classnames';

const Message = ({ message, isNew }) => {
  const liClassName = classnames('message', {
    'message--my': message.sender === 1,
    'message--another': message.sender !== 1,
    'message--new': isNew
  });

  const infoClassName = classnames('message__info', {
    'message__info--my': message.sender === 1,
    'message__info--another': message.sender !== 1
  });

  return (
    <li className={liClassName}>
      <span className="message__text">{message.text}</span>
      <div className={infoClassName}>
        <span className="message__info-time">{transformDate(message.time)}</span>
        <div className="icons"><DeliveredIcon chatIcon={message.icon} /></div>
      </div>
    </li>
  );
};

export default Message
