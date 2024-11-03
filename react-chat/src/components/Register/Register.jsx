import React, { useState } from "react";
import "./Register.scss"
import axios from "axios";

const Register = () => {

  // const [newUser, setNewUser] = useState({
  //   username: "", // логин (обязательное поле, должно быть уникальным)
  //   password: "", // пароль (обязательное поле)
  //   first_name: "", // имя (обязательное поле)
  //   last_name: "", // фамилия (обязательное поле)
  //   bio: "", // информация о юзере,
  //   avatar: "" // аватар пользователя (чтобы отправить нужно использовать FormData)
  // })
  // console.log(newUser)

  // const onChange = (e) => {
  //   const name = e.target.name;
  //   const value = e.target.value
  //   setNewUser((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    axios.post('http://192.168.1.111:8080/api/register/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((response) => {
        console.log("успех!!!", response);
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Логин</label>
        <input
          id="username"
          type="text"
          name="username"
        />
      </div>
      <div>
        <label>Пароль</label>
        <input
          id="password"
          type="password"
          name="password"
        />
      </div>
      <div>
        <label>Имя</label>
        <input
          id="first_name"
          type="text"
          name="first_name"
        />
      </div>
      <div>
        <label>Фамилия</label>
        <input
          id="last_name"
          type="text"
          name="last_name"
        />
      </div>
      <div>
        <label>О себе</label>
        <textarea
          id="bio"
          type="text"
          name="bio"
        />
      </div>
      <div>
        <label>Аватар</label>
        <input
          id="avatar"
          type="file"
          name="avatar"
        />
      </div>
      <button type="submit"> Отправить</button>
    </form>
  )
}

export default Register;
