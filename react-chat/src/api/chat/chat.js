import { getRandomColor, getRandomId, getRandomNumber } from "../../utils";
import chatList from "../../mockData/chatList.json"
import { getLocalStorage, setLocalStorage } from "../localSrorage";
import { createNewMessage } from "../messages/messages";
const CHATS_LOCALSTORAGE_KEY = 'CHATS';

export const getChatFromById = (id) => {
  const chats = getLocalStorage(CHATS_LOCALSTORAGE_KEY)
  if (!chats) {
    return null
  }
  const find = chats.find((element) => element.id === id)
  return find ? find : null
}

export const setLastMessageToChat = (chatId, message) => {
  const chats = getLocalStorage(CHATS_LOCALSTORAGE_KEY)
  const chatById = chats.find((element) => element.id === chatId.toString())
  chatById.lastMessage = message.text
  chatById.lastMessageTime = message.time
  chatById.lastMessageIcon = "check"
  setLocalStorage(CHATS_LOCALSTORAGE_KEY, chats)
}

export const getChats = () => {
  const chats = []
  const chatsFromLocalStorage = getLocalStorage(CHATS_LOCALSTORAGE_KEY);
  if (chatsFromLocalStorage) {
    chats.push(...chatsFromLocalStorage)
  }
  else {
    if (chatList) {
      chats.push(...chatList)
    }
  }
  setLocalStorage(CHATS_LOCALSTORAGE_KEY, chats)
  return chats
}

const setNewChat = (newChat) => {
  const chats = getLocalStorage(CHATS_LOCALSTORAGE_KEY)
  chats.unshift(newChat)
  setLocalStorage(CHATS_LOCALSTORAGE_KEY, chats)
}

export const createNewChat = (chatName) => {
  const newChat = {
    "id": getRandomId(),
    "userName": chatName,
    "userAvatar": `https://api.dicebear.com/9.x/adventurer/svg?seed=${getRandomNumber()}&translateY=5&flip=true&skinColor=f2d3b1&backgroundColor=${getRandomColor()}`
  }
  setNewChat(newChat)
  createNewMessage("Привет!", newChat.id)
  return getChatFromById(newChat.id)
}

export const getChatsByChatName = (searchvalue) => {
  const chats = getLocalStorage(CHATS_LOCALSTORAGE_KEY)
  if (!chats) {
    return []
  }
  const find = chats.filter((element) => element.userName.toLowerCase().includes(searchvalue.toString().toLowerCase()))
  return find
}