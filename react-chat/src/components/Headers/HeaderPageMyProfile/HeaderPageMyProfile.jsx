import React from "react";
import styles from "./HeaderPageMyProfile.module.scss"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from "react-router-dom";
import ROUTES from "../../../config/routes";

const HeaderPageMyProfile = () => {
  return (
    <header>
      <div className={styles.header__box}>
        <Link to={ROUTES.root}>
          <button type="button" className={styles.icon}><ArrowBackIcon /></button>
        </Link>
        <div className={styles.title}>
          Мой профиль
        </div>
      </div>
    </header>
  )
}

export default HeaderPageMyProfile