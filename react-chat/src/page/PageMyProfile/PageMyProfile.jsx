import React, { useEffect, useRef, useState } from "react";
import './PageMyProfile.scss'
import Layout from "../../components/Layout/index.js";
import { HeaderPageMyProfile } from "../../components/Headers/index.js";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { isEqual } from "lodash"
import { convertFileToBase64 } from "../../utils";
import { instance } from "../../api/api.config.js";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../config/routes.js";
import Spinner from "../../components/Spinner/Spinner.jsx";

const PageMyProfile = () => {
  const avatarInput = useRef(null)
  const navigate = useNavigate();
  const [initialProfile, setInitialProfile] = useState()
  const [profile, setProfile] = useState(initialProfile)
  const [isChanged, setIsChanged] = useState(false)

  useEffect(() => {
    instance.get('/api/user/current/')
      .then((response) => {
        setInitialProfile(response.data)
        setProfile(response.data)
      })
      .catch((error) => {
        if (error.response.status === 401 && error.config.url === "/api/auth/refresh/") {
          navigate(ROUTES.auth)
        }
      })
  }, [])

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

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target)

    if (data.get('avatar').size === 0) {
      data.delete('avatar')
    }

    instance.patch(`/api/user/${profile.id}/`, data)
      .then((response) => {
        setInitialProfile(response.data)
        setProfile(response.data)
      })
      .catch((error) => {
        if (error.response.status === 401 && error.config.url === "/api/auth/refresh/") {
          navigate(ROUTES.auth)
        }
      })
  };

  const handleFiles = async (e) => {
    if (e.target.files[0].size > 5 * 1024 * 1024) {
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

  if (profile !== undefined) {
    return (
      <Layout>
        <HeaderPageMyProfile />
        <main className="profile">
          <form className="profile__form" onSubmit={handleSubmit}>
            <div className="field__avatar" onClick={openFileInput}>
              <img src={profile.avatar} alt="Аватар" className="avatar" />
              <PhotoCameraIcon className="hover" />
              <input type="file" name="avatar" ref={avatarInput} hidden={true} onChange={handleFiles} accept=".jpg,.jpeg,.png"></input>
            </div>
            <div className="field">
              <label>Имя</label>
              <input type="text" value={profile.first_name} name="first_name" onChange={onChange}></input>
            </div>
            <div className="field">
              <label>Фамилия</label>
              <input type="text" value={profile.last_name} name="last_name" onChange={onChange}></input>
            </div>
            <div className="field">
              <label>Логин</label>
              <input type="text" value={profile.username} name="username" onChange={onChange}></input>
            </div>
            <div className="field">
              <label>О себе</label>
              <textarea rows="6" value={profile.bio} name="bio" onChange={onChange}></textarea >
            </div>
            <div className="button-box">
              <button type="submit" className="profile__submit" disabled={isChanged}>Сохранить</button>
              <button type="button" className="cancel" onClick={cancel} disabled={isChanged}>Отмена</button>
            </div>
          </form>
        </main>
      </Layout>
    );
  }
  else {
    return (
      <Layout>
        <HeaderPageMyProfile />
        <Spinner />
      </Layout>
    )
  }
};

export default PageMyProfile;
