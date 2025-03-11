import { saveAs } from 'file-saver'

import { axiosWithAuth } from '../api/interseptors'

export const reportServise = {
  downloadReport: async (entity: 'event' | 'users' | 'application') => {
    try {
      // Запрос отчёта
      const response = await axiosWithAuth.get(`/${entity}/report`, {
        responseType: 'blob'
      })

      // Получаем имя файла из заголовка Content-Disposition
      const contentDisposion = response.headers['content-disposition']
      const fileNameMatch = contentDisposion?.match(/filename*=UTF-8''(.+)/)
      const fileName = fileNameMatch
        ? fileNameMatch[1]
        : `report_${entity}_${new Date(Date.now()).toISOString().slice(0, -14)}.xlsx`

      // Сохраняем файл в "Загрузки"
      saveAs(response.data, fileName)
    } catch (error) {
      console.error('Ошибка загрузки отчёта:', error)
    }
  }
}
