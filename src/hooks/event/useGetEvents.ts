import { useQuery } from '@tanstack/react-query'

import { TanStackQueryKey } from '@/constants/queryKey.constants'

import { IGetData } from '@/types/sort.types'

import { eventService } from '@/services/events.service'

export const useGetEvents = (searchData: IGetData) => {
  const { data, isLoading, isFetching, refetch, error } = useQuery({
    queryKey: TanStackQueryKey.getEvents,
    queryFn: () => eventService.getAll(searchData)
  })

  return { data, isLoading, isFetching, refetch, error }
}
