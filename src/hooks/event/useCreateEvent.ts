import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import { TanStackQueryKey } from '@/constants/query-key.constants'

import type { IEventFormData } from '@/types/event.types'

import { URL_PAGES } from '@/config/url.config'

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
    mutationKey: [TanStackQueryKey.createEvent],
    mutationFn: (data: IEventFormData) => eventService.create(data),
    onMutate: () => {
      toast.loading('Загрузка...')
    },
    onSuccess: () => {
      toast.dismiss()
      toast.success('Мероприятие успешно созданно')
      queryClient.invalidateQueries({ queryKey: [TanStackQueryKey.getEvents] })
      push(URL_PAGES.MANAGE_EVENTS)
    },
    onError: () => {
      toast.dismiss()
      toast.error('Произошла ошибка')
    }
  })

  return { createEvent, isPendingCreate, isSuccessCreate, createError }
}
