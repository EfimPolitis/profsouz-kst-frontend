import { IFormData } from '@/types/auth.types'
import type { IGetData } from '@/types/sort.types'
import {
  type IProfileResponse,
  type IResponseUsers,
  IUser
} from '@/types/user.types'

import { getUrlForRequest } from '@/hooks/getUrlForRequest'

import { axiosWithAuth } from '@/api/interseptors'

export const userService = {
  async getUsers(data: IGetData) {
    const { url } = getUrlForRequest(data)
    return axiosWithAuth.get<IResponseUsers>(`/users?${url}`)
  },

  async getUser(userId: string) {
    return axiosWithAuth.get<IUser>(`/users/${userId}`)
  },

  async getProfile() {
    const response = await axiosWithAuth.get<IProfileResponse>('/users/profile')
    return response.data
  },

  async updateUser(data: IFormData, id: string) {
    const response = await axiosWithAuth.patch(`/users/${id}`, data)
    return response
  },

  async deleteUser(id: string) {
    const response = await axiosWithAuth.delete(`/users/${id}`)
    return response
  }
}
