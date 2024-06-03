import { RegisterBlock } from '@/components/screens/event-register-block/RegisterBlock'
import { Slider } from '@/components/screens/sliders/event-slider/Slider'
import { UndoBtn } from '@/components/ui/buttons/undo/UndoBtn'

import { IEvent } from '@/types/event.types'

import styles from './EventPage.module.scss'

interface IEventPage {
  event: IEvent | undefined
  userId: string | undefined
}

export const EventPage = ({ event, userId }: IEventPage) => {
  return (
    <div className={styles.content}>
      {event ? (
        <>
          <UndoBtn
            size={30}
            style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              zIndex: 1,
              backgroundColor: '#fff'
            }}
          />
          <Slider
            images={event?.images}
            style={{ borderRadius: '10px 10px 0px 0px' }}
          />
          <RegisterBlock
            date={event.eventDate}
            event={event}
            userId={userId}
            type={event.link ? 'link' : 'btn'}
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
            {event.totalTickets ? (
              <h3>Колличество билетов: {event.totalTickets}</h3>
            ) : (
              ''
            )}
            <h2>{event.title}</h2>
            <div className={styles.description}>
              {event?.description
                .split('\n')
                .filter(item => item !== '')
                ?.map((label, index) => <p key={index}>{label}</p>)}
            </div>
            <p>Организатор: {event.organizer}</p>
          </div>
        </>
      ) : (
        <p>nothing</p>
      )}
    </div>
  )
}
