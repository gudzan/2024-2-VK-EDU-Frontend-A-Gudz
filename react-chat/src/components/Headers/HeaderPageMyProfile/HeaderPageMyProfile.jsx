import React from "react";
import "./HeaderPageMyProfile.scss"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from "react-router-dom";

const HeaderPageMyProfile = () => {

  return (
    <header>
      <div className="header__box profile">
        <Link to="/2024-2-VK-EDU-Frontend-A-Gudz">
          <button type="button" className="icon"><ArrowBackIcon /></button>
        </Link>
        <div className="header__title">
          Мой профиль
        </div>
      </div>
    </header>
  )
}

export default HeaderPageMyProfile