import React from "react";
import styles from "./HeaderUserInfo.module.scss"
import defaultAvatar from "../../../assets/images/default-avatar.jpg"

const HeaderUserInfo = ({ avatar, title }) => {
  const avatarImage = avatar ?? defaultAvatar
  return (
    <div className={styles.header__user}>
      <img className={styles.image} src={avatarImage} alt="user avatar" />
      <div className={styles.info}>
        <span className={styles.name}>{title}</span>
        <span className={styles.lastTime}>был(а) 2 часа назад</span>
      </div>
    </div>
  )
}

export default HeaderUserInfo