'use client'

import { useEffect } from 'react'

import { ListRowParent } from '@/components/frames'

import { useFiltersStore } from '@/store/store'

import { useGetCategories } from '@/hooks/category/useGetCategories'

import styles from './index.module.scss'

const CategoriesPage = () => {
  const { updateQueryParam, queryParams, isFilterUpdated, reset } =
    useFiltersStore()

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
        queryParams={queryParams}
        updateQueryParam={updateQueryParam}
        isLoading={isLoading}
      />
    </div>
  )
}

export default CategoriesPage
