import React, { useState } from "react";
import styles from "./Auth.module.scss"
import { Link, useNavigate } from "react-router-dom";
import ROUTES from "../../config/routes";
import { useAuth } from "../../hooks/useAuth";
import userService from "../../api/user/userService.js";
import authService from "../../api/auth/authService.js"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const initialUser = {
  username: "",
  password: ""
}

const Auth = () => {
  const navigate = useNavigate();
  const [error, setError] = useState([])
  const [showPassword, setShowPassword] = useState(false);
  const typePasswordField = showPassword ? "text" : "password"
  const buttonPasswordField = showPassword ? <VisibilityOffIcon /> : <VisibilityIcon /> 
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
      if (error.status === 401) {
        const data = error.response.data
        const errors = []
        for (let key in data) {
          if (data.hasOwnProperty(key)) {
            errors.push(data[key])
          }
        }
        setError(errors)
      }
      else {
        navigate(ROUTES.auth);
        console.log(error);
      }
    }
  }

  const getError = () => {
    if (error.length > 0) {
      return <div className={styles.error}>{error[0]}</div>
    }
  }

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  }

  return (
    <div className={styles.auth}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label>Логин</label>
          <input autoComplete="off" type="text" value={user.username} name="username" onChange={onChange} required={true}></input>
        </div>
        <div className={styles.field}>
          <label>Пароль</label>
          <input autoComplete="off" type={typePasswordField} value={user.password} name="password" onChange={onChange} required={true}></input>
          <button className={styles.showPassword} type="button" onClick={toggleShowPassword} >{buttonPasswordField} </button>
        </div>
        {getError()}
        <div className={styles.buttonBox}>
          <button type="submit" className={styles.submit}>Войти</button>
        </div>
        <Link to={`${ROUTES.register}`}>Еще нет аккауна? Зарегистрируйся</Link>
      </form>
    </div>
  )
}

export default Auth;
