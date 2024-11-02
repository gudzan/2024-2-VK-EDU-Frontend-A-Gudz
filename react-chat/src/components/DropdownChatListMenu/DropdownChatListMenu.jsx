import React from "react";
import "./DropdownChatListMenu.scss"
import Overlay from "../Overlay";
import { Link } from "react-router-dom";
import ROUTES from "../../config/routes";
import classnames from 'classnames';

const DropdownChatList = ({ openDropdown, closeDropdown }) => {
  const dropdownClassName = classnames('dropdown', 'profile', {
    "open": openDropdown,
    "close": !openDropdown
  });

  return (
    <>
      <Overlay openOverlay={openDropdown} closeOverlay={closeDropdown} />
      <div className={dropdownClassName}>
        <button type="button" onClick={closeDropdown}>
          <Link to={ROUTES.myProfile}>
            Мой профиль
          </Link>
        </button>
      </div>
    </>
  )
}

export default DropdownChatList;
