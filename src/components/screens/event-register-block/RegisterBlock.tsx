import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/buttons/button/Button'

import { day, month } from '@/constants/date.constants'

import { IEvent } from '@/types/event.types'

import { useCreateApplication } from '@/hooks/application/useCreateApplication'

import styles from './RegisterBlock.module.scss'

interface IRegisterBlock {
  date: string
  event: IEvent
  userId: string | undefined
  type: string
}

export const RegisterBlock = ({
  date,
  event,
  userId,
  type
}: IRegisterBlock) => {
  const { back } = useRouter()
  const time = new Date(date)
  const { totalTickets, link } = event

  const {
    mutate: mutateApplication,
    isPending,
    isSuccess,
    isError
  } = useCreateApplication()

  const onClickBtn = (eventId: string, userId: string | undefined) => {
    if (!userId) return

    const count = prompt(
      `Сколько вы хотите взять билетов?\nОсталось билетов: ${event.totalTickets}`
    )

    if (!count) return

    if (totalTickets < Number(count))
      return alert('Вы не можете взять билетов больше чем есть в наличии!')

    const ticketsCount = Number(count)
    const responseData = { eventId, userId, ticketsCount }

    mutateApplication(responseData)

    if (isSuccess) back()
    else if (isError)
      alert('Произошла ошибка, не получилось подать заявку на мероприятие!')
  }
  return (
    <div className={styles.event_card}>
      <div className={styles.top}>
        <div className={styles.event_date}>
          <div className={styles.date_day}>{time.getDate()}</div>
          <div className={styles.date_month}>{month[time.getMonth()]}</div>
        </div>
        <div className={styles.event_details}>
          <div className={styles.event_day}>{day[time.getDay() - 1]}</div>
          <div className={styles.event_date_full}>
            {time.getDate()} {month[time.getMonth()]}, {time.getFullYear()}
          </div>
          <div className={styles.event_time}>
            Время: {time.getHours()}:
            {time.getMinutes() > 10
              ? time.getMinutes()
              : '' + time.getMinutes()}{' '}
            МСК
          </div>
        </div>
      </div>
      <div className={styles.line}></div>
      {type === 'link' ? (
        <p>
          Для регистрации
          <br />
          <Link
            href={link}
            className={styles.link}
          >
            заполните форму
          </Link>
        </p>
      ) : (
        <Button
          text={
            totalTickets === 0
              ? 'Все билеты уже забронированны'
              : 'Забронировать'
          }
          onClick={() => onClickBtn(event?.eventId, userId)}
          className={styles.button}
          isPending={isPending}
          isError={isError}
          isSuccess={isSuccess}
          disabled={totalTickets === 0}
          style={{ width: '200px', fontSize: '20px' }}
        />
      )}
    </div>
  )
}
