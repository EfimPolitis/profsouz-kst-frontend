import type {
  IEvent,
  IEventFormData,
  IResponseEvents
} from '@/types/event.types'
import type { IQueryParam } from '@/types/query.types'

import { axiosWithAuth } from '@/api/interseptors'

import { reportServise } from './report.sevice'

export const eventService = {
  async getAll(queryData = {} as IQueryParam) {
    return axiosWithAuth.get<IResponseEvents>('/event', {
      params: queryData
    })
  },

  async getById(eventId: string) {
    return axiosWithAuth.get<IEvent>(`/event/${eventId}`)
  },

  async create(data: IEventFormData) {
    const response = await axiosWithAuth.post('/event', data)
    return response
  },

  async update(data: IEventFormData, eventId: string) {
    const response = await axiosWithAuth.patch(`/event/${eventId}`, data)
    return response
  },

  async delete(eventId: string) {
    await axiosWithAuth.delete(`/event/${eventId}`)
  },

  async getReport() {
    return reportServise.downloadReport('event')
  },

  async uploadImage(formData: FormData) {
    const response = await axiosWithAuth.post<{
      url: string
      id: string
      name: string
    }>('/event/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    return response
  },

  async deleteImage(fileName: string) {
    const response = await axiosWithAuth.delete(`/event/image/${fileName}`)

    return response
  }
}
