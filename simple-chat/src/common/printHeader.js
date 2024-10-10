const headerSettings = document.querySelector(".header__settings");

export const printHeader = (chat) => {
  if (!chat) { return }
  const headerUser = document.createElement("div");
  const headerUserImage = document.createElement("img");
  const headerUserInfo = document.createElement("div");
  const headerUserName = document.createElement("span");
  const headerUserLastTime = document.createElement("span");
  headerUser.className = "header__user"
  headerUserImage.className = "header__user-image"
  headerUserInfo.className = "header__user-info"
  headerUserName.className = "header__user-name"
  headerUserLastTime.className = "header__user-last-time"

  headerUser.append(headerUserImage)
  headerUser.append(headerUserInfo)
  headerUserInfo.append(headerUserName)
  headerUserInfo.append(headerUserLastTime)

  headerUserImage.setAttribute("src", chat.userAvatar)
  headerUserName.innerText = chat.userName;
  headerUserLastTime.innerText = "был(а) 2 часа назад";

  headerSettings.before(headerUser)
}