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