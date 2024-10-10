import { transformDate } from "./utils";

const chatsInner = document.querySelector(".chats__inner");

const createNewChatElement = (newChat) => {
  if (!newChat) { return }
  const chat = document.createElement("li");
  const chatLink = document.createElement("a");
  const chatImg = document.createElement("img");
  const chatMain = document.createElement("div");
  const chatMainName = document.createElement("span");
  const chatMainMessage = document.createElement("span");
  const chatInfo = document.createElement("div");
  const chatInfoTime = document.createElement("span");
  const chatInfoIcon = document.createElement("div");

  chat.append(chatLink)
  chatLink.append(chatImg)
  chatLink.append(chatMain)
  chatLink.append(chatInfo)
  chatMain.append(chatMainName)
  chatMain.append(chatMainMessage)
  chatInfo.append(chatInfoTime)
  chatInfo.append(chatInfoIcon)

  chat.className = "chat"
  chatLink.className = "chat__link"
  chatLink.href = `./chat.html?chatId=${newChat.id}`
  chatImg.setAttribute("src", newChat.userAvatar)
  chatMain.className = "chat__main"
  chatMainName.className = "chat__main-name"
  chatMainMessage.className = "chat__main-message"
  chatInfo.className = "chat__info"
  chatInfoTime.className = "chat__info-time"
  chatInfoIcon.className = "material-icons"

  chatMainName.innerText = newChat.userName;
  chatMainMessage.innerText = newChat.lastMessage;
  chatInfoTime.innerText = transformDate(newChat.lastMessageTime);
  chatInfoIcon.innerText = newChat.lastMessageIcon;

  return chat;
}

export const printChat = (newChat) => {
  const fragment = createNewChatElement(newChat)
  chatsInner.prepend(fragment);
}

export const printChatsFromArray = (chatArray) => {
  const fragment = new DocumentFragment();
  chatsInner.textContent = ''
  if (chatArray.length === 0) {
    const notFound = document.createElement("span");
    notFound.className = "notFound"
    notFound.innerText = "Чатов нет";
    fragment.append(notFound);
  }
  else {
    for (let chat of chatArray) {
      const li = createNewChatElement(chat)
      fragment.append(li);
    }
  }
  chatsInner.append(fragment);
}