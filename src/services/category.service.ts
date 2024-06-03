import { API_URL } from '@/constants/api.constants'

import { ICategory, IResponseCategories } from '@/types/category.types'

import { axiosWithAuth } from '@/api/interseptors'

export const categoryService = {
  async getAll() {
    const response = await axiosWithAuth.get<IResponseCategories[]>(
      `${API_URL}/category`
    )

    return response
  },

  async create(data: ICategory) {
    const response = await axiosWithAuth.post<IResponseCategories>(
      `${API_URL}/category`,
      data
    )

    return response
  },

  async update(id: string, data: ICategory) {
    const response = await axiosWithAuth.patch(
      `${API_URL}/category/${id}`,
      data
    )

    return response
  },

  async delete(categoryId: string) {
    const response = await axiosWithAuth.delete(
      `${API_URL}/category/${categoryId}`
    )

    return response
  }
}
