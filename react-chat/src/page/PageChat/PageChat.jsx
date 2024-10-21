import React, { useEffect, useRef, useState } from "react";
import "./PageChat.scss"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AttachmentIcon from '@mui/icons-material/Attachment';
import SendIcon from '@mui/icons-material/Send';
import { usePage } from "../../hooks/usePage";
import MessagesList from "../../components/MessagesList";
import { createNewMessage, getChatFromById, getMessagesByChatId } from "../../service/dataService";

const PageChat = () => {
  const inputRef = useRef(null);
  const messagesRef = useRef(null)
  const { chatId, setChatId } = usePage();
  const chat = getChatFromById(chatId);
  const messages = getMessagesByChatId(chatId);
  const [newMessage, setNewMessage] = useState(null)
  const [messageText, setMessageText] = useState("")
  const [openDropdown, setOpenDropdown] = useState(false)

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight 
  }, [newMessage]);

  const handleSubmit = (event) => {
    event.preventDefault()
    if (messageText === "") { return }
    const newMessege = createNewMessage(messageText, chatId)
    setNewMessage(newMessege)
    setMessageText("")
    inputRef.current.focus();
  }

  return (
    <>
      <header>
        <div className="header__box">
          <a onClick={() => setChatId("")}>
            <button type="button" className="icon"><ArrowBackIcon /></button>
          </a>
          <div className="header__user">
            <img className="header__user-image" src={chat.userAvatar} />
            <div className="header__user-info">
              <span className="header__user-name">{chat.userName}</span>
              <span className="header__user-last-time">был(а) 2 часа назад</span>
            </div>
          </div>
          <div className="header__settings">
            <button type="button" className="icon header__dropdown-button" onClick={() => { setOpenDropdown(!openDropdown) }}><MoreVertIcon /></button>
            <div className={`header__dropdown ${openDropdown ? "open" : "close"}`}>
              <button type="button" className="header__dropdown-item" onClick={() => { setOpenDropdown(false) }}>Info</button>
              <button type="button" className="header__dropdown-item" onClick={() => { setOpenDropdown(false) }}>Mute</button>
            </div>
          </div>
        </div>
      </header>
      <main className="messages" ref={messagesRef}>
        <div className={`messages-overlay ${openDropdown ? "open" : "close"}`} onClick={() => { setOpenDropdown(false) }}></div>
        <MessagesList messages={messages} newMessage={newMessage}/>
      </main>
      <footer>
        <form className="form" action="/" onSubmit={handleSubmit} >
          <button type="button" className="icon"><AttachmentIcon /></button>
          <input ref={inputRef} tabIndex="0" className="form-input" name="message-text" placeholder="Введите сообщение" type="text" value={messageText}
            onChange={e => setMessageText(e.target.value)} />
          <button type="submit" className="icon form__button-send"><SendIcon /></button>
        </form>
      </footer>
    </>
  );
};

export default PageChat;
