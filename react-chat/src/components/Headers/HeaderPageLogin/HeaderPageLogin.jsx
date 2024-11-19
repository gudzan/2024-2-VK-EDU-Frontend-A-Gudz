import React from "react";
import "./HeaderPageLogin.scss"

const HeaderPageLogin = ({text}) => {
  return (
    <header>
      <div className="header__box">
        <div className="header__title login">
          {text}
        </div>
      </div>
    </header>
  )
}

export default HeaderPageLogin