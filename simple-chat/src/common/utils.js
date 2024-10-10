export const transformDate = (dateString) => {
  const date = new Date(dateString)
  return `${addZero(date.getHours())}:${addZero(date.getMinutes())}`
  function addZero(number) {
    return number < 10 ? `0${number}` : number
  }
}

export const getRandomNumber = () => {
  return Math.floor(Math.random() * 100 + 10)
}

export const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export const getRandomId = () => {
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c)=> {
      const r = Math.random() * 16 | 0
      const v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
  });
  return uuid
}

export const debounce = function(func, delay) {
  let inDebounce;
  return function() {
      clearTimeout(inDebounce);
      inDebounce = setTimeout(() => func.apply(this, arguments), delay);
  };
};