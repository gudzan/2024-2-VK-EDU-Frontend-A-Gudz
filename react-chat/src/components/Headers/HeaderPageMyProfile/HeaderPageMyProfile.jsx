import React from "react";
import "./HeaderPageMyProfile.scss"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from "react-router-dom";
import ROUTES from "../../../config/routes";

const HeaderPageMyProfile = () => {
  return (
    <header>
      <div className="header__box profile">
        <Link to={ROUTES.root}>
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