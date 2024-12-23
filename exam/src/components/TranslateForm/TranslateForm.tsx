import styles from "./TranslateForm.module.scss"
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import languages from "../../utils/languages.json"
import { useState } from "react";
import { translate } from "../../utils";
import { TranslationData } from "../../types/translationData";
import { setHistory } from "../../localStorageUtils/localStorage";

const TranslateForm = () => {
  const [languageFrom, setLanguageFrom] = useState<string>("Autodetect")
  const [languageTo, setLanguageTo] = useState<string>("af-ZA")

  const [text, setText] = useState<string>("")
  const [translateText, setTranslateText] = useState<string>("")

  const onKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const newTranslate = await translate({
        text: text,
        from: languageFrom,
        to: languageTo
      });
     
      setTranslateText(newTranslate.translatedText)
      const newTranslationData : TranslationData = {
        languageFrom: languageFrom,
        languageTo: languageTo,
        textFrom: text, 
        textTo: newTranslate.translatedText
      }
      setHistory(newTranslationData)
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setText(value);
  }

  const handleChangeLanguageFrom = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setLanguageFrom(value);
  };

  const handleChangeLanguageTo = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setLanguageTo(value);
  };

  const changeLanguages = () => {
    let tempFrom = languageFrom
    const tempTo = languageTo

    if (tempFrom === 'Autodetect') {
      const firstEntry = Object.entries(languages)[0];
      tempFrom = firstEntry[0];
    }

    setLanguageFrom(tempTo)
    setLanguageTo(tempFrom)
  }

  return (
    <main className={styles.container}>
      <div className={styles.translation}>
        <div className={styles.select}>
          <select id="from-language" value={languageFrom} onChange={handleChangeLanguageFrom}>
            <option value="Autodetect">Autodetect</option>
            {Object.entries(languages).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>

          <SwapHorizIcon onClick={changeLanguages} />

          <select id="to-language" value={languageTo} onChange={handleChangeLanguageTo}>
            {Object.entries(languages).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.textarea}>
          <textarea placeholder="Enter text" value={text} onChange={onChange} onKeyDown={onKeyDown}></textarea>
          <textarea placeholder="Translation" readOnly={true} value={translateText}></textarea>
        </div>
      </div>
    </main>
  )
}

export default TranslateForm;
