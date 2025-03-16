import { Button } from '@/components/ui'

import type { IEvent } from '@/types/event.types'

import styles from './index.module.scss'

interface IRegisterBlock {
  date: string
  event: IEvent
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>
  isPending: boolean
  isSuccess: boolean
  isError: boolean
}

export const RegisterBlock = ({
  date,
  event,
  setIsShow,
  isError,
  isPending,
  isSuccess
}: IRegisterBlock) => {
  const { places } = event

  return (
    <div className={styles.event_card}>
      <div className={styles.top}>
        <div className={styles.event_date}>
          {new Date(date).toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long'
          })}
        </div>
        <div className={styles.event_details}>
          <div className={styles.event_day}>
            {new Date(date)
              .toLocaleDateString('ru-RU', {
                weekday: 'short'
              })
              .toUpperCase()}
          </div>
          <div className={styles.event_date_full}>
            {new Date(date).toLocaleDateString('ru-RU', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </div>
          <div className={styles.event_time}>
            {new Date(date).toLocaleTimeString('ru-RU', {
              hour: 'numeric',
              minute: 'numeric',
              timeZone: 'UTC'
            })}{' '}
            МСК
          </div>
        </div>
      </div>
      <div className={styles.line}></div>
      <Button
        onClick={() => setIsShow(true)}
        className={styles.button}
        isPending={isPending}
        isError={isError}
        isSuccess={isSuccess}
        disabled={places === 0}
        style={{ width: '200px', fontSize: '20px' }}
      >
        <p>
          {places === 0
            ? 'Больше нет мест на мероприятие'
            : 'Хочу учавствовать'}
        </p>
      </Button>
    </div>
  )
}
