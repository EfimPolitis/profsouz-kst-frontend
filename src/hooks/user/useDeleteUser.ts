import { useMutation, useQueryClient } from '@tanstack/react-query'

import { TanStackQueryKey } from '@/constants/queryKey.constants'

import { userService } from '@/services/user.service'

export const useDeleteUser = () => {
  const queryClient = useQueryClient()
  const {
    mutate: deleteUser,
    isPending,
    error
  } = useMutation({
    mutationKey: TanStackQueryKey.deleteUser,
    mutationFn: (id: string) => userService.deleteUser(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: TanStackQueryKey.getUsers })
  })

  return { deleteUser, isPending, error }
}
