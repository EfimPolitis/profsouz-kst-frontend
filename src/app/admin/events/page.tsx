'use client'

import { CalendarPlus, FileText } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { EventCard } from '@/components/screens/card/EventCard'
import { EventCardSkeleton } from '@/components/screens/card/EventCardSkeleton'
import { Search } from '@/components/ui/fields/search/Search'
import { Pagination } from '@/components/ui/pagination/Pagination'
import { Sort } from '@/components/ui/sort/Sort'

import { eventSortList } from '@/constants/sort.constants'

import { EType } from '@/types/sort.types'

import { DASHBOARD_PAGES } from '@/config/page-url.config'

import { useGetEvents } from '@/hooks/event/useGetEvents'
import { useDebounce } from '@/hooks/useDebounce'

import styles from './Events.module.scss'

const ManageEvent = () => {
  const [type, setType] = useState<EType>(EType.asc)
  const [sort, setSort] = useState(eventSortList[0])
  const [page, setPage] = useState(0)
  const [debounceSearch, search, setSearch] = useDebounce('', 500)

  const { data, isFetching, refetch } = useGetEvents({
    page,
    search,
    sort,
    type
  })

  useEffect(() => {
    refetch()
  }, [debounceSearch, page, sort, type, refetch])

  const events = data?.data?.items
  const countPage = data?.data?.countPage

  return (
    <div className={styles.event_page}>
      <div>
        <div className={styles.top}>
          <Search
            placeholder='Поиск...'
            value={search}
            setValue={setSearch}
          />
          <Sort
            list={eventSortList}
            sort={sort}
            setSort={setSort}
            type={type}
            setType={setType}
          />
          <Link
            href={DASHBOARD_PAGES.CREATE_EVENT}
            className={styles.create_event}
            title='Новое мероприятие'
          >
            <CalendarPlus size={30} />
          </Link>
          <button
            className={styles.getReport}
            title='Скачать отчёт'
          >
            <FileText size={30} />
          </button>
        </div>
        <div className={styles.events_block}>
          {isFetching
            ? [...new Array(6)].map((_, i) => <EventCardSkeleton key={i} />)
            : !!events?.length &&
              events.map(event => (
                <EventCard
                  key={event.eventId}
                  data={event}
                  type={event.link.length > 0 ? 'link' : 'noLink'}
                />
              ))}
        </div>

        {!isFetching && !events?.length && (
          <h3 className={styles.not_found}>Мероприятия не найденны</h3>
        )}
      </div>
      <Pagination
        countPage={countPage || 0}
        value={page}
        setValue={setPage}
      />
    </div>
  )
}

export default ManageEvent
