import { useQuery } from '@tanstack/react-query'

import { TanStackQueryKey } from '@/constants/query-key.constants'

import { eventService } from '@/services/events.service'

export const useGetEventById = (eventId: string) => {
  const { data, isLoading, isPending, isFetching, refetch, error } = useQuery({
    queryKey: [TanStackQueryKey.getEventById],
    queryFn: () => eventService.getById(eventId)
  })

  return { data, isLoading, isPending, isFetching, refetch, error }
}
