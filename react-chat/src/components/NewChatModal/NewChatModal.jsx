import React, { useEffect, useRef, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import styles from './NewChatModal.module.scss'
import Overlay from "../Overlay";
import classnames from 'classnames';
import chatApi from "../../api/chat/chatApi";
import { useDispatch } from "react-redux";
import getErrorTranslation from "../../utils/errorTranslator";
import userApi from "../../api/user/userApi.js";
import AvatarField from "../AvatarField/AvatarField.jsx";

const initialNewChat = {
  "members": [],
  "is_private": true,
  "title": "",
  "avatar": null
}

const NewChatModal = ({ openNewChat, closeNewChat, addNewChat }) => {
  const inputNewChatRef = useRef(null);
  const usersList = useRef(null)
  const [users, setUsers] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [fetching, setFetching] = useState(true)
  const [chat, setChat] = useState(initialNewChat)
  const [error, setError] = useState([])
  const [openSelect, setOpenSelect] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const selectText = chat.members.length > 0 ? `Выбрано ${chat.members.length} пользователей` : "Выбери пользователя"

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
      const { results, count: totalCount } = await userApi.getAllUsers(currentPage, 10)
      if (results && users) {
        const newUsers = [...users, ...results]
        setUsers(newUsers)
        setTotalCount(totalCount)
        setCurrentPage(prevState => prevState + 1)
      }
    } catch (error) {
      console.log(error);
    } finally {
      setFetching(false)
    }
  }

  const scrollHandler = (e) => {
    const scrollHeight = e.target.scrollHeight;
    const scrollTop = e.target.scrollTop;
    const innerHeight = 180
    if ((scrollHeight - (scrollTop + innerHeight) < 20) && (users.length < totalCount)) {
      setFetching(true)
    }
  }

  useEffect(() => {
    usersList.current.addEventListener('scroll', scrollHandler)
  }, [totalCount])

  useEffect(() => {
    setError([])
    if (openNewChat && fetching) {
      getCurrentUser()
    }
  }, [openNewChat, fetching])

  useEffect(() => {
    if (chat.members.length > 1) {
      inputNewChatRef.current.focus();
    }
  }, [chat])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = new FormData(event.target)
    if (!chat.is_private && data.get('avatar').size === 0) {
      data.delete('avatar')
    }
    chat.members.forEach((item, index) => {
      data.append('members', item);
    });
    data.append("is_private", chat.is_private)

    try {
      const newChat = await chatApi.createNewChat(data);
      if (newChat) {
        addNewChat(newChat)
        closeNewChatWindow()
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
    setOpenSelect(false)
    setChat(initialNewChat)
    setUsers([])
    usersList.current.removeEventListener('scroll', scrollHandler)
    setFetching(true)
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

  const onChangeAvatar = (avatar) => {
    setChat((prevState) => ({
      ...prevState,
      avatar: avatar,
    }));
  }

  const getInput = () => {
    if (chat.members.length < 2) {
      return null
    }
    return (
      <>
        <input tabIndex="0" className={styles.input} name="title" placeholder="Название чата" type="text"
          ref={inputNewChatRef}
          value={chat.title}
          onChange={inputNewChat} required={true} />
        <AvatarField avatarImg={chat.avatar} canEdit={true} onChange={onChangeAvatar} />
      </>
    )
  }

  return (
    <>
      <Overlay openOverlay={openNewChat} closeOverlay={closeNewChatWindow} />
      <div className={newChatClassName}>
        <button type="button" className={styles.close} onClick={closeNewChatWindow}><CloseIcon /></button>
        <form className={styles.form} onSubmit={handleSubmit}>
          <span className={styles.title}>Добавление нового чата</span>
          <div className={styles.multiselect}>
            <div className={styles.selectBox} onClick={() => setOpenSelect((prev) => !prev)}>
              <select onChange={changeMember}>
                <option >{selectText}</option>
              </select>
              <div className={styles.overSelect}></div>
            </div>
            <div className={openSelectClassName} ref={usersList}>
              {users.map((user) => (
                <label htmlFor={user.id} key={user.id}>
                  <input type="checkbox" checked={chat.members.includes(user.id)} id={user.id} onChange={changeMember} />{user.first_name} {user.last_name}
                </label>
              ))}
            </div>
          </div>
          {getInput()}
          {getError()}
          <button type="submit" className={styles.submit}>Добавить</button>
        </form>
      </div>
    </>
  )
}

export default NewChatModal