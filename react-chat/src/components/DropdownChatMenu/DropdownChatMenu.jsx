import React from "react";
import "./DropdownChatMenu.scss"

const DropdownChatMenu = ({ openDropdown, closeDropdown }) => {
  const dropdownClassName = `dropdown ${openDropdown ? "open" : "close"}`
  const overlayClassName = `dropdown-overlay ${openDropdown ? "open" : "close"}`

  return (
    <>
      <div className={overlayClassName} onClick={closeDropdown}></div>
      <div className={dropdownClassName}>
        <button type="button" className="dropdown-item" onClick={closeDropdown}>Info</button>
        <button type="button" className="dropdown-item" onClick={closeDropdown}>Mute</button>
      </div>
    </>
  )
}

export default DropdownChatMenu;
