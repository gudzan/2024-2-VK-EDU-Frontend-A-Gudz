import TranslateIcon from '@mui/icons-material/Translate';
import HistoryIcon from '@mui/icons-material/History';
import styles from "./Header.module.scss"
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className={styles.header}>

      <Link to={"/"} className={styles.part}>
        <TranslateIcon />
        <h1>VK Translate</h1>
      </Link>

      <Link to={"/history"} className={styles.part}>
        <HistoryIcon />
        <p>История</p>
      </Link>

    </header>
  )
}

export default Header;
