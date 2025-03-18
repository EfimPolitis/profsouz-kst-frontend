'use client'

import cn from 'clsx'
import { CalendarPlus, FileText, Filter } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import {
  EventCard,
  EventCardSkeleton,
  FilterComponent,
  Sort
} from '@/components/frames'
import { Button, Pagination, Search } from '@/components/ui'

import { eventSortList } from '@/constants/sort.constants'

import { ERole } from '@/types/user.types'

import { URL_PAGES } from '@/config/url.config'

import { useGetEvents } from '@/hooks/event/useGetEvents'
import { useFilters } from '@/hooks/useFilters'
import { useProfile } from '@/hooks/user/useProfile'

import styles from './index.module.scss'
import { eventService } from '@/services/events.service'

const EventsPage = () => {
  const { profile } = useProfile()
  const { queryParams, isFilterUpdated, reset } = useFilters()

  const { data, isFetching, refetch } = useGetEvents(
    queryParams,
    isFilterUpdated
  )

  useEffect(() => {
    reset()
  }, [])

  useEffect(() => {
    refetch()
  }, [queryParams])

  const events = data?.data?.items
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
              <Search placeholder='Поиск...' />
            </div>
            <div className={styles.sort}>
              <Sort data={eventSortList} />
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
                <>
                  <Link
                    href={URL_PAGES.CREATE_EVENT}
                    className={styles.create_event}
                    title='Новое мероприятие'
                  >
                    <CalendarPlus size={30} />
                  </Link>
                  <button
                    className={styles.getReport}
                    title='Скачать отчёт по мероприятиям'
                    onClick={() => eventService.getReport()}
                  >
                    <FileText size={30} />
                  </button>
                </>
              )}
            </div>
          </div>
          <FilterComponent
            isOpen={isOpenFilter}
            type='event'
            handleResetFilter={handleResetFilter}
          />
          <div className={styles.events_block}>
            {isFetching
              ? [...new Array(12)].map((_, i) => <EventCardSkeleton key={i} />)
              : !!events?.length &&
                events.map(event => (
                  <EventCard
                    key={event.eventId}
                    data={event}
                  />
                ))}
          </div>
          {!isFetching && !events?.length && (
            <div className={styles.not_found}>
              <h2>Мероприятия не были найдены</h2>
              <Button onClick={() => refetch()}>
                <p>Обновить</p>
              </Button>
            </div>
          )}
        </div>
      </div>
      <Pagination countPage={countPage > 1 ? countPage : 0} />
    </div>
  )
}

export default EventsPage
