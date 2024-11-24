import song from "../assets/audio/notification.mp3"

const getTextForNotify = (lastMessage) => {
  if (lastMessage.files.length > 0) {
    return "Фото"
  }
  else if (lastMessage.voice) {
    return "Голосовое сообщение"
  }
  else {
    return lastMessage.text
  }
}

const callNotify = (title, msg, icone) => {
  var audio = new Audio(song);
  new Notification(title, { body: msg, icon: icone, vibrate: [200, 100, 200] });
  audio.play();
}

const notifyMe = (lastMessage, icon) => {
  const text = getTextForNotify(lastMessage)
  const sender = `${lastMessage.sender.first_name} ${lastMessage.sender.last_name}`
  if (!("Notification" in window)) {
    console.log("This browser does not support Desktop notifications");
  }
  if (Notification.permission === "granted") {
    callNotify(sender, text, icon);
    return;
  }
  if (Notification.permission !== "denied") {
    Notification.requestPermission((permission) => {
      if (permission === "granted") {
        callNotify(sender, text, icon);
      }
    });
    return;
  }
}

export default notifyMe