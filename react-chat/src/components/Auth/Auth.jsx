import React, { useState } from "react";
import "./Auth.scss"
import { Link, useNavigate } from "react-router-dom";
import ROUTES from "../../config/routes";
import { useAuth } from "../../hooks/useAuth";
import userService from "../../api/user/userService.js";
import authService from "../../api/auth/authService.js"

const Auth = () => {
  const navigate = useNavigate();
  const initialUser = {
    username: "",
    password: ""
  }

  const [user, setUser] = useState(initialUser)
  const { setAuth } = useAuth()

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target);
    try {
      const data = await authService.auth(formData);
      const user = await userService.getCurrentUser();
      if (data && user) {
        setAuth(true)
        navigate(ROUTES.root)
      }
    } catch (error) {
      navigate(ROUTES.auth); console.log(error);
    }
  }

  return (
    <div className="auth">
      <form className="form" onSubmit={handleSubmit}>
        <div className="field">
          <label>Логин</label>
          <input autoComplete="off" type="text" value={user.username} name="username" onChange={onChange}></input>
        </div>
        <div className="field">
          <label>Пароль</label>
          <input autoComplete="off" type="password" value={user.password} name="password" onChange={onChange}></input>
        </div>
        <div className="button-box">
          <button type="submit" className="form__submit">Войти</button>
        </div>
        <Link to={`${ROUTES.register}`}>Еще нет аккауна? Зарегистрируйся</Link>
      </form>
    </div>
  )
}

export default Auth;
