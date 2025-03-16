import type {
  IApplication,
  IApplicationData,
  IResponeApplications
} from '@/types/application.types'
import { IResponseEventsByUserId } from '@/types/event.types'
import type { IQueryParam } from '@/types/query.types'

import { axiosWithAuth } from '@/api/interseptors'

import { reportServise } from './report.sevice'

export const applicationService = {
  async getAll(queryData = {} as IQueryParam) {
    const response = await axiosWithAuth.get<IResponeApplications>(
      '/application',
      {
        params: queryData
      }
    )
    return response
  },

  async getByUserName(userName: string) {
    const response = await axiosWithAuth.get<IResponseEventsByUserId>(
      `/application/${userName}`
    )
    return response
  },

  async create(data: IApplicationData) {
    const response = await axiosWithAuth.post<IApplication>(
      '/application',
      data
    )
    return response
  },

  async getReport() {
    return reportServise.downloadReport('application')
  }
}
