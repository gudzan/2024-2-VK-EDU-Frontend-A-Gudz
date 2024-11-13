import React from "react";
import "./Message.scss"
import DeliveredIcon from "../DliveredIcon/DeliveredIcon";
import { isValidUrl, transformDate } from "../../utils";
import classnames from 'classnames';

const Message = ({ message, userId, isNew }) => {
  const sender = message.sender ? message.sender.id : userId;
  const liClassName = classnames('message', {
    'message--my': sender === userId,
    'message--another': sender !== userId,
    'message--new': isNew
  });

  const infoClassName = classnames('message__info', {
    'message__info--my': sender === userId,
    'message__info--another': sender !== userId
  });

  const icon = sender === userId ? "done_all" : null
  const text = isValidUrl(message.text) ? (<a href={message.text} target="_blank">{message.text}</a>) : message.text

  return (
    <li className={liClassName}>
      <span className="message__text">{text}</span>
      <div className={infoClassName}>
        <span className="message__info-time">{transformDate(message.created_at)}</span>
        <div className="icons"><DeliveredIcon chatIcon={icon} /></div>
      </div>
    </li>
  );
};

export default Message
