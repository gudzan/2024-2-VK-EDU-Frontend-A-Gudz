import React, { useEffect, useRef, useState } from "react";
import styles from './PageProfile.module.scss'
import Layout from "../../components/Layout/index.js";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { isEqual } from "lodash"
import { convertFileToBase64 } from "../../utils/index.js";
import Spinner from "../../components/Spinner/Spinner.jsx";
import userApi from "../../api/user/userApi.js";
import defaultAvatar from "../../assets/images/default-avatar.jpg"
import { logOut } from "../../store/auth.js";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import classNames from "classnames";
import Header from "../../components/Headers/Header/Header.jsx";

const PageProfile = () => {
  const avatarInput = useRef(null)
  const dispatch = useDispatch();
  const { userId } = useParams();
  const { userId: currentUserId } = useSelector((state) => state.auth)
  const [initialProfile, setInitialProfile] = useState(null)
  const [profile, setProfile] = useState(initialProfile)
  const [isChanged, setIsChanged] = useState(false)
  const isAnotherProfile = userId !== currentUserId
  const headerText = isAnotherProfile ? "Профиль" : "Мой профиль"

  const avatarClassName = classNames(styles.avatar, {
    [styles.myAvatar]: !isAnotherProfile,
  })

  const getCurrentUser = async () => {
    try {
      const user = await userApi.getUserById(userId)
      if (user) {
        setInitialProfile(user)
        setProfile(user)
      }
    } catch (error) {
      dispatch(logOut())
    }
  }

  useEffect(() => {
    if (userId) {
      getCurrentUser()
    }
  }, [userId])

  useEffect(() => {
    setIsChanged(isEqual(initialProfile, profile))
  }, [profile, initialProfile])

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value
    setProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const openFileInput = () => {
    avatarInput.current.click()
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target)

    if (data.get('avatar').size === 0) {
      data.delete('avatar')
    }

    try {
      const user = await userApi.updateUser(profile.id, data);
      if (user) {
        setInitialProfile(user)
        setProfile(user)
      }
    } catch (error) {
      dispatch(logOut())
    }
  };

  const handleFiles = async (e) => {
    if (e.target.files[0].size >= 10 * 1024 * 1024) {
      alert('Файл слишком большой! Выбери другой');
      return
    }
    const avatar = await convertFileToBase64(e.target.files[0]);
    setProfile((prevState) => ({
      ...prevState,
      avatar: avatar,
    }));
  }

  const cancel = () => {
    setProfile(initialProfile)
  }

  if (profile) {
    const avatar = profile.avatar ?? defaultAvatar
    const buttonBox = isAnotherProfile ? null : (
      <div className={styles.buttonBox}>
        <button type="submit" className={styles.submit} disabled={isChanged}>Сохранить</button>
        <button type="button" className={styles.cancel} onClick={cancel} disabled={isChanged}>Отмена</button>
      </div>
    )
    return (
      <Layout>
        <Header text={headerText} />
        <main className={styles.profile}>
          <form className={styles.profile__form} onSubmit={handleSubmit}>
            <div className={styles.field__avatar} onClick={openFileInput}>
              <img src={avatar} alt="Аватар" className={avatarClassName} />
              <PhotoCameraIcon className={styles.hover} hidden={isAnotherProfile} />
              <input type="file" name="avatar" ref={avatarInput} hidden={true} onChange={handleFiles} disabled={isAnotherProfile} accept=".jpg,.jpeg,.png"></input>
            </div>
            <div className={styles.field}>
              <label>Имя</label>
              <input type="text" value={profile.first_name} name="first_name" onChange={onChange} disabled={isAnotherProfile}></input>
            </div>
            <div className={styles.field}>
              <label>Фамилия</label>
              <input type="text" value={profile.last_name} name="last_name" onChange={onChange} disabled={isAnotherProfile}></input>
            </div>
            <div className={styles.field}>
              <label>Логин</label>
              <input type="text" value={profile.username} name="username" onChange={onChange} disabled={isAnotherProfile}></input>
            </div>
            <div className={styles.field}>
              <label>О себе</label>
              <textarea rows="6" value={profile.bio} name="bio" onChange={onChange} disabled={isAnotherProfile}></textarea >
            </div>
            {buttonBox}
          </form>
        </main>
      </Layout>
    );
  }
  return (
    <Layout >
      <Header text={headerText} />
      <Spinner />
    </Layout>
  )
};

export default PageProfile;
