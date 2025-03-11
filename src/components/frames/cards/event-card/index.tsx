'use client'

import { ArrowRight, Edit2, EyeOff, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { type FC, useState } from 'react'

import { ImageSlider } from '@/components/ui'

import { EStatus, type IEventCard } from '@/types/event.types'

import { useDeleteEvent } from '@/hooks/event/useDeleteEvent'
import { useProfile } from '@/hooks/user/useProfile'

import { ConfirmPopup } from '../../popups/confirm-popup'

import styles from './index.module.scss'

export const EventCard: FC<IEventCard> = ({ data, takePlaces }) => {
  const { title, places, categories, date, eventId, images, status } = data
  const { data: userData } = useProfile()

  const user = userData

  const { mutate: mutateEvent } = useDeleteEvent()

  const [isShow, setIsShow] = useState<boolean>(false)

  return (
    <>
      {isShow && (
        <ConfirmPopup
          onConfirm={() => {
            mutateEvent(eventId)
            setIsShow(false)
          }}
          onCancel={() => setIsShow(false)}
          message='Вы точно хотите удалить данное мероприятие?'
        />
      )}
      <div className={styles.card}>
        <Link
          className={styles.card_link}
          href={`/events/${eventId}`}
        />
        {user?.role === 'ADMIN' || user?.role === 'MODER' ? (
          <>
            {status === EStatus.INTERNAL && (
              <div className={styles.privateMark}>
                <EyeOff />
              </div>
            )}
            <div className={styles.menu}>
              <Link
                href={`/events/edit/${eventId}`}
                title='Редактировать'
                className={styles.edit}
              >
                <Edit2 />
              </Link>
              <button
                className={styles.trash}
                title='Удалить'
              >
                <Trash2 onClick={() => setIsShow(true)} />
              </button>
            </div>
          </>
        ) : null}
        <ImageSlider
          images={images}
          height={240}
          style={{ borderRadius: '10px 10px 0px 0px' }}
        />
        <div className={styles.info_block}>
          <p
            className={styles.title}
            title={title}
          >
            {title.length > 30 ? title.slice(0, 30) + '...' : title}
          </p>
          <div className={styles.categories}>
            {categories.map((category, i) => {
              if (i > 2) return

              return (
                <div
                  className={styles.category}
                  key={category.id}
                >
                  {i === 2 ? '...' : category.name}
                </div>
              )
            })}
          </div>
          <p className={styles.date}>
            Дата проведения:{' '}
            <span>
              {new Date(date).toLocaleDateString('ru-RU', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}
            </span>
          </p>
          <p className={styles.date}>
            Время проведения:{' '}
            <span>
              {new Date(date).toLocaleTimeString('ru-RU', {
                hour: 'numeric',
                minute: 'numeric'
              })}
            </span>
          </p>
          {takePlaces && (
            <p className={styles.places}>
              Мест взято <span>{takePlaces}</span>
            </p>
          )}
          <p className={styles.places}>
            Мест осталось: <span>{places}</span>
          </p>

          <Link
            href={`/events/${eventId}`}
            className={styles.details}
          >
            Подробнее
            <ArrowRight
              size={20}
              className={styles.arrow}
            />
          </Link>
        </div>
      </div>
    </>
  )
}
