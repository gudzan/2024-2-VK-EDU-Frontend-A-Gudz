import React from "react";
import styles from "./Header.module.scss"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import HeaderUserInfo from "../HeaderUserInfo/HeaderUserInfo";

const Header = ({ text, chat, arrowBack = true }) => {
  const navigate = useNavigate()
  const goBack = () => navigate(-1)

  const goBackButton = arrowBack ? (
    <button type="button" onClick={goBack} className={styles.icon}><ArrowBackIcon /></button>
  ) : null

  const getCenterBox = () => {
    console.log(text, chat);
    if (text) {
      return (
        <div className={styles.title}>
          {text}
        </div>
      )
    }
    if (chat && chat.title) {
      return (
        <HeaderUserInfo avatar={chat.avatar} title={chat.title} id={chat.id} />
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