import React from "react";
import styles from "./Member.module.scss"
import defaultAvatar from "../../assets/images/default-avatar.jpg"
import { Link } from "react-router-dom";
import ROUTES from "../../config/routes";
import { useSelector } from "react-redux";

const Member = ({ member, isCreator }) => {
  const link = `${ROUTES.profile}/${member.id}`
  const memberAvatar = member.avatar ?? defaultAvatar
  const name = `${member.first_name} ${member.last_name}`
  const online = member.is_online ? "Онлайн" : "Не в сети"
  const creator = isCreator ? "Создатель" : null    

  return (
    <Link to={link} className={styles.member}>
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
