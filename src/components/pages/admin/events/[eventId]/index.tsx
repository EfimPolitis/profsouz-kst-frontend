'use client'

import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

import { BookingPopup } from '@/components/frames'
import { RegisterBlock } from '@/components/frames/event-register-block'
import { UndoBtn } from '@/components/ui'
import { ImageSlider } from '@/components/ui/sliders/image-slider'

import { URL_PAGES } from '@/config/url.config'

import { useBookingStore } from '@/store/store'

import { useCreateApplication } from '@/hooks/application/useCreateApplication'
import { useGetEventById } from '@/hooks/event/useGetEventById'
import { useOutside } from '@/hooks/useOutside'
import { useProfile } from '@/hooks/user/useProfile'

import styles from './index.module.scss'
import EventPageSkeleton from './index.skeleton'

export const EventPageId = () => {
  const { eventId } = useParams() as { eventId: string }

  const { data, refetch } = useGetEventById(eventId)
  const { data: user } = useProfile()

  const event = data?.data
  const userId = user?.userId

  const {
    mutate: mutateApplication,
    isPending,
    isSuccess,
    isError,
    reset
  } = useCreateApplication()

  if (isSuccess || isError) setTimeout(() => reset(), 1500)

  useEffect(() => {
    refetch()
  }, [isPending])

  const { isShow, setIsShow } = useOutside(false)

  const handleConfirm = () => {
    const count = useBookingStore.getState().count

    if (!userId) {
      return toast.error('Не удалост получить id пользователя')
    }

    if (!eventId || !event) {
      return toast.error('Не удалост получить мероприятие')
    }

    if (!count) return toast.error('Колличество мест не выбрано')

    const { places } = event

    if (places < count)
      return toast.error(
        'Вы не можете забронировать мест больше чем есть в наличии!'
      )

    const responseData = { eventId, userId, places: count }

    mutateApplication(responseData)

    useBookingStore.getState().setCount(0)

    setIsShow(false)

    return
  }

  return (
    <div className={styles.page}>
      {isShow && (
        <BookingPopup
          onConfirm={handleConfirm}
          onClose={() => setIsShow(false)}
        />
      )}
      {!isPending ? (
        <div className={styles.content}>
          {event ? (
            <>
              <UndoBtn
                size={30}
                style={{
                  position: 'absolute',
                  top: '0px',
                  left: '-60px',
                  zIndex: '1'
                }}
              />
              <ImageSlider
                height={500}
                images={event?.images}
                style={{ borderRadius: '10px 10px 0px 0px' }}
              />
              <RegisterBlock
                date={event.date}
                event={event}
                userId={userId}
                setIsShow={setIsShow}
                isError={isError}
                isPending={isPending}
                isSuccess={isSuccess}
              />
              <div className={styles.info_block}>
                <div className={styles.categories}>
                  {event.categories.map(category => (
                    <div
                      className={styles.category}
                      key={category.id}
                    >
                      {category.name}
                    </div>
                  ))}
                </div>
                {event.places ? (
                  <h3>Колличество оставшихся мест: {event.places}</h3>
                ) : (
                  ''
                )}
                <h2>{event.title}</h2>
                <div className={styles.description}>
                  {event?.description
                    .split('\n')
                    ?.map((label, index) => <p key={index}>{label}</p>)}
                </div>
                <p>Организатор: {event.organizer}</p>
              </div>
            </>
          ) : (
            <p>Кажется что данного мероприятия уже нет...</p>
          )}
        </div>
      ) : (
        <EventPageSkeleton />
      )}
    </div>
  )
}
