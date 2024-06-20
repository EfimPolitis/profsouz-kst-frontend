import { API_URL } from '@/constants/api.constants'

import type { IResponseReservations } from '@/types/reservation.types'
import { IGetData } from '@/types/sort.types'

import { getUrlForRequest } from '@/hooks/getUrlForRequest'

import { axiosWithAuth } from '@/api/interseptors'

export const reservationService = {
  async getAll(data: IGetData) {
    const { url } = getUrlForRequest(data)

    const response = await axiosWithAuth.get<IResponseReservations>(
      `${API_URL}/reservation?${url}`
    )
    return response
  },

  async getByUserId(userId: string) {
    const response = await axiosWithAuth.get<IResponseReservations>(
      `${API_URL}/reservation/${userId}`
    )
    return response
  },

  async delete(id: string) {
    const response = await axiosWithAuth.delete(`${API_URL}/reservation/${id}`)
    return response
  }
}
