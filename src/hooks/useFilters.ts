'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { IQueryParam } from '@/types/query.types'

import { useFiltersStore } from '@/store/store'

export const useFilters = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  const {
    updateQueryParam,
    isFilterUpdated,
    isFilterReset,
    queryParams,
    reset
  } = useFiltersStore()

  useEffect(() => {
    console.log('Pathname изменился:', pathname)
    console.log('search Params изменились:', searchParams.toString())
    console.log('query param:', queryParams)

    searchParams.forEach((value, key) => {
      console.log(key, value)
      if (queryParams[key as keyof IQueryParam] !== value) {
        updateQueryParam({
          key: key as keyof IQueryParam,
          value
        })
      }
    })

    console.log('query param:', queryParams)
  }, [pathname, searchParams])

  const updateQueryParams = (key: keyof IQueryParam, value: string) => {
    const newParams = new URLSearchParams(searchParams.toString())

    if (value) newParams.set(key, String(value))
    else newParams.delete(key)

    if (newParams.toString() !== searchParams.toString()) {
      replace(pathname + `?${newParams.toString()}`)
    }

    updateQueryParam({ key, value })
  }

  return {
    updateQueryParams,
    isFilterUpdated,
    isFilterReset,
    queryParams,
    reset
  }
}
