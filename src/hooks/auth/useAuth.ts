import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { useRouter } from 'next/navigation'
import type { UseFormReset } from 'react-hook-form'
import toast from 'react-hot-toast'

import { TanStackQueryKey } from '@/constants/query-key.constants'

import { IAuthFormData } from '@/types/auth.types'

import { URL_PAGES } from '@/config/url.config'

import { authService } from '@/services/auth/auth.service'

export const useAuth = (isLogin: boolean, reset: UseFormReset<any>) => {
  const { push, refresh } = useRouter()

  const {
    mutate: authUser,
    isPending: isPendingAuth,
    isSuccess: isSuccessAuth
  } = useMutation({
    mutationKey: [TanStackQueryKey.auth],
    mutationFn: (data: IAuthFormData) =>
      authService.main(isLogin ? 'login' : 'register', data),
    onMutate: () => {
      toast.loading('Загрузка...')
    },
    onSuccess() {
      toast.dismiss()
      toast.success(
        isLogin
          ? 'Вы успешно вошли в систему'
          : 'Новый пользователь успешно создан'
      )
      reset()
      push(isLogin ? URL_PAGES.HOME : URL_PAGES.MANAGE_USERS)
      refresh()
    },
    onError: (error: unknown) => {
      console.log(error)
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

  return { authUser, isPendingAuth, isSuccessAuth }
}
