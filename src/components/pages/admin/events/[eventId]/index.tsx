'use client'

import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

import { BookingPopup } from '@/components/frames'
import { RegisterBlock } from '@/components/frames/event-register-block'
import { Button, UndoBtn } from '@/components/ui'
import { ImageSlider } from '@/components/ui/sliders/image-slider'

import { useBookingStore } from '@/store/store'

import { useCreateApplication } from '@/hooks/application/useCreateApplication'
import { useGetEventById } from '@/hooks/event/useGetEventById'
import { useOutside } from '@/hooks/useOutside'
import { useProfile } from '@/hooks/user/useProfile'

import styles from './index.module.scss'
import EventPageSkeleton from './index.skeleton'

export const EventPageId = () => {
  const { eventId } = useParams() as { eventId: string }

  const { data, refetch, isLoading } = useGetEventById(eventId)
  const { data: user } = useProfile()

  const event = data?.data
  const userName = user?.userName

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

    if (!userName) {
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

    const responseData = { eventId, userName, places: count }

    mutateApplication(responseData)

    useBookingStore.getState().setCount(0)

    setIsShow(false)

    return
  }

  return (
    <div className={styles.page}>
      <UndoBtn
        size={30}
        style={{
          position: 'absolute',
          top: '50px',
          left: '520px',
          zIndex: '1'
        }}
      />
      {isShow && (
        <BookingPopup
          onConfirm={handleConfirm}
          onClose={() => setIsShow(false)}
        />
      )}
      {!isLoading ? (
        <div className={styles.content}>
          {event ? (
            <>
              <ImageSlider
                height={800}
                images={event?.images}
                style={{
                  borderRadius: '10px 10px 10px 10px'
                }}
              />
              <RegisterBlock
                date={event.date}
                event={event}
                setIsShow={setIsShow}
                isError={isError}
                isPending={isPending}
                isSuccess={isSuccess}
              />
              <div className={styles.info_block}>
                <h1>{event.title}</h1>
                <hr />
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
                {event.places && (
                  <div className={styles.row}>
                    <h3>
                      Колличество оставшихся мест: <span>{event.places}</span>
                    </h3>
                  </div>
                )}
                {event.address && (
                  <div className={styles.row}>
                    <h3>
                      Место регистрации: <span>{event.address}</span>
                    </h3>
                  </div>
                )}
                {event.organizer && (
                  <div className={styles.row}>
                    <h3>
                      Организатор: <span>{event.organizer}</span>
                    </h3>
                  </div>
                )}
                <div className={styles.row}>
                  <h2>Описание</h2>
                </div>
                <div className={styles.description}>
                  {event?.description
                    .split('\n')
                    ?.map((label, index) => <p key={index}>{label}</p>)}
                </div>
                <Button
                  onClick={() => setIsShow(true)}
                  className={styles.button}
                  isPending={isPending}
                  isError={isError}
                  isSuccess={isSuccess}
                  disabled={event.places === 0}
                  style={{ width: '280px', fontSize: '20px' }}
                >
                  <p>
                    {event.places === 0
                      ? 'Больше нет мест на мероприятие'
                      : 'Хочу учавствовать'}
                  </p>
                </Button>
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
