import React from "react";
import styles from "./DropdownChatMenu.module.scss"
import Overlay from "../Overlay";
import classnames from 'classnames';

const DropdownChatMenu = ({ openDropdown, closeDropdown }) => {
  const dropdownClassName = classnames(styles.dropdown, {
    [styles.open]: openDropdown,
    [styles.close]: !openDropdown,
  })

  return (
    <>
      <Overlay openOverlay={openDropdown} closeOverlay={closeDropdown} />
      <div className={dropdownClassName}>
        <button type="button" className={styles.item} onClick={closeDropdown}>Info</button>
        <button type="button" className={styles.item} onClick={closeDropdown}>Mute</button>
      </div>
    </>
  )
}

export default DropdownChatMenu;
