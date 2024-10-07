import "../css/index.css";
import userList from "../mockData/userList.json";
import { printChat, printChatsFromArray } from "../common/printChatList";
import { getRandomColor, getRandomNumber } from "../common/utils";

const CHATS_LOCALSTORAGE = 'CHATS';

let chatId = userList.length;
let chats = []
loadChatsFromLocalStorage()
printChatsFromArray(userList)

const newChatButton = document.querySelector(".fix-button");
newChatButton.addEventListener("click", () => {
  const newChat = {
    "id": (chatId++).toString(),
    "name": "Новый чат",
    "lastMessage": "",
    "lastMessageTime": "",
    "lastMessageIcon": "",
    "avatar": `https://api.dicebear.com/9.x/adventurer/svg?seed=${getRandomNumber()}&translateY=5&flip=true&skinColor=f2d3b1&backgroundColor=${getRandomColor()}`
  }
  chats.unshift(newChat)
  localStorage.setItem(CHATS_LOCALSTORAGE, JSON.stringify(chats));
  printChat(newChat)
});

function loadChatsFromLocalStorage() {
  const json = localStorage.getItem(CHATS_LOCALSTORAGE);
  if (!json) { return }
  const chatsFromLocalStorage = JSON.parse(json);
  printChatsFromArray(chatsFromLocalStorage)
  chats.push(...chatsFromLocalStorage)
  console.log(chats);
}