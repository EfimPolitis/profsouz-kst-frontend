'use client'

import { Loader } from '@/components/ui'

import type { IUser } from '@/types/user.types'

import { useFiltersStore } from '@/store/store'

import { UserTableRow } from '../row'

import styles from './index.module.scss'

interface IUserTable {
  users: IUser[] | undefined
  isLoading: boolean
}

export const UserTable = ({ users, isLoading }: IUserTable) => {
  const countPage = useFiltersStore.getState().queryParams.page

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
              key={user.userId}
              user={user}
              count={(countPage - 1) * 10 + count + 1}
            />
          ))}
        </tbody>
      </table>
      <div className={styles.info}>
        {isLoading ? (
          <Loader size={30} />
        ) : users?.length ? (
          ''
        ) : (
          <h2 className=''>Пользователи не были найдены</h2>
        )}
      </div>
    </div>
  )
}
