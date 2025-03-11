import { useQuery } from '@tanstack/react-query'

import { TanStackQueryKey } from '@/constants/query-key.constants'

import { userService } from '@/services/user.service'

export const useProfile = () => {
  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: [TanStackQueryKey.profile],
    queryFn: () => userService.getProfile(),
    retry: 1
  })

  return { data, isLoading, isError, isFetching, refetch }
}
