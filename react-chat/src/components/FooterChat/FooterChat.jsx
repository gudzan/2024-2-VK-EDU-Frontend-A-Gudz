import React, { useEffect, useRef, useState } from "react";
import "./FooterChat.scss"
import AttachmentIcon from '@mui/icons-material/Attachment';
import SendIcon from '@mui/icons-material/Send';

const FooterChat = ({ sendMessage }) => {
  const inputRef = useRef(null);
  const [messageText, setMessageText] = useState("")

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault()
    if (messageText === "") { return }
    sendMessage(messageText)
    setMessageText("")
    inputRef.current.focus();
  }

  const inputChange = (e) => setMessageText(e.target.value)

  return (
    <footer>
      <form className="footer-form" action="/" onSubmit={handleSubmit} >
        <button type="button" className="icon"><AttachmentIcon /></button>
        <input ref={inputRef} className="footer-form__input" tabIndex="0" name="message-text" placeholder="Введите сообщение" type="text" value={messageText}
          onChange={inputChange} />
        <button type="submit" className="icon"><SendIcon /></button>
      </form>
    </footer>
  )
}

export default FooterChat;
