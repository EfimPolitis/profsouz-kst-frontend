'use client'

import { useParams } from 'next/navigation'

import { EventPage } from '@/components/pages/event-page/EventPage'
import EventPageSkeleton from '@/components/pages/event-page/EventPageSkeleton'

import { useGetEventById } from '@/hooks/event/useGetEventById'
import { useProfile } from '@/hooks/user/useProfile'

import styles from './EventPage.module.scss'

const Page = () => {
  const { eventId } = useParams() as { eventId: string }

  const { data, isPending } = useGetEventById(eventId)
  const { data: user } = useProfile()

  const event = data?.data
  const userId = user?.userId

  return (
    <div className={styles.page}>
      {isPending ? (
        <EventPageSkeleton />
      ) : (
        <EventPage
          event={event}
          userId={userId}
        />
      )}
    </div>
  )
}

export default Page
