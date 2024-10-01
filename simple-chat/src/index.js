import "./index.css";
const MESSAGES_LOCALSTORAGE = "MESSAGES";

const dropdownButton = document.querySelector(".header__dropdown-button");
const dropdownMenu = document.querySelector(".header__dropdown");
const input = document.querySelector(".form-input");
const messagesBox = document.querySelector(".messages");
const messagesInner = document.querySelector(".message__inner");

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
  if (input.value === "") {
    return
  }
  const message = {
    text: input.value,
    name: "me",
    time: transformDate(new Date())
  };
  messages.push(message)
  localStorage.setItem(MESSAGES_LOCALSTORAGE, JSON.stringify(messages));
  messagesInner.append(createNewMessage(message));
  messagesBox.scrollTop = messagesBox.scrollHeight
  input.value = "";
  input.focus();
}

function loadMessagesFromLocalStorage() {
  const json = localStorage.getItem(MESSAGES_LOCALSTORAGE);
  if (!json) {
    return
  }
  let messagesFromLocalStorage = JSON.parse(json);
  let fragment = new DocumentFragment();
  for (let message of messagesFromLocalStorage) {
    messages.push(message)
    let li = createNewMessage(message)
    fragment.append(li);
  }
  messagesInner.append(fragment);
  messagesBox.scrollTop = messagesBox.scrollHeight
}

function createNewMessage(newMessage) {
  let message = document.createElement("li");
  let messageText = document.createElement("span");
  let messageInfo = document.createElement("div");
  let messageInfoTime = document.createElement("span");
  let messageInfoIcons = document.createElement("div");

  message.append(messageText)
  message.append(messageInfo)
  messageInfo.append(messageInfoTime)
  messageInfo.append(messageInfoIcons)

  message.className = "message"
  messageText.className = "message__text"
  messageInfo.className = "message__info"
  messageInfoTime.className = "message__info-time"
  messageInfoIcons.className = "material-icons"

  messageText.innerText = newMessage.text;
  messageInfoTime.innerText = newMessage.time;
  messageInfoIcons.innerText = "done_all"

  return message;
}

function transformDate(date) {
  return `${addZero(date.getHours())}:${addZero(date.getMinutes())}`
  function addZero(number) {
    return number < 10 ? `0${number}` : number
  }
}