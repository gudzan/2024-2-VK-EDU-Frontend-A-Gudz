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
import Buttons from "../Buttons/Buttons";

const TranslateForm = () => {
  const dispatch = useAppDispath();
  const [languageFrom, setLanguageFrom] = useState<LanguageOption>({ key: "Autodetect", value: "Autodetect" })
  const [languageTo, setLanguageTo] = useState<LanguageOption>({ key: "ru-RU", value: "Russian" })
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

  const handleChangeLanguageButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement
    const selectedKey = target.value
    const selectedValue = target.textContent

    if (target.name === 'to' && selectedValue) {
      setLanguageTo({ key: selectedKey, value: selectedValue });
    }
    else if (target.name === 'from' && selectedValue) {
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

  const getClass = (language: string, type: string) => {
    if (type === 'from' && language === languageFrom.key) {
      return styles.selected;
    }
    if (type === 'to' && language === languageTo.key) {
      return styles.selected;
    }
    return '';
  };

  const selectFromColor = (languageFrom.value !== "" && languageFrom.value !== "Autodetect" && languageFrom.value !== "German" && languageFrom.value !== "English" && languageFrom.value !== "Spanish") ? styles.selected : ""
  const selectToColor = (languageTo.value !== "" && languageTo.value !== "Russian" && languageTo.value !== "English" && languageTo.value !== "Spanish") ? styles.selected : ""

  return (
    <main className={styles.container}>
      <Buttons />
      <div className={styles.translation}>
        <div className={styles.select}>

          <div className={styles.language}>
            <button value={"Autodetect"} name="from" className={getClass("Autodetect", "from")} onClick={handleChangeLanguageButton}>Autodetect</button>
            <button value={"de-DE"} name="from" className={getClass("de-DE", "from")} onClick={handleChangeLanguageButton}>German</button>
            <button value={"en-GB"} name="from" className={getClass("en-GB", "from")} onClick={handleChangeLanguageButton}>English</button>
            <button value={"es-ES"} name="from" className={getClass("es-ES", "from")} onClick={handleChangeLanguageButton}>Spanish</button>
            <select id="from" value={selectFromColor === "" ? "" : languageFrom.key} onChange={handleChangeLanguage} className={selectFromColor}>
              {selectFromColor === "" && <option value="">Select...</option>}
              {Object.entries(languages).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          <SwapHorizIcon className={styles.swap} onClick={changeLanguages} />

          <div className={styles.language}>
            <button value={"ru-RU"} name="to" className={getClass("ru-RU", "to")} onClick={handleChangeLanguageButton}>Russian</button>
            <button value={"en-GB"} name="to" className={getClass("en-GB", "to")} onClick={handleChangeLanguageButton}>English</button>
            <button value={"es-ES"} name="to" className={getClass("es-ES", "to")} onClick={handleChangeLanguageButton}>Spanish</button>
            <select id="to" value={selectToColor === "" ? "" : languageTo.key} onChange={handleChangeLanguage} className={selectToColor}>
              {selectToColor === "" && <option value="">Select...</option>}
              {Object.entries(languages).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </div>
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
