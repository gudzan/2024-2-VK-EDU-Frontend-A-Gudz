const chatsBox = document.querySelector(".chats");
const chatsInner = document.querySelector(".chats__inner");

export const printChatsFromArray = (chatArray) => {
  let fragment = new DocumentFragment();
  for (let chat of chatArray) {
    let li = createNewChatElement(chat)
    fragment.append(li);
  }
  chatsInner.append(fragment);
}

const createNewChatElement = (newChat) => {
  let chat = document.createElement("li");
  let chatLink = document.createElement("a");
  let chatImg = document.createElement("img");
  let chatMain = document.createElement("div");
  let chatMainName = document.createElement("span");
  let chatMainMessage = document.createElement("span");
  let chatInfo = document.createElement("div");
  let chatInfoTime = document.createElement("span");
  let chatInfoIcon = document.createElement("div");

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
  chatImg.setAttribute("src", newChat.avatar)
  chatMain.className = "chat__main"
  chatMainName.className = "chat__main-name"
  chatMainMessage.className = "chat__main-message"
  chatInfo.className = "chat__info"
  chatInfoTime.className = "chat__info-time"
  chatInfoIcon.className = "material-icons"

  chatMainName.innerText = newChat.name;
  chatMainMessage.innerText = newChat.lastMessage;
  chatInfoTime.innerText = newChat.lastMessageTime;
  chatInfoIcon.innerText = "done_all"

  return chat;
}