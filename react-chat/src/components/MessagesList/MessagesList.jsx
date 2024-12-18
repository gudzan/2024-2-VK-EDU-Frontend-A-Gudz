import styles from "./MessagesList.module.scss";
import Message from "../Message/Message";
import Spinner from "../Spinner/Spinner.jsx";

const MessagesList = ({ messages, newMessage }) => {
  const isNew = (messageId) => {
    if (newMessage === null) return false;
    return messageId === newMessage.id;
  };

  const userId = localStorage.getItem("userId");

  if (messages === null) {
    return <Spinner />;
  }

  if (messages.length === 0) {
    return null;
  }

  messages.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
  return (
    <ul className={styles.message__inner}>
      {messages.map((message) => (
        <Message key={message.id} userId={userId} message={message} isNew={isNew(message.id)} />
      ))}
    </ul>
  );
};

export default MessagesList;
