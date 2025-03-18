'use client'

import cn from 'clsx'
import { CalendarPlus, Filter } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import {
  FilterComponent,
  NewsCard,
  NewsCardSkeleton,
  Sort
} from '@/components/frames'
import { Button, Pagination, Search } from '@/components/ui'

import { newsSortList } from '@/constants/sort.constants'

import { ERole } from '@/types/user.types'

import { URL_PAGES } from '@/config/url.config'

import { useGetNews } from '@/hooks/news/useGetNews'
import { useFilters } from '@/hooks/useFilters'
import { useProfile } from '@/hooks/user/useProfile'

import styles from './index.module.scss'

const NewsPage = () => {
  const { queryParams, isFilterUpdated, reset } = useFilters()
  const { data, isFetching, refetch } = useGetNews(queryParams, isFilterUpdated)
  const { profile } = useProfile()

  useEffect(() => {
    reset()
  }, [])

  useEffect(() => {
    refetch()
  }, [queryParams])

  const news = data?.data?.items
  const countPage = data?.data?.countPage

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
              <Search placeholder='Поиск...' />
            </div>
            <div className={styles.sort}>
              <Sort data={newsSortList} />
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
              {(profile?.role === ERole.ADMIN ||
                profile?.role === ERole.MODER) && (
                <Link
                  href={URL_PAGES.CREATE_NEWS}
                  className={styles.create_news}
                  title='Создать новость'
                >
                  <CalendarPlus size={30} />
                </Link>
              )}
            </div>
          </div>
          <FilterComponent
            isOpen={isOpenFilter}
            type='news'
            handleResetFilter={handleResetFilter}
          />
          <div className={styles.news_block}>
            {isFetching
              ? [...new Array(12)].map((_, i) => <NewsCardSkeleton key={i} />)
              : !!news?.length &&
                news.map(news => (
                  <NewsCard
                    key={news.newsId}
                    data={news}
                  />
                ))}
          </div>
          {isFetching || !!news?.length || (
            <div className={styles.not_found}>
              <h2>Новости не были найдены</h2>
              <Button onClick={() => refetch()}>
                <p>Обновить</p>
              </Button>
            </div>
          )}
        </div>
      </div>
      <Pagination countPage={countPage || 0} />
    </div>
  )
}

export default NewsPage
