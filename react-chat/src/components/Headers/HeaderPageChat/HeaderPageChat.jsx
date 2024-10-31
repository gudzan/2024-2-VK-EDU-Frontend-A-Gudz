import React, { useState } from "react";
import "./HeaderPageChat.scss"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DropdownChatMenu from "../../DropdownChatMenu"
import { usePage } from "../../../hooks/usePage";

const HeaderPageChat = ({ userAvatar, userName }) => {
  const { setChatId } = usePage();
  const [openDropdown, setOpenDropdown] = useState(false)

  const goBack = () => setChatId("")
  const toggleDropdown = () => setOpenDropdown(!openDropdown)
  const closeDropdown = () => setOpenDropdown(false)

  return (
    <header>
      <div className="header__box">
        <a onClick={goBack}>
          <button type="button" className="icon"><ArrowBackIcon /></button>
        </a>
        <div className="header__user">
          <img className="header__user-image" src={userAvatar} alt="user avatar" />
          <div className="header__user-info">
            <span className="header__user-name">{userName}</span>
            <span className="header__user-last-time">был(а) 2 часа назад</span>
          </div>
        </div>
        <div className="header__settings">
          <button type="button" className="icon header__dropdown-button" onClick={toggleDropdown}><MoreVertIcon /></button>
          <DropdownChatMenu openDropdown={openDropdown} closeDropdown={closeDropdown} />
        </div>
      </div>
    </header>
  )
}

export default HeaderPageChat