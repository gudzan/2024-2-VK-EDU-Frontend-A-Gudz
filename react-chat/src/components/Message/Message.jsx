import React from "react";
import "./Message.scss"
import DeliveredIcon from "../DliveredIcon/DeliveredIcon";
import { transformDate } from "../../utils";

const Message = ({ message, isNew }) => {
  const liClassName = `message ${message.sender === 1 ? "message--my" : "message--another"} ${isNew ? "message--new" : ""}`
  const infoClassName = `message__info ${message.sender === 1 ? "message__info--my" : "message__info--another"}`
  
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
