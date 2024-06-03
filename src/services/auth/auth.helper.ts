import Cookies from 'js-cookie'

import { EnumTokens } from './auth.service'

export const getAccessToken = () => {
  const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN)
  return accessToken || null
}

export const saveTokenStorage = (accessToken: string) => {
  const date = new Date(Date.now() + 3600e3)
  Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, {
    // domain: 'saiyrys-profunion-e257.twc1.net',
    domain: 'localhost',
    sameSite: 'strict',
    expires: date
  })
}

export const removeFromStorage = () => {
  Cookies.remove(EnumTokens.ACCESS_TOKEN)
}
