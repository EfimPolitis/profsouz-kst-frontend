import { useQuery } from '@tanstack/react-query'

import { TanStackQueryKey } from '@/constants/query-key.constants'

import { userService } from '@/services/user.service'

export const useGetUserById = (userId: string) => {
  const { data, isFetching, error } = useQuery({
    queryKey: [TanStackQueryKey.getUser],
    queryFn: () => userService.getById(userId)
  })

  return { data, isFetching, error }
}
