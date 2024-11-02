import React from "react";
import "./DropdownChatMenu.scss"
import Overlay from "../Overlay";
import classnames from 'classnames';

const DropdownChatMenu = ({ openDropdown, closeDropdown }) => {
  const dropdownClassName = classnames('dropdown', {
    "open": openDropdown,
    "close": !openDropdown
  });

  return (
    <>
      <Overlay openOverlay={openDropdown} closeOverlay={closeDropdown} />
      <div className={dropdownClassName}>
        <button type="button" className="dropdown-item" onClick={closeDropdown}>Info</button>
        <button type="button" className="dropdown-item" onClick={closeDropdown}>Mute</button>
      </div>
    </>
  )
}

export default DropdownChatMenu;
