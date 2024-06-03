import { useQuery } from '@tanstack/react-query'

import { TanStackQueryKey } from '@/constants/queryKey.constants'

import { getAccessToken } from '@/services/auth/auth.helper'
import { userService } from '@/services/user.service'

export const useProfile = () => {
  const accessToken = getAccessToken()

  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: TanStackQueryKey.profile,
    queryFn: () => userService.getProfile(),
    // enabled: !!accessToken,
    retry: 1
  })

  return { data, isLoading, isError, isFetching, refetch }
}
