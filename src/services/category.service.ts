import type { ICategory, IResponseCategory } from '@/types/category.types'
import type { IQueryParam } from '@/types/query.types'

import { axiosWithAuth } from '@/api/interseptors'

export const categoryService = {
  async getAll(queryData = {} as IQueryParam) {
    const response = await axiosWithAuth.get<IResponseCategory[]>('/category', {
      params: queryData
    })

    return response
  },

  async create(data: ICategory) {
    const response = await axiosWithAuth.post<IResponseCategory>(
      '/category',
      data
    )

    return response
  },

  async update(data: ICategory, id: string) {
    const response = await axiosWithAuth.patch<IResponseCategory>(
      `/category/${id}`,
      data
    )

    return response
  },

  async delete(categoryId: string) {
    const response = await axiosWithAuth.delete(`/category/${categoryId}`)

    return response
  }
}
