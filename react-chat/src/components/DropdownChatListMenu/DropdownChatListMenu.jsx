import React from "react";
import styles from "./DropdownChatListMenu.module.scss"
import Overlay from "../Overlay";
import { Link } from "react-router-dom";
import ROUTES from "../../config/routes";
import classnames from 'classnames';
import { useAuth } from "../../hooks/useAuth";

const DropdownChatList = ({ openDropdown, closeDropdown }) => {
  const { toAuth } = useAuth()
  const dropdownClassName = classnames(styles.dropdown, {
    [styles.open]: openDropdown,
    [styles.close]: !openDropdown,
  })

  const logOut = () => {
    closeDropdown()
    toAuth()
  }

  return (
    <>
      <Overlay openOverlay={openDropdown} closeOverlay={closeDropdown} />
      <div className={dropdownClassName}>
        <Link to={ROUTES.myProfile}>
          <button type="button" onClick={closeDropdown}>
            Мой профиль
          </button>
        </Link>
        <Link to={ROUTES.auth}>
          <button type="button" onClick={logOut}>
            Выйти
          </button>
        </Link>
      </div>
    </>
  )
}

export default DropdownChatList;
