import { useQuery } from '@tanstack/react-query'

import { TanStackQueryKey } from '@/constants/query-key.constants'

import type { IQueryParam } from '@/types/query.types'

import { userService } from '@/services/user.service'

export const useGetUsers = (queryData: IQueryParam, enabled: boolean) => {
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: [TanStackQueryKey.getUsers, queryData],
    queryFn: () => userService.getAll(queryData),
    enabled: enabled
  })

  return { data, isLoading, isFetching, refetch }
}
