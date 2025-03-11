import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { TanStackQueryKey } from '@/constants/query-key.constants'

import type { IApplicationData } from '@/types/application.types'

import { applicationService } from '@/services/application.service'

export const useCreateApplication = () => {
  const QueryClient = useQueryClient()
  const { mutate, isPending, isSuccess, isError, error, reset } = useMutation({
    mutationKey: [TanStackQueryKey.createApplication],
    mutationFn: (data: IApplicationData) => applicationService.create(data),
    onSuccess() {
      QueryClient.invalidateQueries({ queryKey: [TanStackQueryKey.getEvents] })
      toast.success('Заявка на мероприятие поданна успешно')
    },
    onError() {
      toast.error(
        'Произошла ошибка, не получилось подать заявку на мероприятие!'
      )
    }
  })

  return { mutate, isPending, isSuccess, isError, error, reset }
}
