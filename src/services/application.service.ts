import { API_URL } from '@/constants/api.constants'

import {
  IApplication,
  IApplicationData,
  IResponeApplications
} from '@/types/application.types'
import { IGetData } from '@/types/sort.types'

import { getUrlForRequest } from '@/hooks/getUrlForRequest'

import { axiosWithAuth } from '@/api/interseptors'

export const applicationService = {
  async getAll(data: IGetData) {
    const { url } = getUrlForRequest(data)

    const response = await axiosWithAuth.get<IResponeApplications>(
      `${API_URL}/application?${url}`
    )
    return response
  },

  async getByUserId(userId: string) {
    const response = await axiosWithAuth.get<IResponeApplications>(
      `${API_URL}/application/${userId}`
    )
    return response
  },

  async create(data: IApplicationData) {
    const response = await axiosWithAuth.post<IApplication>(
      `${API_URL}/application`,
      data
    )
    return response
  },

  async sendStatus(status: string, id: string) {
    const response = await axiosWithAuth.patch(`${API_URL}/application/${id}`, {
      status
    })
    return response
  }
}
