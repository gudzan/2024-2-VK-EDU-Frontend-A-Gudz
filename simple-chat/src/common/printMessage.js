import { transformDate } from "./utils.js";

const messagesBox = document.querySelector(".messages");
const messagesInner = document.querySelector(".message__inner");

const createNewMessage = (newMessage, isNew) => {
  if (!newMessage) { return }
  const message = document.createElement("li");
  const messageText = document.createElement("span");
  const messageInfo = document.createElement("div");
  const messageInfoTime = document.createElement("span");

  message.append(messageText)
  message.append(messageInfo)
  messageInfo.append(messageInfoTime)

  message.className = "message" + (isNew ? " message--new" : "")
  console.log("message" + (isNew ? " message--new" : ""));
  
  if (newMessage.sender === 1) {
    message.className += " message--my"
    const messageInfoIcons = document.createElement("div");
    messageInfo.className = "message__info message__info--my"
    messageInfo.append(messageInfoIcons)
    messageInfoIcons.className = "material-icons"
    messageInfoIcons.innerText = "done_all"
  }
  else {
    message.className += " message--another"
    messageInfo.className = "message__info message__info--another"
  }
  messageText.className = "message__text"
  messageInfoTime.className = "message__info-time"
  messageText.innerText = newMessage.text;
  messageInfoTime.innerText = transformDate(newMessage.time);

  return message;
}

export const printMessage = (message) => {
  const fragment = createNewMessage(message, true)
  messagesInner.append(fragment);
  messagesBox.scrollTop = messagesBox.scrollHeight
}

export const printMessagesFromArray = (messageArray) => {
  if (!messageArray) { return }
  const fragment = new DocumentFragment();
  for (let message of messageArray) {
    const li = createNewMessage(message, false)
    fragment.append(li);
  }
  messagesInner.append(fragment);
  messagesBox.scrollTop = messagesBox.scrollHeight
}