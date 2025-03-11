import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import { TanStackQueryKey } from '@/constants/query-key.constants'

import type { IEventFormData } from '@/types/event.types'

import { URL_PAGES } from '@/config/url.config'

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
    mutationKey: [TanStackQueryKey.updateEvent],
    mutationFn: ({
      data,
      eventId
    }: {
      data: IEventFormData
      eventId: string
    }) => eventService.update(data, eventId),
    onMutate: () => {
      toast.loading('Загрузка...')
    },
    onSuccess: () => {
      toast.dismiss()
      toast.success('Мероприятие успешно обнавленно')
      queryClient.invalidateQueries({ queryKey: [TanStackQueryKey.getEvents] })
      push(URL_PAGES.MANAGE_EVENTS)
    },
    onError: () => {
      toast.dismiss()
      toast.error('Произошла ошибка')
    }
  })

  return { updateEvent, isPendingUpdate, isSuccessUpdate, updateError }
}
