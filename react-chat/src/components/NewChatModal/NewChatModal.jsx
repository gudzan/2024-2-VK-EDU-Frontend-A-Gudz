import React, { useEffect, useRef, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import './NewChatModal.scss'
import Overlay from "../Overlay";
import classnames from 'classnames';
import { instance } from "../../api/api.config";

const NewChatModal = ({ openNewChat, closeNewChat, addNewChat }) => {
  const inputNewChatRef = useRef(null);
  const [newChatName, setNewChatName] = useState("")
  const newChatClassName = classnames('new-сhat', {
    'open': openNewChat
  });

  useEffect(() => {
    if (openNewChat) {
      inputNewChatRef.current.focus();
    }
  }, [openNewChat])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (newChatName === "") { return }
    let newChat = null
    instance.post('/api/chats/',
      {
        "members": [
          newChatName
        ],
        "is_private": true,
        "title": "Название чата"
      }
    )
      .then((response) => {
        newChat = response.data;
        addNewChat(newChat)
      })
      .catch((error) => {
        if (error.response.status === 401 && error.config.url === "/api/auth/refresh/") {
          navigate(ROUTES.auth)
        }
      })
    setNewChatName("")
  }

  const closeNewChatWindow = () => {
    setNewChatName("")
    closeNewChat()
  }

  const inputNewChat = (e) => setNewChatName(e.target.value)

  return (
    <>
      <Overlay openOverlay={openNewChat} closeOverlay={closeNewChatWindow} />
      <div className={newChatClassName}>
        <button type="button" className="icon new-сhat__close" onClick={closeNewChatWindow}><CloseIcon /></button>
        <form className="new-сhat__form" onSubmit={handleSubmit}>
          <span className="new-сhat__title">Добавление нового чата</span>
          <input tabIndex="0" className="new-сhat__form-input" name="new-сhat-name" placeholder="Введите id чата" type="text"
            ref={inputNewChatRef}
            value={newChatName}
            onChange={inputNewChat} />
          <button type="submit" className="new-сhat__submit">Добавить</button>
        </form>
      </div>
    </>
  )
}

export default NewChatModal