import type { INews, INewsFormData, IResponseNews } from '@/types/news.types'
import type { IQueryParam } from '@/types/query.types'

import { axiosClassic, axiosWithAuth } from '../api/interseptors'

export const newsService = {
  async getById(newsId: string) {
    const response = await axiosClassic.get<INews>(`/news/${newsId}`)

    return response
  },

  async getAll(queryData = {} as IQueryParam) {
    const response = await axiosClassic.get<IResponseNews>('/news', {
      params: queryData
    })

    return response
  },

  async incrementView(newsId: string) {
    const response = await axiosClassic.post(`/news/views/${newsId}`)

    return response
  },

  async create(data: INewsFormData) {
    const response = await axiosWithAuth.post('/news', data)

    return response
  },

  async update(data: INewsFormData, newsId: string) {
    const response = await axiosWithAuth.patch(`/news/${newsId}`, data)

    return response
  },

  async delete(newsId: string) {
    const response = await axiosWithAuth.delete(`/news/${newsId}`)

    return response
  },

  async uploadImage(formData: FormData) {
    const response = await axiosWithAuth.post<{
      url: string
      id: string
      name: string
    }>('/news/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    return response
  },

  async deleteImage(fileName: string) {
    const response = await axiosWithAuth.delete(`/news/image/${fileName}`)

    return response
  }
}
