import React, { useEffect, useRef, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import ChatList from "../../components/ChatsList"
import './PageChatList.scss'
import NewChatModal from "../../components/NewChatModal";
import Layout from "../../components/Layout";
import { HeaderPageChatList } from "../../components/Headers";
import { getChats, getChatsByChatName } from "../../api/chat/chat.js";

const PageChatList = () => {
  const chatsRef = useRef(null)
  const [chats, setChats] = useState(getChats())
  const [newRow, setNewRow] = useState(null)
  const [openNewChat, setOpenNewChat] = useState(false)

  const refresh = () => {
    setChats(getChats())
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
      const newChats = getChatsByChatName(searchTerm)
      setChats(newChats)
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
