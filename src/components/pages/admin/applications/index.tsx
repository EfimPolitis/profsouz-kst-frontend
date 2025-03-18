'use client'

import cn from 'clsx'
import { FileText, Filter } from 'lucide-react'
import { useEffect, useState } from 'react'

import { FilterComponent, Sort } from '@/components/frames'
import { ApplicationTable } from '@/components/frames/tables/application-table/table'
import { Button, Loader, Pagination, Search } from '@/components/ui'

import { applicationSortList } from '@/constants/sort.constants'

import { useGetApplications } from '@/hooks/application/useGetApplications'
import { useFilters } from '@/hooks/useFilters'

import styles from './index.module.scss'
import { applicationService } from '@/services/application.service'

const ApplicationsPage = () => {
  const { queryParams, isFilterUpdated, reset } = useFilters()

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
  const countPage = data?.data?.countPage || 0

  const [isOpenFilter, setIsOpenFilter] = useState(false)

  const handleResetFilter = () => {
    reset()
  }

  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <div className={styles.top}>
          <Search placeholder={'Поиск...'} />
          <Sort data={applicationSortList} />
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
            title='Скачать отчёт по заявокам'
            onClick={() => applicationService.getReport()}
          >
            <FileText size={30} />
          </button>
        </div>
        <FilterComponent
          isOpen={isOpenFilter}
          type='application'
          handleResetFilter={handleResetFilter}
        />
        <ApplicationTable applications={applications} />
        {isFetching ? (
          <div className={styles.not_found}>
            <Loader size={50} />
          </div>
        ) : (
          !applications?.length && (
            <div className={styles.not_found}>
              <h2>Заявки на мероприятия не были найдены</h2>
              <Button onClick={() => refetch()}>
                <p>Обновить</p>
              </Button>
            </div>
          )
        )}
      </div>
      <Pagination countPage={countPage > 1 ? countPage : 0} />
    </div>
  )
}

export default ApplicationsPage
