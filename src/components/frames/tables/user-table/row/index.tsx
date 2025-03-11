'use client'

import cn from 'clsx'
import { Edit2, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { ConfirmPopup } from '@/components/frames'
import { Loader } from '@/components/ui'

import { roles } from '@/constants/roles.constants'

import type { IUser } from '@/types/user.types'

import { URL_PAGES } from '@/config/url.config'

import { useDeleteUser } from '@/hooks/user/useDeleteUser'
import { useProfile } from '@/hooks/user/useProfile'

import styles from './index.module.scss'

interface ITableField {
  user: IUser
  count: number
}

export const UserTableRow = ({ user, count }: ITableField) => {
  const { push } = useRouter()
  const { data } = useProfile()

  const userId = data?.userId

  const { deleteUser, isPending } = useDeleteUser()
  const [isShow, setIsShow] = useState<boolean>(false)

  return (
    <>
      {isShow && (
        <ConfirmPopup
          onConfirm={() => {
            deleteUser(user.userId)
            setIsShow(false)
          }}
          onCancel={() => setIsShow(false)}
          message='Вы точно хотите удалить данного пользователя?'
        />
      )}
      <tr className={styles.row}>
        <td className={styles.count}>{count}</td>
        <td>{user.userName}</td>
        <td>{roles[user.role]}</td>
        <td>{`${user.lastName} ${user.firstName}`}</td>
        <td>{user.email}</td>
        <td className={styles.date}>{user.createdAt.slice(0, 10)}</td>
        <td className={styles.date}>{user.updatedAt.slice(0, 10)}</td>
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
              onClick={() => push(`${URL_PAGES.EDIT_USER}/${user.userId}`)}
            >
              <Edit2 />
            </button>
            {userId !== user.userId && (
              <button
                className={cn(styles.btn, styles.trash)}
                title='Удалить'
                onClick={() => {
                  setIsShow(true)
                }}
              >
                <Trash2 />
              </button>
            )}
          </td>
        )}
      </tr>
    </>
  )
}
