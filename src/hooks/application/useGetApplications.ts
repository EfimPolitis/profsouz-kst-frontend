import { useQuery } from '@tanstack/react-query'

import { TanStackQueryKey } from '@/constants/query-key.constants'

import type { IQueryParam } from '@/types/query.types'

import { applicationService } from '@/services/application.service'

export const useGetApplications = (
  queryData: IQueryParam,
  enabled: boolean
) => {
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: [TanStackQueryKey.getApplications, queryData],
    queryFn: () => applicationService.getAll(queryData),
    enabled: enabled
  })

  return { data, isLoading, isFetching, refetch }
}
