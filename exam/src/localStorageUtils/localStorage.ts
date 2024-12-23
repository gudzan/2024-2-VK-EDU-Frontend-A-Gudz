import { TranslationData } from "../types/translationData"

const HISTORY_KEY = "history"

export const getHistory = () => {
  return localStorage.getItem(HISTORY_KEY)
}

export const setHistory = (newTranslation: TranslationData) => {
  const existingTranslations: TranslationData[] = JSON.parse(getHistory() || '[]');
  existingTranslations.push(newTranslation);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(existingTranslations));
}