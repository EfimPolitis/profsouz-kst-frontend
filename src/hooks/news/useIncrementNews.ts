import { useMutation } from '@tanstack/react-query'

import { TanStackQueryKey } from '@/constants/query-key.constants'

import { newsService } from '@/services/news.service'

export const useIncrementView = () => {
  const { mutate } = useMutation({
    mutationKey: [TanStackQueryKey.incrementView],
    mutationFn: (newsId: string) => newsService.incrementView(newsId)
  })

  return { mutate }
}
