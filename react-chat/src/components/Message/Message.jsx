import React from "react";
import "./Message.scss"
import DeliveredIcon from "../DliveredIcon/DeliveredIcon";
import { isValidUrl, transformDate } from "../../utils";
import classnames from 'classnames';

const Message = ({ message, userId, isNew }) => {
  const sender = message.sender ? message.sender.id : userId;
  const liClassName = classnames('message', {
    'message__my': sender === userId,
    'message__another': sender !== userId,
    'message__new': isNew,
    'message__voice': message.voice !== null
  });

  const infoClassName = classnames('message__info', {
    'message__info--my': sender === userId,
    'message__info--another': sender !== userId
  });

  const icon = sender === userId ? "done_all" : null

  const getMessage = () => {
    if (message.text !== null) {
      const text = isValidUrl(message.text) ? (<a href={message.text} target="_blank">{message.text}</a>) : message.text
      return <span className="message__text">{text}</span>
    }
    else if (message.files.length > 0) {     
      return  (
        <div className={`imageBox`}>
          {message.files.map((file, index)=>
            <img key={index} src={file.item} alt="Фото" />
          )}
        </div>
      )
    }
    else if (message.voice !== null) {
      return <audio controls src={message.voice} />
    }
    else {
      null
    }
  }

  return (
    <li className={liClassName}>
      <div className="message__inner">{getMessage()}</div>
      <div className={infoClassName}>
        <span className="message__info-time">{transformDate(message.created_at)}</span>
        <div className="icons"><DeliveredIcon chatIcon={icon} /></div>
      </div>
    </li>
  );
};

export default Message
