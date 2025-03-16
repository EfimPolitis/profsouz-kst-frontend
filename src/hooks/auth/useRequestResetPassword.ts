import { useMutation } from '@tanstack/react-query'

import { TanStackQueryKey } from '@/constants/query-key.constants'

import { authService } from '@/services/auth/auth.service'

export const useRequestResetPassword = () => {
  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationKey: [TanStackQueryKey.confirmPassword],
    mutationFn: (email: string) => authService.requestResetPassword(email)
  })

  return { mutate, isPending, isSuccess, isError }
}
