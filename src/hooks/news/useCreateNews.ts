import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import { TanStackQueryKey } from '@/constants/query-key.constants'

import type { INewsFormData } from '@/types/news.types'

import { URL_PAGES } from '@/config/url.config'

import { newsService } from '@/services/news.service'

export const useCreateNews = () => {
  const { push } = useRouter()
  const queryClient = useQueryClient()

  const {
    mutate: createNews,
    isPending: isPendingCreate,
    isSuccess: isSuccessCreate,
    error: createError
  } = useMutation({
    mutationKey: [TanStackQueryKey.createNews],
    mutationFn: (data: INewsFormData) => newsService.create(data),
    onMutate: () => {
      toast.loading('Загрузка...')
    },
    onSuccess: () => {
      toast.dismiss()
      toast.success('Новость успешно созданна')
      queryClient.invalidateQueries({ queryKey: [TanStackQueryKey.getNews] })
      push(URL_PAGES.MANAGE_NEWS)
    },
    onError: (error: unknown) => {
      toast.dismiss()

      let message = 'Произошла неизвестная ошибка'

      if (error instanceof AxiosError) {
        const serverMessage = error.response?.data?.message
        if (typeof serverMessage === 'string') {
          message = serverMessage
        }
      }

      toast.error(message)
    }
  })

  return { createNews, isPendingCreate, isSuccessCreate, createError }
}
