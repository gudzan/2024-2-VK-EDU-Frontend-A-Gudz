export const transformDate = (date) => {
  return `${addZero(date.getHours())}:${addZero(date.getMinutes())}`
  function addZero(number) {
    return number < 10 ? `0${number}` : number
  }
}