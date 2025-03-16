import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import { TanStackQueryKey } from '@/constants/query-key.constants'

import { URL_PAGES } from '@/config/url.config'

import { authService } from '@/services/auth/auth.service'

export const useLogout = () => {
  const { push } = useRouter()
  const queryClient = useQueryClient()

  const { mutate, isPending, data, error } = useMutation({
    mutationKey: [TanStackQueryKey.logout],
    mutationFn: () => authService.logout(),
    onMutate() {
      toast.loading('Загрузка...')
    },
    onSuccess() {
      toast.dismiss()
      push(URL_PAGES.HOME)
      queryClient.invalidateQueries({ queryKey: [TanStackQueryKey.profile] })
      queryClient.getQueryCache().clear()
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

  return { mutate, isPending, data, error }
}
