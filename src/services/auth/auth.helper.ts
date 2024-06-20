import Cookies from 'js-cookie'

import { EnumTokens } from './auth.service'

export const getAccessToken = () => {
  const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN)
  return accessToken || null
}

export const saveTokenStorage = (accessToken: string) => {
  const date = new Date(Date.now() + 3600e3)
  Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, {
    sameSite: 'strict',
    expires: date
  })
}

export const removeFromStorage = () => {
  Cookies.remove(EnumTokens.ACCESS_TOKEN)
}
