import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { TanStackQueryKey } from '@/constants/queryKey.constants'

import { IEventFormData } from '@/types/event.types'

import { DASHBOARD_PAGES } from '@/config/page-url.config'

import { eventService } from '@/services/events.service'

export const useCreateEvent = () => {
  const { push } = useRouter()
  const queryClient = useQueryClient()
  const {
    mutate: createEvent,
    isPending: isPendingCreate,
    isSuccess: isSuccessCreate,
    error: createError
  } = useMutation({
    mutationKey: TanStackQueryKey.createEvent,
    mutationFn: (data: IEventFormData) => eventService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TanStackQueryKey.getEvents })
      push(DASHBOARD_PAGES.MANAGE_EVENTS)
    }
  })

  return { createEvent, isPendingCreate, isSuccessCreate, createError }
}
