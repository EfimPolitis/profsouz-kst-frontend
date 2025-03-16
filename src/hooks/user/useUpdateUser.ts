import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import { TanStackQueryKey } from '@/constants/query-key.constants'

import type { IAuthFormData } from '@/types/auth.types'

import { URL_PAGES } from '@/config/url.config'

import { userService } from '@/services/user.service'

export const useUpdateUser = () => {
  const { push } = useRouter()
  const queryClient = useQueryClient()
  const {
    mutate: updateUser,
    isPending: isPendingUpdate,
    isSuccess: isSuccessUpdate,
    error
  } = useMutation({
    mutationKey: [TanStackQueryKey.updateUser],
    mutationFn: ({
      data,
      userId
    }: {
      data: IAuthFormData
      userId: string | undefined
    }) => {
      if (!userId) throw new Error('Invalid userId')
      else return userService.update(data, userId)
    },
    onMutate: () => {
      toast.loading('Обработка...')
    },
    onSuccess: () => {
      toast.dismiss()
      toast.success('Пользователь обновлён успешно')
      queryClient.invalidateQueries({ queryKey: [TanStackQueryKey.getUsers] })
      push(URL_PAGES.MANAGE_USERS)
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

  return { updateUser, isPendingUpdate, isSuccessUpdate, error }
}
