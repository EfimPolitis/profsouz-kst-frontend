import { useQuery } from '@tanstack/react-query'

import { TanStackQueryKey } from '@/constants/query-key.constants'

import { userService } from '@/services/user.service'

export const useGetUserById = (userId: string | undefined) => {
  const { data, isFetching, error } = useQuery({
    queryKey: [TanStackQueryKey.getUser],
    queryFn: () => {
      if (userId) return userService.getById(userId)
      else throw new Error('userName is undefind')
    }
  })

  return { data, isFetching, error }
}
