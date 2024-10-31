export const getLocalStorage = (key) => {
  const json = localStorage.getItem(key);
  if (!json) {
    return null
  }
  return JSON.parse(json);
}

export const setLocalStorage = (key, object) => {
  localStorage.setItem(key, JSON.stringify(object));
}