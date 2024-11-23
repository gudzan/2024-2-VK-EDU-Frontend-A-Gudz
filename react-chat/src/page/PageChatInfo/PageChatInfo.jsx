import React, { useEffect, useRef, useState } from "react";
import styles from "./PageChatInfo.module.scss"
import Layout from "../../components/Layout/index.js";
import { HeaderPageMyProfile } from "../../components/Headers/index.js";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import chatApi from "../../api/chat/chatApi.js";
import defaultAvatar from "../../assets/images/default-avatar.jpg"
import Spinner from "../../components/Spinner/Spinner.jsx";
import ROUTES from "../../config/routes.js";
import Member from "../../components/Member/index.js";
import { logOut } from "../../store/auth.js";

const PageChatInfo = () => {
  const { chatId } = useParams();
  const [chat, setChat] = useState(null)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(chat);

  const getChat = async () => {
    try {
      const chat = await chatApi.getChat(chatId);
      if (chat) {
        setChat(chat)
      }
    } catch (error) {
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
      <Member element={element} />
    ))

    return (
      <Layout>
        <HeaderPageMyProfile text={""} />
        <main className={styles.info}>
          <div className={styles.inner}>
            <div className={styles.head}>
              <img src={avatarImage} className={styles.avatar} alt="Аватар" />
              <span className={styles.title}>{chat.title}</span>
              {/* <PhotoCameraIcon className={styles.hover} hidden={isAnotherProfile} /> */}
              {/* <input type="file" name="avatar" ref={avatarInput} hidden={true} onChange={handleFiles} disabled={isAnotherProfile} accept=".jpg,.jpeg,.png"></input> */}
            </div>
            <span className={styles.title}>Участники</span>
            <div className={styles.membersList}>
              <div className={styles.membersInner}>
                {members}
              </div>
            </div>
            {buttonLeave}
          </div>
        </main>
      </Layout>
    );
  }

  return (
    <Layout>
      <HeaderPageMyProfile text={""} />
      <main className={styles.info}>
        <Spinner />
      </main>
    </Layout>
  )
};

export default PageChatInfo;
