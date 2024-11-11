import React, { useEffect, useRef, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import ChatList from "../../components/ChatsList"
import './PageChatList.scss'
import NewChatModal from "../../components/NewChatModal";
import Layout from "../../components/Layout";
import { HeaderPageChatList } from "../../components/Headers";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../config/routes.js";
import chatService from "../../api/chat/chatService.js";

const PageChatList = () => {
  const chatsRef = useRef(null)
  const navigate = useNavigate();
  const [chats, setChats] = useState(null)
  const [newRow, setNewRow] = useState(null)
  const [openNewChat, setOpenNewChat] = useState(false)

  const getChats = async () => {
    try {
      const results = await chatService.getAllChats();
      if (results) {
        setChats(results)
      }
    } catch (error) {
      navigate(ROUTES.auth); console.log(error);
    }
  }

  const refresh = () => {
    getChats()
    setNewRow(null)
  }

  useEffect(() => {
    refresh()
    const intervalId = setInterval(() => {
      getChats();
    }, 10000);

    return () => {
      clearInterval(intervalId)
    };
  }, [])

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

  const search = async (searchTerm) => {
    if (searchTerm === "") {
      refresh()
    }
    else {
      try {
        const results = await chatService.getAllChatsWithSearch(searchTerm);
        if (results) {
          setChats(results)
        }
      } catch (error) {
        navigate(ROUTES.auth); console.log(error);
      }
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
