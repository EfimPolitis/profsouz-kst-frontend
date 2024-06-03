'use client'

import { FileText, UserPlus } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { UserTable } from '@/components/screens/tables/user-table/Table'
import { Search } from '@/components/ui/fields/search/Search'
import { Pagination } from '@/components/ui/pagination/Pagination'
import { Sort } from '@/components/ui/sort/Sort'

import { userSortList } from '@/constants/sort.constants'

import { EType } from '@/types/sort.types'

import { DASHBOARD_PAGES } from '@/config/page-url.config'

import { useDebounce } from '@/hooks/useDebounce'
import { useGetUsers } from '@/hooks/user/useGetUsers'

import styles from './Users.module.scss'

const ManageUser = () => {
  const [type, setType] = useState<EType>(EType.asc)
  const [sort, setSort] = useState(userSortList[0])
  const [debounceSearch, search, setSearch] = useDebounce('', 500)
  const [page, setPage] = useState(0)
  const { data, isFetching, refetch } = useGetUsers({
    search,
    page,
    sort,
    type
  })

  useEffect(() => {
    refetch()
  }, [debounceSearch, page, sort, type, refetch])

  const users = data?.data?.items
  const countPage = data?.data?.countPage

  return (
    <div className={styles.page}>
      <div>
        <div className={styles.top}>
          <Search
            placeholder={'Поиск...'}
            value={search}
            setValue={setSearch}
          />
          <Sort
            list={userSortList}
            sort={sort}
            setSort={setSort}
            type={type}
            setType={setType}
          />
          <Link
            href={DASHBOARD_PAGES.CREATE_USER}
            className={styles.create_user}
            title='Создать пользователя'
          >
            <UserPlus size={30} />
          </Link>
          <button
            className={styles.getReport}
            title='Скачать отчёт'
          >
            <FileText size={30} />
          </button>
        </div>
        <UserTable
          styles={styles}
          users={users}
          isLoading={isFetching}
        />
      </div>
      <Pagination
        countPage={countPage || 0}
        value={page}
        setValue={setPage}
      />
    </div>
  )
}

export default ManageUser
