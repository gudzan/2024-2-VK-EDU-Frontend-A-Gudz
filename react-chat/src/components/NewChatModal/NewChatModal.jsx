import React, { useEffect, useRef, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import styles from './NewChatModal.module.scss'
import Overlay from "../Overlay";
import classnames from 'classnames';
import chatApi from "../../api/chat/chatApi";
import { useDispatch } from "react-redux";
import { logOut } from "../../store/auth.js";
import getErrorTranslation from "../../utils/errorTranslator";
import userApi from "../../api/user/userApi.js";

const initialNewChat = {
  "members": [],
  "is_private": true,
  "title": ""
}

const NewChatModal = ({ openNewChat, closeNewChat, addNewChat }) => {
  const dispatch = useDispatch();
  const inputNewChatRef = useRef(null);
  const [users, setUsers] = useState(null)
  const [chat, setChat] = useState(initialNewChat)
  // const [members, setMembers] = useState([])
  const [newChatName, setNewChatName] = useState("")
  const [error, setError] = useState([])
  const [openSelect, setOpenSelect] = useState(false)

  const openSelectClassName = classnames(styles.checkboxes, {
    [styles.open]: openSelect,
    [styles.close]: !openSelect,
  })
  const newChatClassName = classnames(styles.newChat, {
    [styles.open]: openNewChat,
    [styles.cutHeight]: !openSelect
  })

  const getCurrentUser = async () => {
    try {
      const users = await userApi.getAllUsers()
      if (users) {
        setUsers(users)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setError([])
    if (openNewChat) {
      inputNewChatRef.current.focus();
      getCurrentUser()
    }
  }, [openNewChat])

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const newChat = await chatApi.createNewChat(chat);
      if (newChat) {
        addNewChat(newChat)
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
    setChat(initialNewChat)
  }

  const getError = () => {
    if (error.length > 0) {
      const errorMessage = getErrorTranslation(error[0])
      return <div className={styles.error}>{errorMessage}</div>
    }
  }

  const closeNewChatWindow = () => {
    setNewChatName("")
    setOpenSelect(false)
    closeNewChat()
  }

  const inputNewChat = (e) => {
    setChat((prevState) => ({
      ...prevState,
      title: e.target.value
    }));
  }

  const changeMember = (e) => {
    const newMembers = new Set(chat.members)
    const userId = e.target.id
    if (e.target.checked) {
      newMembers.add(userId)
    }
    else {
      newMembers.delete(userId)
    }
    const privat = newMembers.size === 1

    setChat((prevState) => ({
      ...prevState,
      members: Array.from(newMembers),
      is_private: privat
    }));
  }

  useEffect(() => {
    console.log(chat);
  }, [chat])

  return (
    <>
      <Overlay openOverlay={openNewChat} closeOverlay={closeNewChatWindow} />
      <div className={newChatClassName}>
        <button type="button" className={styles.close} onClick={closeNewChatWindow}><CloseIcon /></button>
        <form className={styles.form} onSubmit={handleSubmit}>
          <span className={styles.title}>Добавление нового чата</span>
          <input tabIndex="0" className={styles.input} name="new-сhat-name" placeholder="Название чата" type="text"
            ref={inputNewChatRef}
            value={chat.title}
            onChange={inputNewChat} />
          <div className={styles.multiselect}>
            <div className={styles.selectBox} onClick={() => setOpenSelect((prev) => !prev)}>
              <select
                id="members"
                name="members"
                onChange={changeMember}>
                <option>Выбери пользователя</option>
              </select>
              <div className={styles.overSelect}></div>
            </div>
            <div className={openSelectClassName}>
              {users && users.map((user) => (
                <label htmlFor={user.id} key={user.id}>
                  <input type="checkbox" id={user.id} onChange={changeMember} />{user.first_name} {user.last_name}
                </label>
              ))}
            </div>
          </div>
          {getError()}
          <button type="submit" className={styles.submit}>Добавить</button>
        </form>
      </div>
    </>
  )
}

export default NewChatModal