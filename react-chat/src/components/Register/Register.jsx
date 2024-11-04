import React, { useState, useRef } from "react";
import "./Register.scss"
import axios from "axios";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import defaultAvatar from "../../assets/images/default-avatar.jpg"
import { convertFileToBase64 } from "../../utils";
import { Link, useNavigate } from "react-router-dom";
import ROUTES from "../../config/routes";
import { instance } from "../../api/api.config";

const Register = () => {
  const avatarInput = useRef(null)
  const navigate = useNavigate();
  const initialUser = {
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    bio: "",
    avatar: defaultAvatar
  }
  const [user, setUser] = useState(initialUser)

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const openFileInput = () => {
    avatarInput.current.click()
  }

  const handleFiles = async (e) => {
    if (e.target.files[0].size > 5 * 1024 * 1024) {
      alert('Файл слишком большой! Выбери другой');
      return
    }
    const avatar = await convertFileToBase64(e.target.files[0]);
    setUser((prevState) => ({
      ...prevState,
      avatar: avatar,
    }));
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target);
    instance.post('/api/register/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((response) => {
        navigate(ROUTES.auth);
      })
  }

  return (
    <div className="register">
      <form className="form" onSubmit={handleSubmit}>
        <div className="field__avatar" onClick={openFileInput}>
          <img src={user.avatar} alt="Аватар" className="avatar" />
          <PhotoCameraIcon className="hover" />
          <input type="file" name="avatar" ref={avatarInput} onChange={handleFiles} hidden={true} accept=".jpg,.jpeg,.png"></input>
          <span>Аватар</span>
        </div>
        <div className="field">
          <label>Логин</label>
          <input autoComplete="off" type="text" value={user.username} name="username" onChange={onChange}></input>
        </div>
        <div className="field">
          <label>Пароль</label>
          <input autoComplete="off" type="password" value={user.password} name="password" onChange={onChange}></input>
        </div>
        <div className="field">
          <label>Имя</label>
          <input type="text" value={user.first_name} name="first_name" onChange={onChange}></input>
        </div>
        <div className="field">
          <label>Фамилия</label>
          <input type="text" value={user.last_name} name="last_name" onChange={onChange}></input>
        </div>
        <div className="field">
          <label>Расскажи о себе</label>
          <textarea rows="6" value={user.bio} name="bio" onChange={onChange}></textarea >
        </div>
        <div className="button-box">
          <button type="submit" className="form__submit">Зарегистрироваться</button>
        </div>
      </form>
      <Link to={`${ROUTES.auth}`}>Уже есть аккаунт? Войди</Link>
    </div>
  )
}

export default Register;
