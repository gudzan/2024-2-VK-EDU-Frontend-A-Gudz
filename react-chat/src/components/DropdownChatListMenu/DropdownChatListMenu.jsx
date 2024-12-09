import styles from "./DropdownChatListMenu.module.scss"
import Overlay from "../Overlay";
import { Link } from "react-router-dom";
import ROUTES from "../../config/routes";
import classnames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/auth/auth";
import { selectAuthUserId } from "../../store/auth/authSelectors";

const DropdownChatList = ({ openDropdown, closeDropdown }) => {
  const dispatch = useDispatch();
  const userId = useSelector(selectAuthUserId);
  const link = `${ROUTES.profile}/${userId}`

  const dropdownClassName = classnames(styles.dropdown, {
    [styles.open]: openDropdown,
    [styles.close]: !openDropdown,
  })

  const exit = () => {
    closeDropdown()
    dispatch(logOut())
  }

  return (
    <>
      <Overlay openOverlay={openDropdown} closeOverlay={closeDropdown} />
      <div className={dropdownClassName}>
        <Link to={link}>
          <button type="button" onClick={closeDropdown}>
            Мой профиль
          </button>
        </Link>
        <Link to={ROUTES.auth}>
          <button type="button" onClick={exit}>
            Выйти
          </button>
        </Link>
      </div>
    </>
  )
}

export default DropdownChatList;
