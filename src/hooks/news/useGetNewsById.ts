import { useQuery } from '@tanstack/react-query'

import { TanStackQueryKey } from '@/constants/query-key.constants'

import { newsService } from '@/services/news.service'

export const useGetNewsById = (newsId: string | undefined) => {
  const { data, isLoading, isPending, isFetching, error } = useQuery({
    queryKey: [TanStackQueryKey.getNewsById],
    queryFn: () => {
      if (newsId) return newsService.getById(newsId)
      else throw new Error('newsId is undefind')
    }
  })

  return { data, isLoading, isPending, isFetching, error }
}
