import { useMutation, useQueryClient } from '@tanstack/react-query'
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
    mutationFn: ({ data, userId }: { data: IAuthFormData; userId: string }) =>
      userService.update(data, userId),
    onMutate: () => {
      toast.loading('Обработка...')
    },
    onSuccess: () => {
      toast.dismiss()
      toast.success('Пользователь обнавлён успешно')
      queryClient.invalidateQueries({ queryKey: [TanStackQueryKey.getUsers] })
      push(URL_PAGES.MANAGE_USERS)
    },
    onError: () => {
      toast.dismiss()
      toast.error('При обнавлении пользователя произошла ошибка')
    }
  })

  return { updateUser, isPendingUpdate, isSuccessUpdate, error }
}
