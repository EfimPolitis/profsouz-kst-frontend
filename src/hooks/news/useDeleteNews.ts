import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'

import { TanStackQueryKey } from '@/constants/query-key.constants'

import { newsService } from '@/services/news.service'

export const useDeleteNews = () => {
  const queryClient = useQueryClient()
  const { mutate, isPending, isSuccess, error } = useMutation({
    mutationKey: [TanStackQueryKey.deleteNews],
    mutationFn: (eventId: string) => newsService.delete(eventId),
    onMutate: () => {
      toast.loading('Загрузка...')
    },
    onSuccess: () => {
      toast.dismiss()
      toast.success('Новость успешно удаленна')
      queryClient.invalidateQueries({
        queryKey: [TanStackQueryKey.getNews]
      })
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

  return { mutateNews: mutate, isPending, isSuccess, error }
}
