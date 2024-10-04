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