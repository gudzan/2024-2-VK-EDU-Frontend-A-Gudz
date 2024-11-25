import React, { useEffect, useState } from "react";
import styles from "./ChatInfo.module.scss"
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import chatApi from "../../api/chat/chatApi.js";
import defaultAvatar from "../../assets/images/default-avatar.jpg"
import Spinner from "../../components/Spinner/Spinner.jsx";
import ROUTES from "../../config/routes.js";
import Member from "../../components/Member/index.js";
import { logOut } from "../../store/auth.js";

const ChatInfo = () => {
  const { chatId } = useParams();
  const [chat, setChat] = useState(null)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getChat = async () => {
    try {
      const chat = await chatApi.getChat(chatId);
      if (chat) {
        setChat(chat)
      }
    } catch (error) {
      console.log(error);
      dispatch(logOut())
    }
  }

  const leaveChat = async () => {
    try {
      const chat = await chatApi.leaveChat(chatId);
      if (chat === "") {
        navigate(ROUTES.root)
      }
    } catch (error) {
      console.log(error);
      dispatch(logOut())
    }
  }

  useEffect(() => {
    getChat()
  }, [])

  if (chat) {
    const avatarImage = chat.avatar ?? defaultAvatar
    const buttonLeave = chat.is_private ? null : (
      <button className={styles.leave} onClick={leaveChat}>Покинуть чат</button>
    )

    const members = chat.members.map((element) => (
      <Member element={element} key={element.id} />
    ))

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
  )
}

export default ChatInfo;
