export type LanguageCode = string;

export interface TranslateParams {
  text: string;
  from: LanguageCode;
  to: LanguageCode;
}

export interface TranslationResult {
  originalText: string;
  translatedText: string;
  fromLanguage: LanguageCode;
  toLanguage: LanguageCode;
}
