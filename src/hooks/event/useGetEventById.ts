import { useQuery } from '@tanstack/react-query'

import { TanStackQueryKey } from '@/constants/query-key.constants'

import { eventService } from '@/services/events.service'

export const useGetEventById = (eventId: string | undefined) => {
  const { data, isLoading, isPending, isFetching, refetch, error } = useQuery({
    queryKey: [TanStackQueryKey.getEventById],
    queryFn: () => {
      if (eventId) return eventService.getById(eventId)
      else throw new Error('eventId is undefind')
    }
  })

  return { data, isLoading, isPending, isFetching, refetch, error }
}
