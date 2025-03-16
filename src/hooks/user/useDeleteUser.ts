import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'

import { TanStackQueryKey } from '@/constants/query-key.constants'

import { userService } from '@/services/user.service'

export const useDeleteUser = () => {
  const queryClient = useQueryClient()
  const {
    mutate: deleteUser,
    isPending,
    error
  } = useMutation({
    mutationKey: [TanStackQueryKey.deleteUser],
    mutationFn: (userId: string) => userService.delete(userId),
    onMutate: () => {
      toast.loading('Загрузка...')
    },
    onSuccess: () => {
      toast.dismiss()
      toast.success('Пользователь успешно удалён')
      queryClient.invalidateQueries({ queryKey: [TanStackQueryKey.getUsers] })
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

  return { deleteUser, isPending, error }
}
