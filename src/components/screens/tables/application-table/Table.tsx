import Loader from '@/components/ui/loader/Loader'

import { IApplication } from '@/types/application.types'

import styles from './Table.module.scss'
import { TableField } from './TableField'

interface IApplicationTable {
  applications: IApplication[] | undefined
  isLoading: boolean
}

export const ApplicationTable = ({
  applications,
  isLoading
}: IApplicationTable) => {
  return (
    <div className={styles.table_container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <td></td>
            <td>ФИО</td>
            <td>Мероприятие</td>
            <td>Статус</td>
            <td>Количество билетов</td>
            <td>Создан</td>
            <td>Обновлён</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {isLoading ||
            applications?.map((application, count) => (
              <TableField
                application={application}
                key={application.id}
                count={count}
                styles={styles}
              />
            ))}
        </tbody>
      </table>
      <div className={styles.loader}>
        {isLoading ? (
          <Loader
            size={30}
            style={{ position: 'relative', top: '20px' }}
          />
        ) : applications?.length ? (
          ''
        ) : (
          'Здесь пока ничего нету'
        )}
      </div>
    </div>
  )
}
