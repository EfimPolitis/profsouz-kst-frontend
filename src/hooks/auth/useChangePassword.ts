import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { UseFormReset } from 'react-hook-form'
import toast from 'react-hot-toast'

import { TanStackQueryKey } from '@/constants/query-key.constants'

import { IChangePasswordFormData } from '@/types/auth.types'

import { URL_PAGES } from '@/config/url.config'

import { authService } from '@/services/auth/auth.service'

export const useChangePassword = (
  reset: UseFormReset<IChangePasswordFormData>
) => {
  const { push } = useRouter()
  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationKey: [TanStackQueryKey.changePassword],
    mutationFn: (data: IChangePasswordFormData) =>
      authService.changePassword(data),
    onMutate: () => {
      toast.loading('Загрузка...')
    },
    onSuccess: () => {
      toast.dismiss()
      toast.success('Пароль был успешно изменён')
      reset()
      push(URL_PAGES.PROFILE)
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

  return { changePassword: mutate, isPending, isError, isSuccess }
}
