import { useState } from "react";
import styles from "./Register.module.scss";
import defaultAvatar from "../../assets/images/default-avatar.jpg";
import { Link, useNavigate } from "react-router-dom";
import ROUTES from "../../config/routes";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import authApi from "../../api/auth/authApi";
import AvatarField from "../AvatarField/AvatarField.jsx";
import { translate } from "../../ts/utils/src/translate.ts";

const initialUser = {
  username: "",
  password: "",
  first_name: "",
  last_name: "",
  bio: "",
  avatar: defaultAvatar
};

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const typePasswordField = showPassword ? "text" : "password";
  const buttonPasswordField = showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />;
  const [user, setUser] = useState(initialUser);

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onChangeAvatar = (avatar) => {
    setUser((prevState) => ({
      ...prevState,
      avatar: avatar,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
      const data = await authApi.register(formData);
      if (data) {
        navigate(ROUTES.auth);
      }
    } catch (error) {
      if (error.status === 400) {
        const data = error.response.data;
        const errors = [];
        for (let key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            errors.push(...data[key]);
          }
        }
        if (errors.length > 0) {
          const translateError = await translate({
            text: errors[0]
          });
          setError(translateError.translatedText);
        }
      }
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className={styles.register}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <AvatarField avatarImg={user.avatar} canEdit={true} onChange={onChangeAvatar} />
        <div className={styles.field}>
          <label>Логин</label>
          <input autoComplete="off" type="text" value={user.username} name="username" onChange={onChange} required={true}></input>
        </div>
        <div className={styles.field}>
          <label>Пароль</label>
          <input autoComplete="off" type={typePasswordField} value={user.password} name="password" onChange={onChange} required={true}></input>
          <button className={styles.showPassword} type="button" onClick={toggleShowPassword} >{buttonPasswordField} </button>
        </div>
        <div className={styles.field}>
          <label>Имя</label>
          <input type="text" value={user.first_name} name="first_name" onChange={onChange} required={true}></input>
        </div>
        <div className={styles.field}>
          <label>Фамилия</label>
          <input type="text" value={user.last_name} name="last_name" onChange={onChange} required={true}></input>
        </div>
        <div className={styles.field}>
          <label className={styles.colorLabel}>Расскажи о себе</label>
          <textarea rows="6" value={user.bio} name="bio" onChange={onChange}></textarea >
        </div>
        <div className={styles.error}>{error}</div>
        <div className={styles.buttonBox}>
          <button type="submit" className={styles.submit}>Зарегистрироваться</button>
        </div>
        <div className={styles.link}><Link to={`${ROUTES.auth}`}>Уже есть аккаунт? Войти</Link></div>
      </form>
    </div>
  );
};

export default Register;
