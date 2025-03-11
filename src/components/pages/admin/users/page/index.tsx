'use client'

import cn from 'clsx'
import { FileText, Filter, UserPlus } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { FilterComponent, Sort } from '@/components/frames'
import { UserTable } from '@/components/frames/tables/user-table/table'
import { Pagination, Search } from '@/components/ui'

import { userSortList } from '@/constants/sort.constants'

import { URL_PAGES } from '@/config/url.config'

import { useFiltersStore } from '@/store/store'

import { useGetUsers } from '@/hooks/user/useGetUsers'

import styles from './index.module.scss'
import { userService } from '@/services/user.service'

const UsersPage = () => {
  const {
    queryParams,
    isFilterUpdated,
    isFilterReset,
    updateQueryParam,
    reset
  } = useFiltersStore()
  const { data, isFetching, refetch } = useGetUsers(
    queryParams,
    isFilterUpdated
  )

  useEffect(() => {
    reset()
  }, [])

  useEffect(() => {
    refetch()
  }, [queryParams])

  const users = data?.data?.items
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
            updateQueryParam={updateQueryParam}
            queryParams={queryParams}
            isFilterReset={isFilterReset}
          />
          <Sort
            data={userSortList}
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
          <Link
            href={URL_PAGES.CREATE_USER}
            className={styles.create_user}
            title='Создать пользователя'
          >
            <UserPlus size={30} />
          </Link>
          <button
            className={styles.getReport}
            title='Скачать отчёт'
            onClick={() => userService.getReport()}
          >
            <FileText size={30} />
          </button>
        </div>
        <FilterComponent
          isOpen={isOpenFilter}
          type='user'
          updateQueryParam={updateQueryParam}
          handleResetFilter={handleResetFilter}
          isFilterReset={isFilterReset}
        />
        <UserTable
          users={users}
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

export default UsersPage
