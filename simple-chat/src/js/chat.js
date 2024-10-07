import "../css/chat.css"
import messagesJson from "../mockData/messages.json";
import userList from "../mockData/userList.json"
import { printMessage, printMessagesFromArray } from "../common/printMessage";
import { printHeader } from "../common/printHeader";

const dropdownButton = document.querySelector(".header__dropdown-button");
const dropdownMenu = document.querySelector(".header__dropdown");
const input = document.querySelector(".form-input");

const params = new URLSearchParams(document.location.search).get('chatId');
const MESSAGES_LOCALSTORAGE = `MESSAGES_${params}`;

printHeader(params)

let messageId = 0;
let messages = []
loadMessagesFromMockData()
loadMessagesFromLocalStorage()
printMessagesFromArray(messages)

document.addEventListener('submit', handleSubmit.bind(this))
dropdownButton.addEventListener("click", () => { dropdownMenu.classList.toggle("header__dropdown--open") });

document.addEventListener("click", (e) => {
  if (dropdownMenu.classList.contains("header__dropdown--open") && !e.target.classList.contains('header__dropdown-item') && !e.target.classList.contains('header__dropdown-button')) {
    dropdownMenu.classList.remove("header__dropdown--open");
  }
});

function handleSubmit(event) {
  event.preventDefault();
  if (input.value === "") { return }
  const message = {
    id: messageId++,
    sender: 1,
    time: new Date(),
    text: input.value
  };
  messages.push(message)
  localStorage.setItem(MESSAGES_LOCALSTORAGE, JSON.stringify(messages));
  printMessage(message)
  input.value = "";
  input.focus();
}

function loadMessagesFromLocalStorage() {
  const json = localStorage.getItem(MESSAGES_LOCALSTORAGE);
  if (!json) { return }
  const messagesFromLocalStorage = JSON.parse(json);
  messages.push(...messagesFromLocalStorage)
}

function loadMessagesFromMockData() {
  if (!messagesJson) { return }
  const usersMessage = messagesJson.find((element) => element.userId === params.toString())
  if (!usersMessage) { return }
  const mockMessage = usersMessage.messages
  messageId = Number(mockMessage[mockMessage.length - 1].id) + 1
  printMessagesFromArray(mockMessage)
}