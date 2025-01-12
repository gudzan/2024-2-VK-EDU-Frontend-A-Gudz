import TranslateIcon from '@mui/icons-material/Translate';
import HistoryIcon from '@mui/icons-material/History';
import styles from "./Buttons.module.scss"
import { Link } from 'react-router-dom';

const Buttons = () => {
  return (
    <div className={styles.buttons}>
      <Link to={"/"} >
        <button><TranslateIcon />Text</button>
      </Link>
      <Link to={"/history"} >
        <button><HistoryIcon />History</button>
      </Link>
    </div>
  )
}

export default Buttons;