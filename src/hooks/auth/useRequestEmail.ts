import { useMutation } from '@tanstack/react-query'

import { TanStackQueryKey } from '@/constants/query-key.constants'

import { authService } from '@/services/auth/auth.service'

export const useRequestEmail = () => {
  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationKey: [TanStackQueryKey.requestEmail],
    mutationFn: (email: string) => authService.requestEmail(email)
  })

  return { mutate, isPending, isSuccess, isError }
}
