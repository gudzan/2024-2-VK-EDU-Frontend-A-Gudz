import styles from "./TranslateForm.module.scss"
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import languages from "../../utils/languages.json"
import { useState } from "react";
import { translate } from "../../utils";
import { TranslationData } from "../../types/translationData";
import { useAppDispath } from "../../redux/store";
import { translatesAdd } from "../../redux/translatesSlice";
import { LanguageOption } from "../../types/languageOption";
import { getRandomId } from "../../utils/getRandomId";

const TranslateForm = () => {
  const dispatch = useAppDispath();
  const [languageFrom, setLanguageFrom] = useState<LanguageOption>({ key: "Autodetect", value: "Autodetect" })
  const [languageTo, setLanguageTo] = useState<LanguageOption>({ key: "af-ZA", value: "Afrikaans" })
  const [text, setText] = useState<string>("")
  const [translateText, setTranslateText] = useState<string>("")

  const onKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const trimText = text.trim()
    if (e.key === 'Enter' && trimText !== "") {
      const newTranslate = await translate({
        text: trimText,
        from: languageFrom.key,
        to: languageTo.key
      });

      setTranslateText(newTranslate.translatedText)
      const newTranslationData: TranslationData = {
        id: getRandomId(),
        languageFrom: languageFrom.value,
        languageTo: languageTo.value,
        textFrom: trimText,
        textTo: newTranslate.translatedText
      }
      dispatch(translatesAdd(newTranslationData));
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setText(value);
  }

  const handleChangeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedKey = e.target.value;
    const selectedValue = (selectedKey === "Autodetect") ? "Autodetect" : languages[selectedKey as keyof typeof languages];

    if (e.target.id === 'to' && selectedValue) {
      setLanguageTo({ key: selectedKey, value: selectedValue });
    }
    else if (e.target.id === 'from' && selectedValue) {
      setLanguageFrom({ key: selectedKey, value: selectedValue });
    }
  };

  const changeLanguages = () => {
    let tempFrom = languageFrom
    const tempTo = languageTo

    if (tempFrom.value === 'Autodetect') {
      const firstEntry = Object.entries(languages)[0];
      tempFrom.key = firstEntry[0];
      tempFrom.value = firstEntry[1];
    }

    setLanguageFrom(tempTo)
    setLanguageTo(tempFrom)
  }

  return (
    <main className={styles.container}>
      <div className={styles.translation}>
        <div className={styles.select}>
          <select id="from" value={languageFrom.key} onChange={handleChangeLanguage}>
            <option value="Autodetect">Autodetect</option>
            {Object.entries(languages).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>

          <SwapHorizIcon onClick={changeLanguages} />

          <select id="to" value={languageTo.key} onChange={handleChangeLanguage}>
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