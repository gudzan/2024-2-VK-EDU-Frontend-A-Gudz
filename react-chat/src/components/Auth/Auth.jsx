import { useEffect, useState } from "react";
import styles from "./Auth.module.scss"
import { Link, useNavigate } from "react-router-dom";
import ROUTES from "../../config/routes";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/auth/auth.js";
import { selectAuthError, selectAuthStatus } from "../../store/auth/authSelectors.js";
import storeStatus from "../../store/storeStatus.js";

const initialUser = {
  username: "",
  password: ""
}

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const typePasswordField = showPassword ? "text" : "password"
  const buttonPasswordField = showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />
  const [user, setUser] = useState(initialUser)
  const authStatus = useSelector(selectAuthStatus);
  const authError = useSelector(selectAuthError);

  useEffect(() => {
    if (authStatus === storeStatus.success) navigate(ROUTES.root)
  }, [authStatus])

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
    dispatch(login(user));
  }

  const getError = () => {
    if (authError) {
      return <div className={styles.error}>{authError}</div>
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
