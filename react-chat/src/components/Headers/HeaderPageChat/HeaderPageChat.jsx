import React, { useState } from "react";
import "./HeaderPageChat.scss"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DropdownChatMenu from "../../DropdownChatMenu"
import { Link } from "react-router-dom";

const HeaderPageChat = ({ userAvatar, userName }) => {
  const [openDropdown, setOpenDropdown] = useState(false)

  const toggleDropdown = () => setOpenDropdown(!openDropdown)
  const closeDropdown = () => setOpenDropdown(false)

  return (
    <header>
      <div className="header__box">
        <Link to="/2024-2-VK-EDU-Frontend-A-Gudz">
          <button type="button" className="icon"><ArrowBackIcon /></button>
        </Link>
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