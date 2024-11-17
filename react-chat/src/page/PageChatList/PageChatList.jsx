import React, { useEffect, useRef, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import ChatList from "../../components/ChatsList"
import styles from "./PageChatList.module.scss"
import NewChatModal from "../../components/NewChatModal";
import Layout from "../../components/Layout";
import { HeaderPageChatList } from "../../components/Headers";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../config/routes.js";
import chatService from "../../api/chat/chatService.js";
import { useChats } from "../../hooks/useChats.jsx";

const PageChatList = () => {
  const chatsRef = useRef(null)
  const navigate = useNavigate();
  const [newRow, setNewRow] = useState(null)
  const [openNewChat, setOpenNewChat] = useState(false)
  const {chats, setChats, getAllChats} = useChats()

  const refresh = () => {
    getAllChats()
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
        navigate(ROUTES.auth); 
        console.log(error);
      }
    }
  }

  const closeSearchInput = () => refresh()

  return (
    <Layout>
      <HeaderPageChatList closeSearchInput={closeSearchInput} search={search} />
      <main className={styles.chats} ref={chatsRef}>
        <NewChatModal openNewChat={openNewChat} closeNewChat={closeNewChat} addNewChat={addNewChat} />
        <ChatList chats={chats} newRow={newRow}></ChatList>
        <button className={styles.edit} onClick={openNewChatWindow}><EditIcon /></button>
      </main>
    </Layout>
  );
};

export default PageChatList;
