'use client'

import { useEffect } from 'react'

import { ListRowParent } from '@/components/frames'

import { useGetCategories } from '@/hooks/category/useGetCategories'
import { useFilters } from '@/hooks/useFilters'

import styles from './index.module.scss'

const CategoriesPage = () => {
  const { queryParams, isFilterUpdated, reset, updateQueryParams } =
    useFilters()

  const { categories, setCategories, isLoading, refetch } = useGetCategories(
    queryParams,
    isFilterUpdated
  )

  useEffect(() => {
    reset()
  }, [])

  useEffect(() => {
    refetch()
  }, [queryParams])

  return (
    <div className={styles.page}>
      <ListRowParent
        categories={categories}
        setCategories={setCategories}
        updateQueryParams={updateQueryParams}
        isLoading={isLoading}
        refetch={refetch}
      />
    </div>
  )
}

export default CategoriesPage
