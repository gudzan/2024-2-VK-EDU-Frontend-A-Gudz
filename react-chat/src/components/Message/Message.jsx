import styles from "./Message.module.scss";
import DeliveredIcon from "../DliveredIcon/DeliveredIcon";
import { isValidUrl, transformDate } from "../../utils";
import classnames from "classnames";

const Message = ({ message, userId, isNew }) => {
  const sender = message.sender ? message.sender.id : userId;
  const icon = sender === userId ? "done_all" : null;
  const liClassName = classnames(styles.message, {
    [styles.my]: sender === userId,
    [styles.another]: sender !== userId,
    [styles.new]: isNew,
    [styles.voice]: message.voice !== null
  });
  const infoClassName = classnames(styles.message__info, {
    [styles.my]: sender === userId,
    [styles.another]: sender !== userId
  });

  const getMessage = () => {
    if (message.text !== null) {
      const text = isValidUrl(message.text) ? (<a href={message.text} target="_blank">{message.text}</a>) : message.text;
      return <span className={styles.text}>{text}</span>;
    }
    else if (message.files.length > 0) {
      return (
        <div className={styles.imageBox}>
          {message.files.map((file, index) =>
            <img key={index} src={file.item} alt="Фото" />
          )}
        </div>
      );
    }
    else if (message.voice !== null) {
      return <audio controls src={message.voice} />;
    }
    return null;
  };

  return (
    <li className={liClassName}>
      <div className={styles.message__inner}>{getMessage()}</div>
      <div className={infoClassName}>
        <span className={styles.time}>{transformDate(message.created_at)}</span>
        <div className={styles.icons}><DeliveredIcon chatIcon={icon} /></div>
      </div>
    </li>
  );
};

export default Message;
