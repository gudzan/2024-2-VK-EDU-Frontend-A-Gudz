import React, { useEffect, useRef, useState } from "react";
import "./FooterChat.scss"
import AttachFileIcon from '@mui/icons-material/AttachFile';
import PhotoIcon from '@mui/icons-material/Photo';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import PlaceIcon from '@mui/icons-material/Place';
import SendIcon from '@mui/icons-material/Send';
import classNames from "classnames";

const FooterChat = ({ sendMessage }) => {
  const inputRef = useRef(null);
  const attachRef = useRef(null);
  const [messageText, setMessageText] = useState("")
  const [openAttach, setOpenAttach] = useState(false)

  const attachClassName = classNames('attach', {
    "open": openAttach,
    "close": !openAttach
  });

  const toggleAttach = (event) => {
    if (attachRef.current && !attachRef.current.contains(event.target)) {
      setOpenAttach(false)
    }
    else {
      setOpenAttach(true)
    }
  }

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    inputRef.current.focus();
    if (openAttach) {
      document.addEventListener('mousedown', toggleAttach)
    }
    return () => document.removeEventListener('mousedown', toggleAttach)
  }, [openAttach])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (messageText === "") { return }
    sendMessage(messageText)
    setMessageText("")
    inputRef.current.focus();
  }

  const getGeolocation = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    const success = (pos) => {
      const { latitude, longitude } = pos.coords;
      sendMessage(`https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`)
    }

    const error = (err) => {
      console.log(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  }

  const inputChange = (e) => setMessageText(e.target.value)

  return (
    <footer>
      <form className="footer-form" action="/" onSubmit={handleSubmit} >
        <button type="button" className="icon" onClick={toggleAttach} ref={attachRef}><AttachFileIcon /></button>
        <div className={attachClassName}>
          <div className="attach__row" onClick={getGeolocation}>
            <PlaceIcon />Геопозиция
          </div>
          <div className="attach__row">
            <PhotoIcon />Фото
          </div>
          <div className="attach__row">
            <KeyboardVoiceIcon />Аудио
          </div>
        </div>
        <input ref={inputRef} className="footer-form__input" tabIndex="0" name="message-text" placeholder="Введите сообщение" type="text" value={messageText}
          onChange={inputChange} />
        <button type="submit" className="icon"><SendIcon /></button>
      </form>
    </footer>
  )
}

export default FooterChat;
