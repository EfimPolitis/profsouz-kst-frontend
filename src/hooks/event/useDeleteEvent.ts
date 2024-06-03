import { useMutation, useQueryClient } from '@tanstack/react-query'

import { TanStackQueryKey } from '@/constants/queryKey.constants'

import { eventService } from '@/services/events.service'

export const useDeleteEvent = () => {
  const queryClient = useQueryClient()
  const { mutate, isPending, isSuccess, error } = useMutation({
    mutationKey: TanStackQueryKey.deleteEvent,
    mutationFn: (eventId: string) => eventService.delete(eventId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TanStackQueryKey.getEvents
      })
    }
  })

  return { mutate, isPending, isSuccess, error }
}
