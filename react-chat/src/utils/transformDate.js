const transformDate = (dateString) => {
  const date = new Date(dateString);
  return `${addZero(date.getHours())}:${addZero(date.getMinutes())}`;
  function addZero (number) {
    return number < 10 ? `0${number}` : number;
  }
};

export default transformDate;
