import { useQuery } from '@tanstack/react-query'

import { TanStackQueryKey } from '@/constants/query-key.constants'

import { type IQueryParam } from '@/types/query.types'

import { eventService } from '@/services/events.service'

export const useGetEvents = (queryData: IQueryParam, enabled: boolean) => {
  const { data, isLoading, isFetching, refetch, error } = useQuery({
    queryKey: [TanStackQueryKey.getEvents, queryData],
    queryFn: () => eventService.getAll(queryData),
    enabled: enabled
  })

  return { data, isLoading, isFetching, refetch, error }
}
