import "../css/chat.css"
import { printMessage, printMessagesFromArray } from "../common/printMessage";
import { printHeader } from "../common/printHeader";
import { createNewMessage, getChatFromById, getMessagesByChatId } from "../common/dataService ";

const dropdownButton = document.querySelector(".header__dropdown-button");
const dropdownMenu = document.querySelector(".header__dropdown");
const input = document.querySelector(".form-input");
const chatId = new URLSearchParams(document.location.search).get('chatId');

const messages = getMessagesByChatId(chatId)

const handleSubmit = (event) => {
  event.preventDefault();
  if (input.value === "") { return }
  const newMessage = createNewMessage(input.value, chatId)
  printMessage(newMessage)
  input.value = "";
  input.focus();
}

document.addEventListener('submit', handleSubmit.bind(this))
dropdownButton.addEventListener("click", () => { dropdownMenu.classList.toggle("header__dropdown--open") });

document.addEventListener("click", (e) => {
  if (dropdownMenu.classList.contains("header__dropdown--open") && !e.target.classList.contains('header__dropdown-item') && !e.target.classList.contains('header__dropdown-button')) {
    dropdownMenu.classList.remove("header__dropdown--open");
  }
});

printHeader(getChatFromById(chatId))
printMessagesFromArray(messages)
input.focus();