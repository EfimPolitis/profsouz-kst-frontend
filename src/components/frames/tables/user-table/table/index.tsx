'use client'

import type { IUser } from '@/types/user.types'

import { useFilters } from '@/hooks/useFilters'

import { UserTableRow } from '../row'

import styles from './index.module.scss'

interface IUserTable {
  users: IUser[] | undefined
}

export const UserTable = ({ users }: IUserTable) => {
  const { queryParams } = useFilters()
  const countPage = Number(queryParams?.page)

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
            <UserTableRow
              key={user.userName}
              user={user}
              count={(countPage - 1) * 10 + count + 1}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}
