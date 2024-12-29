import { useEffect, useState } from "react";
import styles from "./ChatInfo.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import chatApi from "../../api/chat/chatApi";
import defaultAvatar from "../../assets/images/default-avatar.jpg";
import Spinner from "../../components/Spinner/Spinner.jsx";
import ROUTES from "../../config/routes.js";
import Member from "../../components/Member/index.js";
import { logOut } from "../../store/auth/auth.js";
import { selectAuthUserId } from "../../store/auth/authSelectors.js";

const ChatInfo = () => {
  const { chatId } = useParams();
  const [chat, setChat] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUserId = useSelector(selectAuthUserId);

  const getChat = async () => {
    try {
      const chat = await chatApi.getChat(chatId);
      if (chat) {
        setChat(chat);
      }
    } catch (error) {
      console.log(error);
      if (error.status === 401) {
        dispatch(logOut());
      }
    }
  };

  const leaveChat = async () => {
    try {
      await chatApi.leaveChat(chatId);
      navigate(ROUTES.root);
    } catch (error) {
      console.log(error);
      if (error.status === 401) {
        dispatch(logOut());
      }
    }
  };

  const deleteChat = async () => {
    try {
      const chat = await chatApi.deleteChat(chatId);
      if (chat === "") {
        navigate(ROUTES.root);
      }
    } catch (error) {
      console.log(error);
      if (error.status === 401) {
        dispatch(logOut());
      }
    }
  };

  useEffect(() => {
    getChat();
  }, []);

  if (chat) {
    const avatarImage = chat.avatar ?? defaultAvatar;
    const creatorId = chat.creator.id;
    let buttonLeave = null;
    const iCreator = currentUserId === creatorId;
    if (!chat.is_private) {
      if (iCreator) {
        buttonLeave = <button className={styles.leave} onClick={deleteChat}>Удалить чат</button>;
      }
      else {
        buttonLeave = <button className={styles.leave} onClick={leaveChat}>Покинуть чат</button>;
      }
    }

    const members = chat.members.map((element) => {
      const creator = creatorId === element.id;
      return (
        <Member member={element} key={element.id} isCreator={creator} />
      );
    });

    return (
      <div className={styles.inner}>
        <div className={styles.head}>
          <img src={avatarImage} className={styles.avatar} alt="Аватар" />
          <span className={styles.title}>{chat.title}</span>
        </div>
        <span className={styles.title}>Участники</span>
        <div className={styles.membersList}>
          <div className={styles.membersInner}>
            {members}
          </div>
        </div>
        {buttonLeave}
      </div>
    );
  }

  return (
    <Spinner />
  );
};

export default ChatInfo;
