import { getRandomColor, getRandomId, getRandomNumber } from "../utils";
import messagesJson from "../mockData/messages.json"
import chatList from "../mockData/chatList.json"

const CHATS_LOCALSTORAGE_KEY = 'CHATS';
const MESSAGES_LOCALSTORAGE_KEY = `MESSAGES_`;

const getLocalStorage = (key) => {
  const json = localStorage.getItem(key);
  if (!json) {
    return null
  }
  return JSON.parse(json);
}

const setLocalStorage = (key, object) => {
  localStorage.setItem(key, JSON.stringify(object));
}

export const getChatFromById = (id) => {
  const chats = getLocalStorage(CHATS_LOCALSTORAGE_KEY)
  if (!chats) {
    return null
  }
  const find = chats.find((element) => element.id === id)
  return find ? find : null
}

const setLastMessageToChat = (chatId, message) => {
  const chats = getLocalStorage(CHATS_LOCALSTORAGE_KEY)
  const chatById = chats.find((element) => element.id === chatId.toString())
  chatById.lastMessage = message.text
  chatById.lastMessageTime = message.time
  chatById.lastMessageIcon = "check"
  setLocalStorage(CHATS_LOCALSTORAGE_KEY, chats)
}

export const getMessagesByChatId = (chatId) => {
  const messages = []
  const messagesFromLocalStorage = getLocalStorage(`${MESSAGES_LOCALSTORAGE_KEY}${chatId}`)
  if (messagesFromLocalStorage) {
    messages.push(...messagesFromLocalStorage)
  }
  else {
    const mockMessage = messagesJson.find((element) => element.chatId.toString() === chatId.toString())
    if (mockMessage) {
      messages.push(...mockMessage.messages)
    }
  }
  setLocalStorage(`${MESSAGES_LOCALSTORAGE_KEY}${chatId}`, messages)
  return messages
}

const setNewMessage = (newMessage, chatId) => {
  const messages = getMessagesByChatId(chatId)
  messages.push(newMessage)
  setLocalStorage(`${MESSAGES_LOCALSTORAGE_KEY}${chatId}`, messages)
  setLastMessageToChat(chatId, newMessage)
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

export const createNewMessage = (newMessageText, chatId) => {
  const newMessage = {
    id: getRandomId(),
    sender: 1,
    time: new Date(),
    text: newMessageText,
        icon: "check"
  };
  setNewMessage(newMessage, chatId)
  return newMessage
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