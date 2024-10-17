import "../css/index.css";
import { printChat, printChatsFromArray } from "../common/printChatList";
import { getChats, createNewChat, getChatsByChatName } from "../common/dataService ";
import { debounce } from "../common/utils";

const chats = getChats()
const newChatButton = document.querySelector(".fix-button");
const newChat = document.querySelector(".new-сhat");
const newChatClose = document.querySelector(".new-сhat__close");
const overlay = document.querySelector(".overlay");
const newChatInput = document.querySelector(".form-input");
const searchButton = document.querySelector(".header__box-search-button");
const searchInput = document.querySelector(".search-input");
const searchClose = document.querySelector(".header-box__close");
const headerLeftTitle = document.querySelector(".header__left-title");

const openNewChat = () => {
  newChat.classList.add("new-сhat--open");
  overlay.classList.add("overlay--open");
  newChatInput.focus()
}

const closeNewChat = () => {
  if (newChat.classList.contains("new-сhat--open") && overlay.classList.contains('overlay--open')) {
    newChat.classList.remove("new-сhat--open");
    overlay.classList.remove("overlay--open");
  }
}

const handleSubmit = (event) => {
  event.preventDefault()
  if (newChatInput.value === "") { return }
  const newChat = createNewChat(newChatInput.value)
  printChat(newChat)
  chats.unshift(newChat)
  closeNewChat()
  newChatInput.value = ""
}

const openSearch = () => {
  searchInput.classList.add("search-input--open");
  headerLeftTitle.classList.add("header__left-title--hidden")
  searchInput.focus()
}

const closeSearch = () => {
  searchInput.value = ""
  searchInput.classList.remove("search-input--open");
  headerLeftTitle.classList.remove("header__left-title--hidden")
  printChatsFromArray(chats)
}

const search = (event) => {
  const chats = getChatsByChatName(event.target.value)
  printChatsFromArray(chats)
}

const escape = (event) => {
  if (event.key === "Escape") {
    closeSearch()
    closeNewChat()
  }
}

document.addEventListener('keydown', escape.bind(this));
searchInput.addEventListener('input', debounce(search.bind(this), 250))
document.addEventListener('submit', handleSubmit.bind(this))
newChatButton.addEventListener("click", openNewChat);
newChatClose.addEventListener("click", closeNewChat);
overlay.addEventListener("click", closeNewChat);
searchClose.addEventListener("click", closeSearch);
searchButton.addEventListener("click", openSearch);

printChatsFromArray(chats)
