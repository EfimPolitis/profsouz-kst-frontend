import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { TanStackQueryKey } from '@/constants/queryKey.constants'

import { IEventFormData } from '@/types/event.types'

import { DASHBOARD_PAGES } from '@/config/page-url.config'

import { eventService } from '@/services/events.service'

export const useUpdateEvent = () => {
  const { push } = useRouter()
  const queryClient = useQueryClient()

  const {
    mutate: updateEvent,
    isPending: isPendingUpdate,
    isSuccess: isSuccessUpdate,
    error: updateError
  } = useMutation({
    mutationKey: TanStackQueryKey.updateEvent,
    mutationFn: ({
      data,
      eventId
    }: {
      data: IEventFormData
      eventId: string
    }) => eventService.update(data, eventId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TanStackQueryKey.getEvents })
      push(DASHBOARD_PAGES.MANAGE_EVENTS)
    }
  })

  return { updateEvent, isPendingUpdate, isSuccessUpdate, updateError }
}
