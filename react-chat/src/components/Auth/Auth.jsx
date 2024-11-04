import React, { useState } from "react";
import "./Auth.scss"
import { Link, useNavigate } from "react-router-dom";
import ROUTES from "../../config/routes";
import { setLocalStorage, setTokens } from "../../api/localSrorage";
import { useAuth } from "../../hooks/useAuth";
import { instance } from "../../api/api.config";

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

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target);
    instance.post('/api/auth/', formData)
      .then((response) => {
        setTokens(response.data.access, response.data.refresh)
        instance.get('/api/user/current/')
          .then((response) => {
            localStorage.setItem("userId", response.data.id)
            navigate(ROUTES.root)
          })
          .catch((error) => {
            if (error.response.status === 401 && error.config.url === "/api/auth/refresh/") {
              navigate(ROUTES.auth)
            }
          })
        setAuth(true)
      })
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
