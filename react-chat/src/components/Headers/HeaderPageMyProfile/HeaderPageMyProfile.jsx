import React from "react";
import styles from "./HeaderPageMyProfile.module.scss"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";

const HeaderPageMyProfile = ({ text }) => {
  const navigate = useNavigate()
  const goBack = () => navigate(-1)

  return (
    <header>
      <div className={styles.header__box}>
        <button type="button" onClick={goBack} className={styles.icon}><ArrowBackIcon /></button>
        <div className={styles.title}>
          {text}
        </div>
      </div>
    </header>
  )
}

export default HeaderPageMyProfile