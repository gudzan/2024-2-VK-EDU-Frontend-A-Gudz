import React, { useState } from "react";
import "./HeaderPageChat.scss"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DropdownChatMenu from "../../DropdownChatMenu"
import { Link } from "react-router-dom";
import ROUTES from "../../../config/routes";
import defaultAvatar from "../../../assets/images/default-avatar.jpg"

const UserInfo = ({ avatar, title }) => {
  const avatarImage = avatar ?? defaultAvatar
  return (
    <div className="header__user">
      <img className="header__user-image" src={avatarImage} alt="user avatar" />
      <div className="header__user-info">
        <span className="header__user-name">{title}</span>
        <span className="header__user-last-time">был(а) 2 часа назад</span>
      </div>
    </div>
  )
}

const HeaderPageChat = ({ chat }) => {
  const [openDropdown, setOpenDropdown] = useState(false)
  const userInfo = (chat && chat.title) ? <UserInfo avatar={chat.avatar} title={chat.title} /> : null;

  const toggleDropdown = () => setOpenDropdown((prevState) => !prevState)
  const closeDropdown = () => setOpenDropdown(false)

  return (
    <header>
      <div className="header__box">
        <Link to={ROUTES.root}>
          <button type="button" className="icon"><ArrowBackIcon /></button>
        </Link>
        {userInfo}
        <div className="header__settings">
          <button type="button" className="icon header__dropdown-button" onClick={toggleDropdown}><MoreVertIcon /></button>
          <DropdownChatMenu openDropdown={openDropdown} closeDropdown={closeDropdown} />
        </div>
      </div>
    </header>
  )
}

export default HeaderPageChat