import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import type { UseFormReset } from 'react-hook-form'

import { TanStackQueryKey } from '@/constants/queryKey.constants'

import type { IFormData } from '@/types/auth.types'

import { DASHBOARD_PAGES } from '@/config/page-url.config'

import { authService } from '@/services/auth/auth.service'

export const useAuth = (isLogin: boolean, reset: UseFormReset<any>) => {
  const { push, refresh } = useRouter()

  const {
    mutate,
    isPending: isPendingAuth,
    isSuccess: isSuccessAuth,
    error
  } = useMutation({
    mutationKey: TanStackQueryKey.auth,
    mutationFn: (data: IFormData) =>
      authService.main(isLogin ? 'login' : 'register', data),
    onSuccess() {
      reset()
      push(isLogin ? DASHBOARD_PAGES.HOME : DASHBOARD_PAGES.MANAGE_USERS)
      refresh()
    }
  })

  return { mutate, isPendingAuth, isSuccessAuth, error }
}
