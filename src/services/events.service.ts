import { API_URL } from '@/constants/api.constants'

import type {
  IEvent,
  IEventFormData,
  IResponseEvents
} from '@/types/event.types'
import type { IGetData } from '@/types/sort.types'

import { getUrlForRequest } from '@/hooks/getUrlForRequest'

import { axiosClassic, axiosWithAuth } from '@/api/interseptors'

export const eventService = {
  async getAll(data: IGetData) {
    const { url } = getUrlForRequest(data)

    return axiosClassic.get<IResponseEvents>(`${API_URL}/event?${url}`)
  },

  async getById(eventId: string) {
    return axiosClassic.get<IEvent>(`${API_URL}/event/${eventId}`)
  },

  async create(data: IEventFormData) {
    const response = await axiosWithAuth.post(`${API_URL}/event`, data)
    return response
  },

  async update(data: IEventFormData, eventId: string) {
    const response = await axiosWithAuth.patch(
      `${API_URL}/event/${eventId}`,
      data
    )
    return response
  },

  async delete(eventId: string) {
    await axiosWithAuth.delete(`${API_URL}/event/${eventId}`)
  }
}
