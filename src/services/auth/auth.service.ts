import type { IAuthResponse, IFormData } from '@/types/auth.types'

import { axiosClassic, axiosWithAuth } from '@/api/interseptors'

import { removeFromStorage, saveTokenStorage } from './auth.helper'

export enum EnumTokens {
  'ACCESS_TOKEN' = 'accessToken',
  'REFRESH_TOKEN' = 'refreshToken'
}

export const authService = {
  async main(type: 'login' | 'register', data: IFormData) {
    const response =
      type === 'login'
        ? await axiosClassic.post<IAuthResponse>(`/auth/login`, data)
        : await axiosWithAuth.post(`/auth/register`, data)

    if (response?.data.accessToken) saveTokenStorage(response?.data.accessToken)

    return response
  },

  async getNewTokens() {
    const response = await axiosClassic.post<IAuthResponse>(
      '/auth/login/access-token'
    )

    if (response.data.accessToken) saveTokenStorage(response.data.accessToken)

    return response
  },

  async logout() {
    const response = await axiosClassic.post<boolean>('/auth/logout')

    if (response.data) removeFromStorage()

    return response
  }
}
