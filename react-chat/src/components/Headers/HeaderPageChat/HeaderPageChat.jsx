import React, { useState } from "react";
import styles from "./HeaderPageChat.module.scss"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DropdownChatMenu from "../../DropdownChatMenu"
import { useNavigate } from "react-router-dom";
import HeaderUserInfo from "../HeaderUserInfo/HeaderUserInfo";

const HeaderPageChat = ({ chat }) => {
  const userInfo = (chat && chat.title) ? <HeaderUserInfo avatar={chat.avatar} title={chat.title} id={chat.id} /> : null;
  const [openDropdown, setOpenDropdown] = useState(false)
  const navigate = useNavigate();

  const toggleDropdown = () => setOpenDropdown((prevState) => !prevState)
  const closeDropdown = () => setOpenDropdown(false)
  const goBack = () => navigate(-1)

  return (
    <header>
      <div className={styles.header__box}>
        <button type="button" onClick={goBack} className={styles.icon}><ArrowBackIcon /></button>
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