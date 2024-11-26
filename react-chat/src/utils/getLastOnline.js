const getLastOnline = (lastOnlineDate) => {
  if (lastOnlineDate === null) {
    return null
  }

  const now = new Date();
  const diffInMilliseconds = now - new Date(lastOnlineDate);

  const seconds = Math.floor(diffInMilliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);

  function getTimeString(unit, value) {
    const suffixes = {
      minute: ['минуту', 'минуты', 'минут'],
      hour: ['час', 'часа', 'часов'],
      day: ['день', 'дня', 'дней'],
      week: ['неделю', 'недели', 'недель'],
      month: ['месяц', 'месяца', 'месяцев']
    };

    function declension(number, forms) {
      if (number % 10 === 1 && number % 100 !== 11) {
        return forms[0];
      } else if (number % 10 >= 2 && number % 10 <= 4 && (number % 100 < 10 || number % 100 >= 20)) {
        return forms[1];
      } else {
        return forms[2];
      }
    }

    return `${value} ${declension(value, suffixes[unit])}`;
  }

  if (months > 12) {
    return `был(а) больше года назад`
  }
  if (months > 0) {
    return `был(а) ${getTimeString('month', months)} назад`;
  } else if (weeks > 0) {
    return `был(а) ${getTimeString('week', weeks)} назад`;
  } else if (days > 0) {
    return `был(а) ${getTimeString('day', days)} назад`;
  } else if (hours > 0) {
    return `был(а) ${getTimeString('hour', hours)} назад`;
  } else if (minutes > 0) {
    return `был(а) ${getTimeString('minute', minutes)} назад`;
  } else {
    return `был(а) ${getTimeString('minute', 1)} назад`;
  }
}

export default getLastOnline