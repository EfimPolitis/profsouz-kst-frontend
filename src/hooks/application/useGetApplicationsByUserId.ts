import { useQuery } from '@tanstack/react-query'

import { TanStackQueryKey } from '@/constants/query-key.constants'

import { applicationService } from '@/services/application.service'

export const useGetApplicationsByUserId = (userId: string) => {
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: [TanStackQueryKey.getApplicationsByUserId],
    queryFn: () => applicationService.getByUserId(userId)
  })

  return { data, isLoading, isFetching, refetch }
}
