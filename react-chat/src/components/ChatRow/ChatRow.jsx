import React from "react";
import DeliveredIcon from "../DliveredIcon/DeliveredIcon";
import { transformDate } from "../../utils";
import styles from "./ChatRow.module.scss"
import { Link } from "react-router-dom";
import ROUTES from "../../config/routes";
import classnames from 'classnames';
import defaultAvatar from "../../assets/images/default-avatar.jpg"

const ChatRow = ({ chat, isNew }) => {
  const liClassName = classnames(styles.chat, { [styles.new]: isNew })
  const avatar = chat.avatar === null ? defaultAvatar : chat.avatar
  const lastMessage = chat.last_message

  let text = ""
  if (lastMessage) {
    if (lastMessage.files.length > 0) {
      text = "Фото"
    }
    else if (lastMessage.voice) {
      text = "Голосовое сообщение"
    }
    else {
      text = lastMessage.text
    }
  }

  const time = text ? transformDate(lastMessage.created_at) : null
  const icon = time ? "done_all" : null

  return (
    <li className={liClassName}>
      <Link className={styles.link} to={`${ROUTES.chat}/${chat.id}`}>
        <img src={avatar} alt="user avatar" />
        <div className={styles.chat__main}>
          <span className={styles.name}>{chat.title}</span>
          <span className={styles.message}>{text}</span>
        </div>
        <div className={styles.chat__info}>
          <span className={styles.time}>{time}</span>
          <div className={styles.materialIcons}><DeliveredIcon chatIcon={icon} /></div>
        </div>
      </Link>
    </li>
  );
};

export default ChatRow;