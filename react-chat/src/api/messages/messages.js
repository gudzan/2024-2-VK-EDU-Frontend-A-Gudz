import { getRandomId } from "../../utils";
import messagesJson from "../../mockData/messages.json"
import { getLocalStorage, setLocalStorage } from "../localSrorage";
import { setLastMessageToChat } from "../chat/chat";
const MESSAGES_LOCALSTORAGE_KEY = `MESSAGES_`;

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