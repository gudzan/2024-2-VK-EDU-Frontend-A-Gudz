import React from "react";
import "./DropdownChatListMenu.scss"
import Overlay from "../Overlay";
import { Link } from "react-router-dom";

const DropdownChatList = ({ openDropdown, closeDropdown }) => {
  const dropdownClassName = `dropdown profile ${openDropdown ? `open` : `close`}`

  return (
    <>
      <Overlay openOverlay={openDropdown} closeOverlay={closeDropdown} />
      <div className={dropdownClassName}>
        <button type="button" onClick={closeDropdown}>
          <Link to={`myProfile`}>
            Мой профиль
          </Link>
        </button>
      </div>
    </>
  )
}

export default DropdownChatList;
