export const authErrorList = new Map()
authErrorList.set(404, 'Неверное имя пользователя или пароль')
authErrorList.set(500, 'Ошибка сети')

export const changePasswordErrorList = new Map()
changePasswordErrorList.set(401, 'Ошибка авторизации')
changePasswordErrorList.set(404, 'Неверный текущий пароль')
changePasswordErrorList.set(500, 'Ошибка сети')

export const requestEmailErrorList = new Map()
requestEmailErrorList.set(404, 'Данная почта не была найденна')
requestEmailErrorList.set(500, 'Ошибка сети')
