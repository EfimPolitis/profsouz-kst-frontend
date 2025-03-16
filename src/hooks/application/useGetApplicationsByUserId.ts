import { useQuery } from '@tanstack/react-query'

import { TanStackQueryKey } from '@/constants/query-key.constants'

import { applicationService } from '@/services/application.service'

export const useGetApplicationsByUserId = (userName: string | undefined) => {
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: [TanStackQueryKey.getApplicationsByUserName],
    queryFn: () => {
      if (userName) return applicationService.getByUserName(userName)
      else throw new Error('userName as undefind')
    }
  })

  return { data, isLoading, isFetching, refetch }
}
