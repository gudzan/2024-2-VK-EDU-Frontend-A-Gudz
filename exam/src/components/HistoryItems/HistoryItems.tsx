import { useAppSelector } from "../../redux/store";
import { TranslationData } from "../../types/translationData";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const HistoryItems = () => {
  const history: TranslationData[] = useAppSelector(
    (state) => state.translates
  );
  console.log(history);


  return (
    <div>
      {history.map((item) =>
        <>
          <p>{item.languageFrom}</p><ArrowForwardIcon/>
          <p>{item.languageTo}</p>
          <p>{item.textFrom}</p>
          <p>{item.textTo}</p>
        </>
      )}

    </div>
  )
}

export default HistoryItems;