import { useQuery } from '@tanstack/react-query'

import { TanStackQueryKey } from '@/constants/queryKey.constants'

import { IGetData } from '@/types/sort.types'

import { userService } from '@/services/user.service'

export const useGetUsers = (search: IGetData) => {
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: TanStackQueryKey.getUsers,
    queryFn: () => userService.getUsers(search)
  })

  return { data, isLoading, isFetching, refetch }
}
