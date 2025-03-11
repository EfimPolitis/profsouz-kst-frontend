'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

import { EventCard, EventCardSkeleton, Header } from '@/components/frames'

import { URL_PAGES } from '@/config/url.config'

import { useGetApplicationsByUserId } from '@/hooks/application/useGetApplicationsByUserId'
import { useProfile } from '@/hooks/user/useProfile'

import styles from './index.module.scss'

const MyEventsPage = () => {
  const { push } = useRouter()
  const { data: userData } = useProfile()
  const userId = userData?.userId

  const { data, isFetching } = useGetApplicationsByUserId(userId ?? '')
  const events = data?.data.items

  useEffect(() => {
    if (!userId) {
      push(URL_PAGES.HOME)
      toast.error('Отсутствует userId')
    }
  }, [userId, push])

  return (
    <>
      <Header />
      <div className={styles.page}>
        <div className={styles.wrap}>
          <div className={styles.events_block}>
            {isFetching
              ? [...new Array(12)].map((_, i) => <EventCardSkeleton key={i} />)
              : !!events?.length &&
                events.map(event => (
                  <EventCard
                    key={event.event.eventId}
                    //@ts-ignore
                    data={event.event}
                    takePlaces={event.takePlaces}
                  />
                ))}
          </div>
          {!isFetching && !events?.length && (
            <h3
              className={styles.not_found}
              style={{ position: 'relative', top: '0px' }}
            >
              Мероприятия не были найденны
            </h3>
          )}
        </div>
      </div>
    </>
  )
}

export default MyEventsPage
