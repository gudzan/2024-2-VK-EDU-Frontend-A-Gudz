import React, { useEffect, useRef, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import useDebounce from "../../hooks/useDebounce.jsx";
import ChatList from "../../components/ChatsList"
import { createNewChat, getChats, getChatsByChatName } from "../../service/dataService.js";
import './PageChatList.scss'

const PageChatList = () => {
  const inputSearchRef = useRef(null);
  const inputNewChatRef = useRef(null);
  const chatsRef = useRef(null)
  const [chats, setChats] = useState(getChats())
  const [newRow, setNewRow] = useState(null)
  const [openSearch, setOpenSearch] = useState(false)
  const [openNewChat, setOpenNewChat] = useState(false)
  const [searchString, setSearchString] = useState("")
  const [newChatName, setNewChatName] = useState("")
  const debouncedSearchTerm = useDebounce(searchString, 250);

  useEffect(() => {
    if (debouncedSearchTerm) {
      const newChats = getChatsByChatName(debouncedSearchTerm)
      setChats(newChats)
    } else {
      setChats(getChats())
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (openNewChat) {
      inputNewChatRef.current.focus();
    }
  }, [openNewChat])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (newChatName === "") { return }
    const newChat = createNewChat(newChatName)
    setNewRow(newChat)
    const oldChats = chats
    oldChats.unshift(newChat)
    setChats(oldChats)
    setNewChatName("")
    setOpenNewChat(false)
    chatsRef.current.scrollTop = 0
  }

  const closeNewChatWindow = () => {
    setNewChatName("")
    setOpenNewChat(false)
  }

  const openNewChatWindow = () => {
    setOpenNewChat(true)
    inputNewChatRef.current.focus();
  }

  const closeSearchInput = () => {
    setOpenSearch(false)
    setChats(getChats())
  }

  const openSearchInput = () => {
    inputSearchRef.current.focus();
    setOpenSearch(true)
    setSearchString("")
  }

  return (
    <>
      <header>
        <div className="header__box">
          <div className="header__box-left">
            <button type="button" className="icon"><MenuIcon /></button>
            <span className={`header__left-title ${openSearch ? "close" : "open"}`}>Все чаты</span>
          </div>
          <div className="header__box-right">
            <div className={`header__box-search ${openSearch ? "open" : "close"}`}>
              <input ref={inputSearchRef} tabIndex="0"
                className="search-input"
                name="header-box-search"
                placeholder="Поиск"
                type="text"
                value={searchString}
                onChange={e => setSearchString(e.target.value)} />
              <button type="button" className="icon header-box__close" onClick={closeSearchInput}><CloseIcon /></button>
            </div>
            <button type="button" className="icon header__box-search-button" onClick={openSearchInput}><SearchIcon /></button>
          </div>
        </div>
      </header>
      <main className="chats" ref={chatsRef}>
        <div className={`chats-overlay ${openNewChat ? "open" : "close"}`} onClick={closeNewChatWindow}></div>
        <div className={`new-сhat ${openNewChat ? "open" : ""}`}>
          <button type="button" className="icon new-сhat__close" onClick={closeNewChatWindow}><CloseIcon /></button>
          <form className="new-сhat__form" onSubmit={handleSubmit}>
            <span className="new-сhat__title">Добавление нового чата</span>
            <input tabIndex="0" className="form-input" name="new-сhat-name" placeholder="Введите название чата" type="text"
              ref={inputNewChatRef}
              value={newChatName}
              onChange={e => setNewChatName(e.target.value)} />
            <button type="submit" className="new-сhat__submit">Добавить</button>
          </form>
        </div>
        <ChatList chats={chats} newRow={newRow} ></ChatList>
        <button className="icon fix-button" onClick={openNewChatWindow}><EditIcon /></button>
      </main>
    </>
  );
};

export default PageChatList;
