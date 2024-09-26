import "./index.css";
const MESSAGES_LOCALSTORAGE = "MESSAGES";

const dropdownButton = document.querySelector(".header__dropdown-button");
const dropdownMenu = document.querySelector(".header__dropdown");
const form = document.querySelector("form");
const formButtonSend = document.querySelector(".form__button-send");
const input = document.querySelector(".form-input");
const messagesBox = document.querySelector(".messages");
const messagesInner = document.querySelector(".message__inner");

let messages = []
loadMessagesFromLocalStorage()

form.addEventListener("submit", handleSubmit.bind(this));
form.addEventListener("keypress", handleKeyPress.bind(this));
formButtonSend.addEventListener('click', handleSubmit.bind(this))
dropdownButton.addEventListener("click", toggleDropdown);

function toggleDropdown() {
  dropdownMenu.classList.toggle("header__dropdown--open");
}

function closeDropdown() {
  dropdownMenu.classList.remove("header__dropdown--open");
}

document.addEventListener("click", (e) => {
  if (dropdownMenu.classList.contains("header__dropdown--open") && !e.target.classList.contains('header__dropdown-item') && !e.target.classList.contains('header__dropdown-button')) {
    closeDropdown()
  }
});

function handleSubmit(event) {
  event.preventDefault();
  if (input.value !== "") {
    const message = {
      text: input.value,
      name: "me",
      time: transformDate(new Date())
    };
    createNewMessage(message)
    addMessagesToLocalStorage(message)
    input.value = "";
  }
}

function handleKeyPress(event) {
  if (event.keyCode === 13) {
    form.dispatchEvent(new Event("submit"));
  }
}

function loadMessagesFromLocalStorage() {
  let json = localStorage.getItem(MESSAGES_LOCALSTORAGE);
  if (json !== null) {
    let messagesFromLocalStorage = JSON.parse(json);
    for (let message of messagesFromLocalStorage) {
      createNewMessage(message)
      messages.push(message)
    }
  }
}

function addMessagesToLocalStorage(newMessage) {
  messages = [...messages, newMessage];
  localStorage.setItem(MESSAGES_LOCALSTORAGE, JSON.stringify(messages));
}

function createNewMessage(newMessage) {
  let message = document.createElement("div");
  let messageText = document.createElement("div");
  let messageInfo = document.createElement("div");
  let messageInfoTime = document.createElement("div");
  let messageInfoIcons = document.createElement("div");

  message.append(messageText)
  message.append(messageInfo)
  messageInfo.append(messageInfoTime)
  messageInfo.append(messageInfoIcons)

  message.className = "message"
  messageText.className = "message__text"
  messageInfo.className = "message__info"
  messageInfoTime.className = "message__info-time"
  messageInfoIcons.className = "material-icons message__info-icons"

  messageText.innerText = newMessage.text;
  messageInfoTime.innerText = newMessage.time;
  messageInfoIcons.innerText = "done_all"

  messagesInner.append(message);
  messagesBox.scrollTop = messagesBox.scrollHeight
}

function transformDate(date) {
  return `${addZero(date.getHours())}:${addZero(date.getMinutes())}`
  function addZero(number) {
    return number < 10 ? `0${number}` : number
  }
}