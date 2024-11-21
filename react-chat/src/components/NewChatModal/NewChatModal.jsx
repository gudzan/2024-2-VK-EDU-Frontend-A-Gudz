import React, { useEffect, useRef, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import styles from './NewChatModal.module.scss'
import Overlay from "../Overlay";
import classnames from 'classnames';
import chatService from "../../api/chat/chatService";
import { useDispatch } from "react-redux";
import { logOut } from "../../store/auth";
import getErrorTranslation from "../../utils/errorTranslator";

const NewChatModal = ({ openNewChat, closeNewChat, addNewChat }) => {
  const dispatch = useDispatch();
  const inputNewChatRef = useRef(null);
  const [newChatName, setNewChatName] = useState("")
  const [error, setError] = useState([])
  const newChatClassName = classnames(styles.newChat, { [styles.open]: openNewChat })

  useEffect(() => {
    setError([])
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
      if (error.status === 400) {
        const data = error.response.data
        const errors = []
        for (let key in data) {
          if (data.hasOwnProperty(key)) {
            errors.push(...data[key])
          }
        }
        setError(errors)
      }
    }
    setNewChatName("")
  }

  const getError = () => {
    if (error.length > 0) {
      const errorMessage = getErrorTranslation(error[0])
      return <div className={styles.error}>{errorMessage}</div>
    }
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
        <button type="button" className={styles.close} onClick={closeNewChatWindow}><CloseIcon /></button>
        <form className={styles.form} onSubmit={handleSubmit}>
          <span className={styles.title}>Добавление нового чата</span>
          <input tabIndex="0" className={styles.input} name="new-сhat-name" placeholder="Введите id чата" type="text"
            ref={inputNewChatRef}
            value={newChatName}
            onChange={inputNewChat} />
          {getError()}
          <button type="submit" className={styles.submit}>Добавить</button>
        </form>
      </div>
    </>
  )
}

export default NewChatModal