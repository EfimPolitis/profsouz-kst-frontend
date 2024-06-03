import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { TanStackQueryKey } from '@/constants/queryKey.constants'

import { IFormData } from '@/types/auth.types'

import { DASHBOARD_PAGES } from '@/config/page-url.config'

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
    mutationKey: TanStackQueryKey.updateUser,
    mutationFn: ({ data, userId }: { data: IFormData; userId: string }) =>
      userService.updateUser(data, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TanStackQueryKey.getUsers })
      push(DASHBOARD_PAGES.MANAGE_USERS)
    }
  })

  return { updateUser, isPendingUpdate, isSuccessUpdate, error }
}
