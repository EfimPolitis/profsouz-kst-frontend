'use client'

import cn from 'clsx'
import { FileText, Filter, UserPlus } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { FilterComponent, Sort } from '@/components/frames'
import { UserTable } from '@/components/frames/tables/user-table/table'
import { Button, Loader, Pagination, Search } from '@/components/ui'

import { userSortList } from '@/constants/sort.constants'

import { ERole } from '@/types/user.types'

import { URL_PAGES } from '@/config/url.config'

import { useFilters } from '@/hooks/useFilters'
import { useGetUsers } from '@/hooks/user/useGetUsers'
import { useProfile } from '@/hooks/user/useProfile'

import styles from './index.module.scss'
import { userService } from '@/services/user.service'

const UsersPage = () => {
  const { profile } = useProfile()
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
  const countPage = data?.data?.countPage || 0

  const [isOpenFilter, setIsOpenFilter] = useState(false)

  const handleResetFilter = () => {
    reset()
  }

  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <div className={styles.wrapper}>
          <div className={styles.top}>
            <div className={styles.search}>
              <Search placeholder={'Поиск...'} />
            </div>
            <div className={styles.sort}>
              <Sort data={userSortList} />
            </div>
            <div className={styles.tools}>
              <button
                className={cn(styles.filter, {
                  [styles.active]: isOpenFilter
                })}
                title={isOpenFilter ? 'Закрыть фильтры' : 'Открыть фильтры'}
                onClick={() => setIsOpenFilter(!isOpenFilter)}
              >
                <Filter size={30} />
              </button>
              {profile?.role === ERole.ADMIN && (
                <>
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
                </>
              )}
            </div>
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
            !users?.length && (
              <div className={styles.not_found}>
                <h2>Пользователи не были найдены</h2>
                <Button onClick={() => refetch()}>
                  <p>Обновить</p>
                </Button>
              </div>
            )
          )}
        </div>
      </div>
      <Pagination countPage={countPage > 1 ? countPage : 0} />
    </div>
  )
}

export default UsersPage
