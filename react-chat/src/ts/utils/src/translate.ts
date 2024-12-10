import { TranslateParams, TranslationResult } from './types';
import { buildApiUrl, isCacheValid } from './helpers';

const cache = new Map<string, string>();

export const translate = async ({ text, from = "en", to = "ru" }: TranslateParams): Promise<TranslationResult> => {
  if (!text) throw new Error('Текст для перевода не указан');
  if (!text || !to) throw new Error('Языки для перевода не указаны');

  const cacheKey = `${from}|${to}|${text}`;

  if (isCacheValid(cache, cacheKey)) {
    return {
      originalText: text,
      translatedText: cache.get(cacheKey)!,
      fromLanguage: from,
      toLanguage: to,
    };
  }

  try {
    const apiUrl = buildApiUrl(text, from, to);
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.responseStatus !== 200) {
      throw new Error(`Ошибка API: ${data.responseStatus}`);
    }

    const translatedText = data.responseData.translatedText;
    cache.set(cacheKey, translatedText);

    return {
      originalText: text,
      translatedText,
      fromLanguage: from,
      toLanguage: to,
    };
  } catch (error) {
    throw new Error(`Ошибка перевода: ${error}`);
  }
};
