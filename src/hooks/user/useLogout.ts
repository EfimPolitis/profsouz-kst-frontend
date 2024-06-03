import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { TanStackQueryKey } from '@/constants/queryKey.constants'

import { DASHBOARD_PAGES } from '@/config/page-url.config'

import { authService } from '@/services/auth/auth.service'

export const useLogout = () => {
  const { push } = useRouter()
  const queryClient = useQueryClient()

  const { mutate, isPending, data, error } = useMutation({
    mutationKey: TanStackQueryKey.logout,
    mutationFn: () => authService.logout(),
    async onSuccess() {
      push(DASHBOARD_PAGES.HOME)
      queryClient.invalidateQueries({ queryKey: TanStackQueryKey.profile })
    }
  })

  return { mutate, isPending, data, error }
}
