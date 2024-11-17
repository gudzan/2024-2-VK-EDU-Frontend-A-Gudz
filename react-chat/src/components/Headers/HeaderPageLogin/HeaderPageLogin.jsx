import React from "react";
import styles from "./HeaderPageLogin.module.scss"

const HeaderPageLogin = ({text}) => {
  return (
    <header>
      <div className={styles.header__box}>
        <div className={styles.title}>
          {text}
        </div>
      </div>
    </header>
  )
}

export default HeaderPageLogin