import React from "react";
import "./DropdownChatListMenu.scss"
import Overlay from "../Overlay";
import { Link, useNavigate } from "react-router-dom";
import ROUTES from "../../config/routes";
import classnames from 'classnames';
import { removeTokens } from "../../api/localSrorage";
import { useAuth } from "../../hooks/useAuth";

const DropdownChatList = ({ openDropdown, closeDropdown }) => {
  const navigate = useNavigate();
  const { setAuth } = useAuth()
  const dropdownClassName = classnames('dropdown', 'profile', {
    "open": openDropdown,
    "close": !openDropdown
  });

  const logOut = () => {
    removeTokens()
    closeDropdown()
    setAuth(false)
    navigate(ROUTES.auth)
  }

  return (
    <>
      <Overlay openOverlay={openDropdown} closeOverlay={closeDropdown} />
      <div className={dropdownClassName}>
        <Link to={ROUTES.myProfile}>
          <button type="button" className="dropdown-item" onClick={closeDropdown}>
            Мой профиль
          </button>
        </Link>
        <button type="button" className="dropdown-item" onClick={logOut}>
          Выйти
        </button>
      </div>
    </>
  )
}

export default DropdownChatList;
