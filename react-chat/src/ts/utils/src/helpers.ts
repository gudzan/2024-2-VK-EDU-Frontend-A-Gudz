export const buildApiUrl = (text: string, from: string, to: string): string => {
  return `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}`;
};

export const isCacheValid = (cache: Map<string, string>, key: string): boolean => {
  return cache.has(key);
};
