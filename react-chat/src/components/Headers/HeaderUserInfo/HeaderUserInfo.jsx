import React from "react";
import styles from "./HeaderUserInfo.module.scss"
import defaultAvatar from "../../../assets/images/default-avatar.jpg"
import { Link } from "react-router-dom";
import ROUTES from "../../../config/routes";

const HeaderUserInfo = ({ avatar, title, id }) => {
  const avatarImage = avatar ?? defaultAvatar
  const link = `${ROUTES.info}/${id}`

  return (
    <Link to={link} className={styles.header__user}>
      <img className={styles.image} src={avatarImage} alt="user avatar" />
      <div className={styles.info}>
        <span className={styles.name}>{title}</span>
        <span className={styles.lastTime}>был(а) 2 часа назад</span>
      </div>
    </Link>
  )
}

export default HeaderUserInfo