import type { IAuthFormData } from '@/types/auth.types'
import type { IQueryParam } from '@/types/query.types'
import {
  type IProfileResponse,
  type IResponseUsers,
  IUser
} from '@/types/user.types'

import { axiosWithAuth } from '@/api/interseptors'

import { reportServise } from './report.sevice'

export const userService = {
  async getAll(queryData = {} as IQueryParam) {
    const response = await axiosWithAuth.get<IResponseUsers>('/users', {
      params: queryData
    })

    return response
  },

  async getById(userId: string) {
    const response = await axiosWithAuth.get<IUser>(`/users/${userId}`)

    return response
  },

  async getProfile() {
    const response = await axiosWithAuth.get<IProfileResponse>('/users/profile')

    return response.data
  },

  async update(data: IAuthFormData, id: string) {
    const response = await axiosWithAuth.patch(`/users/${id}`, data)

    return response
  },

  async delete(id: string) {
    const response = await axiosWithAuth.delete(`/users/${id}`)

    return response
  },

  async getReport() {
    return reportServise.downloadReport('users')
  }
}
