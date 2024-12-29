import { useAppDispath, useAppSelector } from "../../redux/store";
import { TranslationData } from "../../types/translationData";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import styles from "./HistoryItems.module.scss"
import { translatesRemoved } from "../../redux/translatesSlice";
import { getRandomId } from "../../utils/getRandomId";

const HistoryItems = () => {
  const history: TranslationData[] = useAppSelector(
    (state) => state.translates
  );

  if (history.length === 0) {
    return (
      <main className={styles.container}>
        <p className={styles.null}>История пуста</p>
      </main>
    )
  }

  const dispatch = useAppDispath();
  const clear = () => {
    dispatch(translatesRemoved());
  }

  return (
    <main className={styles.container}>
      <p onClick={clear} className={styles.clear}>Очистить историю</p>
      <div className={styles.items}>
        {history.map((item) =>
          <div className={styles.item} key={item.id ?? getRandomId()}>
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
    </main>
  )
}

export default HistoryItems;