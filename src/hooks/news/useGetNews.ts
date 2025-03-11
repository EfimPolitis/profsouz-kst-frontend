import { useQuery } from '@tanstack/react-query'

import { TanStackQueryKey } from '@/constants/query-key.constants'

import { type IQueryParam } from '@/types/query.types'

import { newsService } from '@/services/news.service'

export const useGetNews = (queryData?: IQueryParam, enabled?: boolean) => {
  const { data, isLoading, isFetching, refetch, error } = useQuery({
    queryKey: [TanStackQueryKey.getNews, queryData],
    queryFn: () => newsService.getAll(queryData),
    enabled: enabled
  })

  return { data, isLoading, isFetching, refetch, error }
}
