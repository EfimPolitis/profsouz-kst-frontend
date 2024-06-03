'use client'

import { UseMutateFunction } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import cn from 'clsx'
import { Edit2, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

import Loader from '@/components/ui/loader/Loader'

import { IUser } from '@/types/user.types'

import { DASHBOARD_PAGES } from '@/config/page-url.config'

interface ITableField {
  styles: any
  user: IUser
  count: number
  deleteUser: UseMutateFunction<AxiosResponse<any, any>, Error, string, unknown>
  isPending: boolean
}

export const TableField = ({
  styles,
  user,
  count,
  deleteUser,
  isPending
}: ITableField) => {
  const { push } = useRouter()

  const roles = new Map()
  roles.set('ADMIN', 'Админ')
  roles.set('USER', 'Пользователь')
  roles.set('MODER', 'Модер')

  return (
    <tr>
      <td>{count + 1}</td>
      <td>{user.userName}</td>
      <td>{roles.get(user.role)}</td>
      <td>{`${user.lastName} ${user.firstName} ${user.middleName}`}</td>
      <td>{user.email}</td>
      <td>{user.createdAt.slice(0, 10)}</td>
      <td>{user.updatedAt.slice(0, 10)}</td>
      {isPending ? (
        <Loader
          size={30}
          style={{ position: 'relative', top: '10px', right: '10px' }}
        />
      ) : (
        <td className={styles.menu}>
          <button
            className={cn(styles.btn, styles.edit)}
            title='Редактировать'
            onClick={() => push(`${DASHBOARD_PAGES.EDIT_USER}/${user.userId}`)}
          >
            <Edit2 />
          </button>
          <button
            className={cn(styles.btn, styles.trash)}
            title='Удалить'
            onClick={() =>
              confirm('Вы действительно хотите удалить пользователя?') &&
              deleteUser(user.userId)
            }
          >
            <Trash2 />
          </button>
        </td>
      )}
    </tr>
  )
}
