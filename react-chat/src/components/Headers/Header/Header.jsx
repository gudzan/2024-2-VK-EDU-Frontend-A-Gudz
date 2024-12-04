import React from "react";
import styles from "./Header.module.scss"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import HeaderUserInfo from "../HeaderUserInfo/HeaderUserInfo";
import { getLastOnline } from "../../../utils";
import { useSelector } from "react-redux";
import { selectAuthUserId } from "../../../store/auth/authSelectors";

const Header = ({ text, chat, arrowBack = true }) => {
  const navigate = useNavigate()
  const goBack = () => navigate(-1)
  const userId = useSelector(selectAuthUserId);

  const goBackButton = arrowBack ? (
    <button type="button" onClick={goBack} className={styles.icon}><ArrowBackIcon /></button>
  ) : null

  const getCenterBox = () => {
    if (text) {
      return (
        <div className={styles.title}>
          {text}
        </div>
      )
    }
    if (chat && chat.title) {
      const lastTime = chat.is_private ? chat.members.find((element) => element.id !== userId).last_online_at : null
      return (
        <HeaderUserInfo avatar={chat.avatar} title={chat.title} id={chat.id} lastOnline={getLastOnline(lastTime)} />
      )
    }
    return null
  }

  return (
    <header>
      <div className={styles.header__box}>
        {goBackButton}
        {getCenterBox()}
      </div>
    </header>
  )
}

export default Header