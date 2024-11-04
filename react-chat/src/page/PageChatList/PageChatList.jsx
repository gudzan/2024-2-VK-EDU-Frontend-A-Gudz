import React, { useEffect, useRef, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import ChatList from "../../components/ChatsList"
import './PageChatList.scss'
import NewChatModal from "../../components/NewChatModal";
import Layout from "../../components/Layout";
import { HeaderPageChatList } from "../../components/Headers";
import { getChatsByChatName } from "../../api/chat/chat.js";
import { instance } from "../../api/api.config.js";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../config/routes.js";

const PageChatList = () => {
  const chatsRef = useRef(null)
  const navigate = useNavigate();
  const [chats, setChats] = useState(null)
  const [newRow, setNewRow] = useState(null)
  const [openNewChat, setOpenNewChat] = useState(false)

  useEffect(() => {
    instance.get('/api/chats/')
      .then((response) => {
        setChats(response.data.results)
      })
      .catch((error) => {
        if (error.message = "Unauthorized" || (error.response.status === 401 && error.config.url === "/api/auth/refresh/")) {
          navigate(ROUTES.auth)
        }
      })
  }, [])

  const refresh = () => {
    instance.get('/api/chats/')
      .then((response) => {
        setChats(response.data.results)
      })
      .catch((error) => {
        if (error.message = "Unauthorized" || (error.response.status === 401 && error.config.url === "/api/auth/refresh/")) {
          navigate(ROUTES.auth)
        }
      })
    setNewRow(null)
  }

  const addNewChat = (newChat) => {
    setNewRow(newChat)
    const oldChats = chats
    oldChats.unshift(newChat)
    setChats(oldChats)
    closeNewChat()
    chatsRef.current.scrollTo(0, 0)
  }

  const openNewChatWindow = () => setOpenNewChat(true)
  const closeNewChat = () => setOpenNewChat(false)

  const search = (searchTerm) => {
    if (searchTerm === "") {
      refresh()
    }
    else {
      instance.get(`/api/chats/?search=${searchTerm}`)
        .then((response) => {
          setChats(response.data.results)
        })
        .catch((error) => {
          if (error.response.status === 401 && error.config.url === "/api/auth/refresh/") {
            navigate(ROUTES.auth)
          }
        })
    }
  }

  const closeSearchInput = () => refresh()

  return (
    <Layout>
      <HeaderPageChatList closeSearchInput={closeSearchInput} search={search} />
      <main className="chats" ref={chatsRef}>
        <NewChatModal openNewChat={openNewChat} closeNewChat={closeNewChat} addNewChat={addNewChat} />
        <ChatList chats={chats} newRow={newRow}></ChatList>
        <button className="icon fix-button" onClick={openNewChatWindow}><EditIcon /></button>
      </main>
    </Layout>
  );
};

export default PageChatList;
