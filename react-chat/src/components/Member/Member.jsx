import React from "react";
import styles from "./Member.module.scss"
import defaultAvatar from "../../assets/images/default-avatar.jpg"
import { Link } from "react-router-dom";
import ROUTES from "../../config/routes";
import { useSelector } from "react-redux";

const Member = ({ element }) => {
  const { userId } = useSelector((state) => state.auth)
  const link = `${ROUTES.profile}/${element.id}`
  const memberAvatar = element.avatar ?? defaultAvatar
  const name = `${element.first_name} ${element.last_name}`
  const online = element.is_online ? "Онлайн" : "Не в сети"
  const creator = element.id === userId ? "Создатель" : null

  return (
    <Link to={link} className={styles.member} key={element.id}>
      <div className={styles.left}>
        <img className={styles.avatar} src={memberAvatar} alt="Аватар" />
        <div className={styles.memberInfo}>
          <span className={styles.name}>{name}</span>
          <span className={styles.online}>{online}</span>
        </div>
      </div>
      <span className={styles.creator}>{creator}</span>
    </Link>
  )
};

export default Member
