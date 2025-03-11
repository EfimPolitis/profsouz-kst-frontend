'use client'

import { useEffect, useState } from 'react'

import Layout from '@/components/layout/Layout'
import { EventCard } from '@/components/screens/card/EventCard'
import { EventCardSkeleton } from '@/components/screens/card/EventCardSkeleton'
import { Pagination } from '@/components/ui/pagination/Pagination'

import { useReservationEventsByUserId } from '@/hooks/reservation/useReservationEventsByUserId'
import { useProfile } from '@/hooks/user/useProfile'

import styles from '@/scss/my-events/my-events.module.scss'

const MyEventsPage = () => {
  const [page, setPage] = useState(0)

  const { data: user } = useProfile()
  const userId = user?.userId || ''
  const { data, isLoading, refetch } = useReservationEventsByUserId(userId)

  const reservations = data?.data?.items
  const countPage = data?.data?.countPage

  console.log(reservations)

  useEffect(() => {
    refetch()
  }, [page, refetch])

  return (
    <Layout>
      <div className={styles.page}>
        <div className={styles.content}>
          <h2>Мои мероприятия</h2>
          <div className={styles.events_block}>
            {isLoading
              ? [...new Array(6)].map((_, i) => <EventCardSkeleton key={i} />)
              : reservations?.length
                ? reservations.map(reservation => (
                    <EventCard
                      key={reservation.events.eventId}
                      data={reservation.events}
                      type={
                        reservation.events.link.length > 0 ? 'link' : 'noLink'
                      }
                      ticketsCount={reservation.ticketsCount}
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

export default MyEventsPage
