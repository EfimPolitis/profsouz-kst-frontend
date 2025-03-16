import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import { TanStackQueryKey } from '@/constants/query-key.constants'

import { URL_PAGES } from '@/config/url.config'

import { authService } from '@/services/auth/auth.service'

export const useConfirmPassword = () => {
  const { push } = useRouter()
  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationKey: [TanStackQueryKey.requestResetPassword],
    mutationFn: ({
      token,
      newPassword
    }: {
      token: string
      newPassword: string
    }) => authService.resetPassword(token, newPassword),
    onMutate: () => toast.loading('Загрузка...'),
    onSuccess: () => {
      toast.dismiss()
      toast.success('Пароль был успешно изменён')
      push(URL_PAGES.AUTH)
    },
    onError: (error: AxiosError) => {
      toast.dismiss()
      toast.error('Произошла ошибка, попробуйте позже')
      console.log(error)
    }
  })

  return { mutate, isPending, isSuccess, isError }
}
