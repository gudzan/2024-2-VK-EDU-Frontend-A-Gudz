const errors = {
  "No active account found with the given credentials": "Учетная запись не найдена",
  "A user with that username already exists.": "Пользователь с таким именем пользователя уже существует",
  "This password is too short. It must contain at least 8 characters.": "Этот пароль слишком короткий. Он должен содержать не менее 8 символов.",
  "This password is too common.": "Этот пароль слишком распространен.",
  "This password is entirely numeric.": "Этот пароль полностью цифровой.",
  "Private chat with these members already exists": "Приватный чат с этими участниками уже существует"
}

const getErrorTranslation = (errorName) => {
  if (errors[errorName] === undefined) {
    return `Неизвестная ошибка: ${errorName}`
  }
  return errors[errorName]
}

export default getErrorTranslation
