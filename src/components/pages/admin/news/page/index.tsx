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
import { Pagination, Search } from '@/components/ui'

import { newsSortList } from '@/constants/sort.constants'

import { URL_PAGES } from '@/config/url.config'

import { useFiltersStore } from '@/store/store'

import { useGetNews } from '@/hooks/news/useGetNews'

import styles from './index.module.scss'

const NewsPage = () => {
  const {
    queryParams,
    isFilterUpdated,
    isFilterReset,
    updateQueryParam,
    reset
  } = useFiltersStore()

  const { data, isFetching, refetch } = useGetNews(queryParams, isFilterUpdated)

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
        <div className={styles.top}>
          <Search
            placeholder='Поиск...'
            queryParams={queryParams}
            updateQueryParam={updateQueryParam}
            isFilterReset={isFilterReset}
          />
          <Sort
            data={newsSortList}
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
            href={URL_PAGES.CREATE_NEWS}
            className={styles.create_news}
            title='Создать новость'
          >
            <CalendarPlus size={30} />
          </Link>
        </div>
        <FilterComponent
          isOpen={isOpenFilter}
          type='news'
          updateQueryParam={updateQueryParam}
          handleResetFilter={handleResetFilter}
          isFilterReset={isFilterReset}
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

        {!isFetching && !news?.length && (
          <h3
            className={styles.not_found}
            style={{ position: 'relative', top: '0px' }}
          >
            Новости не были найденны
          </h3>
        )}
      </div>
      <Pagination
        countPage={countPage || 0}
        updateQueryParam={updateQueryParam}
      />
    </div>
  )
}

export default NewsPage
