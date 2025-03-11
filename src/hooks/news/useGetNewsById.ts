import { useQuery } from '@tanstack/react-query'

import { TanStackQueryKey } from '@/constants/query-key.constants'

import { newsService } from '@/services/news.service'

export const useGetNewsById = (newsId: string) => {
  const { data, isLoading, isPending, isFetching, error } = useQuery({
    queryKey: [TanStackQueryKey.getNewsById],
    queryFn: () => newsService.getById(newsId)
  })

  return { data, isLoading, isPending, isFetching, error }
}
