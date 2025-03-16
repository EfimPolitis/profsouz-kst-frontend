import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import { TanStackQueryKey } from '@/constants/query-key.constants'

import type { INewsFormData } from '@/types/news.types'

import { URL_PAGES } from '@/config/url.config'

import { newsService } from '@/services/news.service'

export const useUpdateNews = () => {
  const { push } = useRouter()
  const queryClient = useQueryClient()

  const {
    mutate: updateNews,
    isPending: isPendingUpdate,
    isSuccess: isSuccessUpdate,
    error: updateError
  } = useMutation({
    mutationKey: [TanStackQueryKey.updateNews],
    mutationFn: ({ data, newsId }: { data: INewsFormData; newsId: string }) =>
      newsService.update(data, newsId),
    onMutate: () => {
      toast.loading('Загрузка...')
    },
    onSuccess: () => {
      toast.dismiss()
      toast.success('Новость успешно обновленна')
      queryClient.invalidateQueries({ queryKey: [TanStackQueryKey.getNews] })
      push(URL_PAGES.MANAGE_NEWS)
    },
    onError: () => {
      toast.dismiss()
      toast.error('Произошла ошибка')
    }
  })

  return { updateNews, isPendingUpdate, isSuccessUpdate, updateError }
}
