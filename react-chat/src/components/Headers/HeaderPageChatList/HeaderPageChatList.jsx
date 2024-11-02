import React, { useEffect, useRef, useState } from "react";
import './HeaderPageChatList.scss'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import useDebounce from "../../../hooks/useDebounce";
import DropdownChatListMenu from "../../DropdownChatListMenu";
import classnames from 'classnames';

const HeaderPageChatList = ({ closeSearchInput, search }) => {
  const inputSearchRef = useRef(null);
  const [openSearch, setOpenSearch] = useState(false)
  const [searchString, setSearchString] = useState("")
  const [openDropdown, setOpenDropdown] = useState(false)
  const debouncedSearchTerm = useDebounce(searchString, 250);

  const leftTitleClassName = classnames('header__left-title', {
    "close": !openSearch,
    "open": openSearch
  });
  
  const boxSearchClassName = classnames('header__box-search', {
    "close": !openSearch,
    "open": openSearch
  });

  useEffect(() => {
    if (openSearch) {
      inputSearchRef.current.focus();
    }
  }, [openSearch])

  useEffect(() => {
    search(debouncedSearchTerm)
  }, [debouncedSearchTerm]);

  const clickClose = () => {
    setOpenSearch(false)
    closeSearchInput()
  }

  const clickOpen = () => {
    setOpenSearch(true)
    setSearchString("")
  }

  const inputSearchChange = (e) => {
    setSearchString(e.target.value)
    search(e.target.value)
  }

  const toggleDropdown = () => setOpenDropdown((prevState) => !prevState)
  const closeDropdown = () => setOpenDropdown(false)

  return (
    <header>
      <div className="header__box">
        <div className="header__box-left">
          <button type="button" className="icon" onClick={toggleDropdown}><MenuIcon /></button>
          <DropdownChatListMenu openDropdown={openDropdown} closeDropdown={closeDropdown} />
          <span className={leftTitleClassName}>Все чаты</span>
        </div>
        <div className="header__box-right">
          <div className={boxSearchClassName}>
            <input ref={inputSearchRef} tabIndex="0"
              className="search-input"
              name="header-box-search"
              placeholder="Поиск"
              type="text"
              value={searchString}
              onChange={inputSearchChange} />
            <button type="button" className="icon header-box__close" onClick={clickClose}><CloseIcon /></button>
          </div>
          <button type="button" className="icon header__box-search-button" onClick={clickOpen}><SearchIcon /></button>
        </div>
      </div>
    </header>
  )
}

export default HeaderPageChatList