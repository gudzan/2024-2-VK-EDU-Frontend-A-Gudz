import { useAppSelector } from "../../redux/store";
import { TranslationData } from "../../types/translationData";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import styles from "./HistoryItems.module.scss"

const HistoryItems = () => {
  const history: TranslationData[] = useAppSelector(
    (state) => state.translates
  );

  if (history.length === 0) {
    return (
      <>
        <p>История пуста</p>
      </>
    )
  }

  return (
    <div className={styles.items}>
      {history.map((item) =>
        <div className={styles.item}>
          <div className={styles.languages}>
            <p>{item.languageFrom}</p>
            <ArrowForwardIcon />
            <p>{item.languageTo}</p>
          </div>
          <div className={styles.text}>
            <p className={styles.textFrom}>{item.textFrom}</p>
            <p className={styles.textTo}>{item.textTo}</p>
          </div>
        </div>
      )}

    </div>
  )
}

export default HistoryItems;