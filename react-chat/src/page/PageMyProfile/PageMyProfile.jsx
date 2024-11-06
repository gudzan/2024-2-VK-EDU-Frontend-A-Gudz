import React, { useEffect, useRef, useState } from "react";
import './PageMyProfile.scss'
import Layout from "../../components/Layout/index.js";
import { HeaderPageMyProfile } from "../../components/Headers/index.js";
import { getProfileFromLocalStorage, setProfileToLocalStorage } from "../../api/profile/myprofile.js";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { isEqual } from "lodash"

const PageMyProfile = () => {
  const avatarInput = useRef(null)
  const [initialProfile, setInitialProfile] = useState(getProfileFromLocalStorage())
  const [profile, setProfile] = useState(initialProfile)
  const [isChanged, setIsChanged] = useState(false)

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
    setProfileToLocalStorage(profile)
    setInitialProfile(profile)
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFiles = async (e) => {
    if (e.target.files[0].size > 5 * 1024 * 1024) {
      alert('Файл слишком большой! Выбери другой');
      return
    }
    const avatar = await convertFileToBase64(e.target.files[0]);
    setProfile((prevState) => ({
      ...prevState,
      userAvatar: avatar,
    }));
  }

  const cancel = () => {
    setProfile(initialProfile)
  }

  return (
    <Layout>
      <HeaderPageMyProfile />
      <main className="profile">
        <form className="profile__form" onSubmit={handleSubmit}>
          <div className="field__avatar" onClick={openFileInput}>
            <img src={profile.userAvatar} alt="Аватар" className="avatar" />
            <PhotoCameraIcon className="hover" />
            <input type="file" ref={avatarInput} hidden={true} onChange={handleFiles} accept=".jpg,.jpeg,.png"></input>
          </div>
          <div className="field">
            <label>Имя</label>
            <input type="text" value={profile.userName} name="userName" onChange={onChange}></input>
          </div>
          <div className="field">
            <label>Логин</label>
            <input type="text" value={profile.login} name="login" onChange={onChange}></input>
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
};

export default PageMyProfile;
