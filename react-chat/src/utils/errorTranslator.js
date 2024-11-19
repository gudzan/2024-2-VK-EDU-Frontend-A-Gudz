const errors = {
  "No active account found with the given credentials": "Учетная запись не найдена",
};

const getErrorTranslation = (errorName) => {
  if (errors[errorName] === undefined) {
    return `Неизвестная ошибка: ${errorName}`
  }
  return errors[errorName];
}

export default getErrorTranslation