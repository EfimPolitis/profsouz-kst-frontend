'use client'

import cn from 'clsx'
import { FileText, Filter } from 'lucide-react'
import { useEffect, useState } from 'react'

import { FilterComponent, Sort } from '@/components/frames'
import { ApplicationTable } from '@/components/frames/tables/application-table/table'
import { Pagination, Search } from '@/components/ui'

import { applicationSortList } from '@/constants/sort.constants'

import { useFiltersStore } from '@/store/store'

import { useGetApplications } from '@/hooks/application/useGetApplications'

import styles from './index.module.scss'
import { applicationService } from '@/services/application.service'

const ApplicationsPage = () => {
  const {
    queryParams,
    isFilterUpdated,
    isFilterReset,
    updateQueryParam,
    reset
  } = useFiltersStore()

  const { data, isFetching, refetch } = useGetApplications(
    queryParams,
    isFilterUpdated
  )

  useEffect(() => {
    reset()
  }, [])

  useEffect(() => {
    refetch()
  }, [queryParams])

  const applications = data?.data?.items
  const countPage = data?.data?.countPage

  const [isOpenFilter, setIsOpenFilter] = useState(false)

  const handleResetFilter = () => {
    reset()
  }

  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <div className={styles.top}>
          <Search
            placeholder={'Поиск...'}
            queryParams={queryParams}
            updateQueryParam={updateQueryParam}
            isFilterReset={isFilterReset}
          />
          <Sort
            data={applicationSortList}
            queryParams={queryParams}
            updateQueryParam={updateQueryParam}
            isFilterReset={isFilterReset}
          />
          <button
            className={cn(styles.filter, {
              [styles.active]: isOpenFilter
            })}
            title={isOpenFilter ? 'Закрыть фильтры' : 'Открыть фильтры'}
            onClick={() => setIsOpenFilter(!isOpenFilter)}
          >
            <Filter size={30} />
          </button>
          <button
            className={styles.getReport}
            title='Скачать отчёт'
            onClick={() => applicationService.getReport()}
          >
            <FileText size={30} />
          </button>
        </div>
        <FilterComponent
          isOpen={isOpenFilter}
          type='application'
          updateQueryParam={updateQueryParam}
          handleResetFilter={handleResetFilter}
          isFilterReset={isFilterReset}
        />
        <ApplicationTable
          applications={applications}
          isLoading={isFetching}
        />
      </div>
      <Pagination
        countPage={countPage || 0}
        updateQueryParam={updateQueryParam}
      />
    </div>
  )
}

export default ApplicationsPage
