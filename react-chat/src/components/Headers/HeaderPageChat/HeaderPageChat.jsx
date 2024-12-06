import React, { useState } from "react";
import styles from "./HeaderPageChat.module.scss"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DropdownChatMenu from "../../DropdownChatMenu"
import { Link } from "react-router-dom";
import ROUTES from "../../../config/routes";
import HeaderUserInfo from "../HeaderUserInfo/HeaderUserInfo";

const HeaderPageChat = ({ chat }) => {
  const [openDropdown, setOpenDropdown] = useState(false)
  const userInfo = (chat && chat.title) ? <HeaderUserInfo avatar={chat.avatar} title={chat.title} /> : null;

  const toggleDropdown = () => setOpenDropdown((prevState) => !prevState)
  const closeDropdown = () => setOpenDropdown(false)

  return (
    <header>
      <div className={styles.header__box}>
        <Link to={ROUTES.root}>
          <button type="button" className={styles.icon}><ArrowBackIcon /></button>
        </Link>
        {userInfo}
        <div className={styles.header__settings}>
          <button type="button" className={styles.icon} onClick={toggleDropdown}><MoreVertIcon /></button>
          <DropdownChatMenu openDropdown={openDropdown} closeDropdown={closeDropdown} />
        </div>
      </div>
    </header>
  )
}

export default HeaderPageChat