import { useQuery } from '@tanstack/react-query'

import { TanStackQueryKey } from '@/constants/queryKey.constants'

import { userService } from '@/services/user.service'

export const useGetUser = (userId: string) => {
  const { data, isFetching, error } = useQuery({
    queryKey: TanStackQueryKey.getUser,
    queryFn: () => userService.getUser(userId)
  })

  return { data, isFetching, error }
}
