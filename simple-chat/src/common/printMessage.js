import { transformDate } from "./utils.js";
const messagesBox = document.querySelector(".messages");
const messagesInner = document.querySelector(".message__inner");

export const printMessage = (message) => {
  const fragment = createNewMessage(message)
  messagesInner.append(fragment);
  messagesBox.scrollTop = messagesBox.scrollHeight
}

export const printMessagesFromArray = (messageArray) => {
  let fragment = new DocumentFragment();
  for (let message of messageArray) {
    let li = createNewMessage(message)
    fragment.append(li);
  }
  messagesInner.append(fragment);
  messagesBox.scrollTop = messagesBox.scrollHeight
}

const createNewMessage = (newMessage) => {
  let message = document.createElement("li");
  let messageText = document.createElement("span");
  let messageInfo = document.createElement("div");
  let messageInfoTime = document.createElement("span");

  message.append(messageText)
  message.append(messageInfo)
  messageInfo.append(messageInfoTime)

  message.className = "message"
  if (newMessage.sender === 1) {
    message.className += " message--my"
    let messageInfoIcons = document.createElement("div");
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