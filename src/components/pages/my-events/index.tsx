'use client'

import { EventCard, EventCardSkeleton, Header } from '@/components/frames'
import { Button, Loader } from '@/components/ui'

import { useGetApplicationsByUserId } from '@/hooks/application/useGetApplicationsByUserId'
import { useProfile } from '@/hooks/user/useProfile'

import styles from './index.module.scss'

const MyEventsPage = () => {
  const { profile } = useProfile()
  const userId = profile?.userId

  const { data, isFetching, refetch } = useGetApplicationsByUserId(userId)
  const items = data?.data.items

  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <div className={styles.events_block}>
          {isFetching
            ? [...new Array(12)].map((_, i) => <EventCardSkeleton key={i} />)
            : !!items?.length &&
              items.map(item => (
                <EventCard
                  key={item.event.eventId}
                  data={item.event}
                  takePlaces={item.takePlaces}
                />
              ))}
        </div>
        {isFetching ? (
          <div className={styles.not_found}>
            <Loader size={50} />
          </div>
        ) : (
          !!items?.length || (
            <div className={styles.not_found}>
              <h2>Мероприятия не были найдены</h2>
              <Button onClick={() => refetch()}>
                <p>Обновить</p>
              </Button>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default MyEventsPage
