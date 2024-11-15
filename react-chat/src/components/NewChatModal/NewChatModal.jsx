import React, { useEffect, useRef, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import './NewChatModal.scss'
import Overlay from "../Overlay";
import classnames from 'classnames';
import chatService from "../../api/chat/chatService";

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

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (newChatName === "") { return }
    try {
      const chat = await chatService.createNewChat(newChatName);
      if (chat) {
        addNewChat(chat)
      }
    } catch (error) {
      navigate(ROUTES.auth); 
      console.log(error);
    }
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