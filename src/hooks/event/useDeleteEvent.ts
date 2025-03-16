import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'

import { TanStackQueryKey } from '@/constants/query-key.constants'

import { eventService } from '@/services/events.service'

export const useDeleteEvent = () => {
  const queryClient = useQueryClient()
  const { mutate, isPending, isSuccess, error } = useMutation({
    mutationKey: [TanStackQueryKey.deleteEvent],
    mutationFn: (eventId: string) => eventService.delete(eventId),
    onMutate: () => {
      toast.loading('Загрузка...')
    },
    onSuccess: () => {
      toast.dismiss()
      toast.success('Мероприятие успешно удаленно')
      queryClient.invalidateQueries({
        queryKey: [TanStackQueryKey.getEvents]
      })
    },
    onError: (error: unknown) => {
      toast.dismiss()

      let message = 'Произошла неизвестная ошибка'

      if (error instanceof AxiosError) {
        const serverMessage = error.response?.data?.message
        if (typeof serverMessage === 'string') {
          message = serverMessage
        }
      }

      toast.error(message)
    }
  })

  return { mutate, isPending, isSuccess, error }
}
