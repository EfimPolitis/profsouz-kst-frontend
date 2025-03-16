'use client'

import cn from 'clsx'
import { FileText, Filter, UserPlus } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { FilterComponent, Sort } from '@/components/frames'
import { UserTable } from '@/components/frames/tables/user-table/table'
import { Button, Loader, Pagination, Search } from '@/components/ui'

import { userSortList } from '@/constants/sort.constants'

import { URL_PAGES } from '@/config/url.config'

import { useFilters } from '@/hooks/useFilters'
import { useGetUsers } from '@/hooks/user/useGetUsers'

import styles from './index.module.scss'
import { userService } from '@/services/user.service'

const UsersPage = () => {
  const { queryParams, isFilterUpdated, reset } = useFilters()
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
          <Search placeholder={'Поиск...'} />
          <Sort data={userSortList} />
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
            title='Скачать отчёт по пользователям'
            onClick={() => userService.getReport()}
          >
            <FileText size={30} />
          </button>
        </div>
        <FilterComponent
          isOpen={isOpenFilter}
          type='user'
          handleResetFilter={handleResetFilter}
        />
        <UserTable users={users} />
        {isFetching ? (
          <div className={styles.not_found}>
            <Loader size={50} />
          </div>
        ) : (
          !!users?.length || (
            <div className={styles.not_found}>
              <h2>Пользователи не были найдены</h2>
              <Button onClick={() => refetch()}>
                <p>Обновить</p>
              </Button>
            </div>
          )
        )}
      </div>
      <Pagination countPage={countPage || 0} />
    </div>
  )
}

export default UsersPage
