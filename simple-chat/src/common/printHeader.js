const headerSettings = document.querySelector(".header__settings");

export const printHeader = (user) => {
  let headerUser = document.createElement("div");
  let headerUserImage = document.createElement("img");
  let headerUserInfo = document.createElement("div");
  let headerUserName = document.createElement("span");
  let headerUserLastTime = document.createElement("span");
  headerUser.className = "header__user"
  headerUserImage.className = "header__user-image"
  headerUserInfo.className = "header__user-info"
  headerUserName.className = "header__user-name"
  headerUserLastTime.className = "header__user-last-time"

  headerUser.append(headerUserImage)
  headerUser.append(headerUserInfo)
  headerUserInfo.append(headerUserName)
  headerUserInfo.append(headerUserLastTime)

  headerUserImage.setAttribute("src", user.avatar)
  headerUserName.innerText = user.name;
  headerUserLastTime.innerText = "был(а) 2 часа назад";

  headerSettings.before(headerUser)
}