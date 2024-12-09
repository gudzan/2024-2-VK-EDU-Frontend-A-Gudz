import { useEffect, useState } from "react";
import styles from "./PageProfile.module.scss"
import Layout from "../../components/Layout/index.js";
import Spinner from "../../components/Spinner/Spinner.jsx";
import userApi from "../../api/user/userApi.js";
import { logOut } from "../../store/auth/auth.js";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "../../components/Headers/Header/Header.jsx";
import AvatarField from "../../components/AvatarField/AvatarField.jsx";
import isEqual from "../../utils/isEqual.js";
import { selectAuthUserId } from "../../store/auth/authSelectors.js";

const PageProfile = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const currentUserId = useSelector(selectAuthUserId);
  const [initialProfile, setInitialProfile] = useState(null)
  const [profile, setProfile] = useState(initialProfile)
  const [isChanged, setIsChanged] = useState(false)
  const isAnotherProfile = userId !== currentUserId
  const headerText = isAnotherProfile ? "Профиль" : "Мой профиль"

  const getCurrentUser = async () => {
    try {
      const user = await userApi.getUserById(userId)
      if (user) {
        setInitialProfile(user)
        setProfile(user)
      }
    } catch (error) {
      console.log(error);
      if (error.status === 401) {
        dispatch(logOut())
      }
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

  const notNullText = (text) => {
    return text === null ? "" : text
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target)

    if (data.get("avatar").size === 0) {
      data.delete("avatar")
    }

    try {
      const user = await userApi.updateUser(profile.id, data);
      if (user) {
        setInitialProfile(user)
        setProfile(user)
      }
    } catch (error) {
      console.log(error);
      if (error.status === 401) {
        dispatch(logOut())
      }
    }
  };

  const cancel = () => {
    setProfile(initialProfile)
  }

  const onChangeAvatar = (avatar)=>{
    setProfile((prevState) => ({
      ...prevState,
      avatar: avatar,
    }));
  }

  if (profile) {
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
            <AvatarField avatarImg={profile.avatar} canEdit={!isAnotherProfile} onChange={onChangeAvatar}/>
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
              <textarea rows="6" value={notNullText(profile.bio)} name="bio" onChange={onChange} disabled={isAnotherProfile}></textarea >
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
