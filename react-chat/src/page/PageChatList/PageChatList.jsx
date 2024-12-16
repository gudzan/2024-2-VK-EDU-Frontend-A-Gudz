import { useEffect, useRef, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import ChatList from "../../components/ChatsList";
import styles from "./PageChatList.module.scss";
import NewChatModal from "../../components/NewChatModal";
import Layout from "../../components/Layout";
import { HeaderPageChatList } from "../../components/Headers";
import chatApi from "../../api/chat/chatApi.js";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/auth/auth.js";
import { addNewChat, setPrevChats } from "../../store/chats/chats.js";
import { selectChats, selectChatsStatus } from "../../store/chats/chatsSelectors.js";
import storeStatus from "../../store/storeStatus.js";

const PageChatList = () => {
  const chatsRef = useRef(null);
  const dispatch = useDispatch();
  const [newRow, setNewRow] = useState(null);
  const [openNewChat, setOpenNewChat] = useState(false);
  const [searchChats, setSearchChats] = useState(null);
  const chats = useSelector(selectChats);
  const chatStatus = useSelector(selectChatsStatus);
  const isLoadingChats = chats.length > 0 ? false : chatStatus === storeStatus.loading;

  useEffect(() => {
    dispatch(setPrevChats(chats));
  }, [chats]);

  const refresh = () => {
    setSearchChats(null);
    setNewRow(null);
  };

  const newChat = (newChat) => {
    setNewRow(newChat);
    dispatch(addNewChat(newChat));
    closeNewChat();
    chatsRef.current.scrollTo(0, 0);
  };

  const openNewChatWindow = () => setOpenNewChat(true);
  const closeNewChat = () => setOpenNewChat(false);

  const search = async (searchTerm) => {
    if (searchTerm === "") {
      refresh();
      return;
    }
    try {
      const results = await chatApi.getAllChatsWithSearch(searchTerm);
      setSearchChats(results);
    } catch (error) {
      console.log(error);
      if (error.status === 401) {
        dispatch(logOut());
      }
    }
  };

  const closeSearchInput = () => refresh();
  const chatList = searchChats !== null ? searchChats : chats;

  return (
    <Layout>
      <HeaderPageChatList closeSearchInput={closeSearchInput} search={search} />
      <main className={styles.chats} ref={chatsRef}>
        <NewChatModal openNewChat={openNewChat} closeNewChat={closeNewChat} addNewChat={newChat} />
        <ChatList chats={chatList} newRow={newRow} isLoading={isLoadingChats}></ChatList>
        <button className={styles.edit} onClick={openNewChatWindow}><EditIcon /></button>
      </main>
    </Layout>
  );
};

export default PageChatList;
