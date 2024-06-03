import Loader from '@/components/ui/loader/Loader'

import { IUser } from '@/types/user.types'

import { useDeleteUser } from '@/hooks/user/useDeleteUser'

import { TableField } from './TableField'

interface IUserTable {
  styles: any
  users: IUser[] | undefined
  isLoading: boolean
}

export const UserTable = ({ styles, users, isLoading }: IUserTable) => {
  const { deleteUser, isPending } = useDeleteUser()

  return (
    <div className={styles.table_container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <td></td>
            <td>Пользователь</td>
            <td>Роль</td>
            <td>ФИО</td>
            <td>Почта</td>
            <td>Создан</td>
            <td>Обновлён</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, count) => (
            <TableField
              key={user.userId}
              styles={styles}
              user={user}
              count={count}
              deleteUser={deleteUser}
              isPending={isPending}
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
        ) : users?.length ? (
          ''
        ) : (
          'Ничего нету'
        )}
      </div>
    </div>
  )
}
