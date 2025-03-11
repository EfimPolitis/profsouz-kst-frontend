'use client'

import { useEffect, useState } from 'react'

import Layout from '@/components/layout/Layout'
import { EventCard } from '@/components/screens/card/EventCard'
import { EventCardSkeleton } from '@/components/screens/card/EventCardSkeleton'
import { Search } from '@/components/ui/fields/search/Search'
import { Pagination } from '@/components/ui/pagination/Pagination'
import { Sort } from '@/components/ui/sort/Sort'

import { eventSortList } from '@/constants/sort.constants'

import { EType } from '@/types/sort.types'

import { useGetEvents } from '@/hooks/event/useGetEvents'
import { useDebounce } from '@/hooks/useDebounce'

import styles from '@/scss/events/events.module.scss'

const EventsPage = () => {
  const [type, setType] = useState<EType>(EType.asc)
  const [sort, setSort] = useState(eventSortList[0])
  const [debounceSearch, search, setSearch] = useDebounce('', 500)
  const [page, setPage] = useState(0)

  const { data, isLoading, refetch } = useGetEvents({
    search,
    page,
    sort,
    type
  })

  const events = data?.data?.items
  const countPage = data?.data?.countPage

  useEffect(() => {
    refetch()
  }, [debounceSearch, page, sort, type, refetch])

  return (
    <Layout>
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
          </div>
          <div className={styles.events_block}>
            {isLoading
              ? [...new Array(6)].map((_, i) => <EventCardSkeleton key={i} />)
              : events?.length
                ? events.map(event => (
                    <EventCard
                      key={event.eventId}
                      data={event}
                      type={event.link.length > 0 ? 'link' : 'noLink'}
                    />
                  ))
                : 'Мероприятия отстутсвуют'}
          </div>
        </div>
        <Pagination
          countPage={countPage || 0}
          value={page}
          setValue={setPage}
        />
      </div>
    </Layout>
  )
}

export default EventsPage
