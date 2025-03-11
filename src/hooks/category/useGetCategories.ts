'use client'

import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { TanStackQueryKey } from '@/constants/query-key.constants'

import type { IResponseCategory } from '@/types/category.types'
import type { IQueryParam } from '@/types/query.types'

import { categoryService } from '@/services/category.service'

export const useGetCategories = (
  queryData?: IQueryParam,
  enabled?: boolean
) => {
  const { data, isLoading, refetch, error } = useQuery({
    queryKey: [TanStackQueryKey.getCategories, queryData],
    queryFn: () => categoryService.getAll(queryData),
    enabled: enabled
  })

  const [categories, setCategories] = useState<IResponseCategory[]>(
    data?.data || []
  )

  useEffect(() => {
    setCategories(data?.data || [])
  }, [data?.data])

  return { categories, setCategories, isLoading, refetch, error }
}
