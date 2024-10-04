import "./index.css";

import { printMessage, printMessagesFromArray } from "../common/printMessage";
import { transformDate } from "../common/utils";

const MESSAGES_LOCALSTORAGE = "MESSAGES";

const dropdownButton = document.querySelector(".header__dropdown-button");
const dropdownMenu = document.querySelector(".header__dropdown");
const input = document.querySelector(".form-input");

let messages = []
loadMessagesFromLocalStorage()

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
    text: input.value,
    name: "me",
    time: transformDate(new Date())
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
  printMessagesFromArray(messagesFromLocalStorage)
}