import Loader from '@/components/ui/loader/Loader'

import { IReservation } from '@/types/reservation.types'

import styles from './Table.module.scss'

interface IReservationTable {
  reservations: IReservation[] | undefined
  isLoading: boolean
}

export const ReservationTable = ({
  reservations,
  isLoading
}: IReservationTable) => {
  return (
    <div className={styles.table_container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <td></td>
            <td>Пользователь</td>
            <td>Мероприятие</td>
            <td>Количество билетов</td>
            <td>Зарегестрированно</td>
          </tr>
        </thead>
        <tbody>
          {isLoading ||
            reservations?.map((reservation, i) => (
              <tr key={reservation.id}>
                <td>{i + 1}</td>
                <td>{reservation.user.userName}</td>
                <td>{reservation.events.title}</td>
                <td>{reservation.ticketsCount}</td>
                <td>{reservation.createdAt.slice(0, 10)}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className={styles.loader}>
        {isLoading ? (
          <Loader
            size={30}
            style={{ position: 'relative', top: '20px' }}
          />
        ) : reservations?.length ? (
          ''
        ) : (
          'Здесь пока ничего нету'
        )}
      </div>
    </div>
  )
}
