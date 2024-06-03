import cn from 'clsx'
import { Check, X } from 'lucide-react'
import { memo, useEffect } from 'react'

import Loader from '@/components/ui/loader/Loader'

import { EStatus, IApplication } from '@/types/application.types'

import { useSendStatus } from '@/hooks/application/useSendStatus'

interface ITableField {
  application: IApplication
  count: number
  styles: any
}

export const TableField = memo(
  ({ application, count, styles }: ITableField) => {
    const { mutate, isPending, isSuccess } = useSendStatus()
    const sendStatus = (data: { status: string; id: string }) => {
      mutate(data)
    }

    useEffect(() => {}, [isPending, isSuccess])

    return (
      <tr>
        <td>{count + 1}</td>
        <td>{`${application.user.lastName} ${application.user.firstName} ${application.user.middleName}`}</td>
        <td>{application.events.title}</td>
        <td>{EStatus[application.status]}</td>
        <td>{application.ticketsCount}</td>
        <td>{application.createdAt.slice(0, 10)}</td>
        <td>{application.updatedAt.slice(0, 10)}</td>
        {isPending ? (
          <Loader
            size={30}
            style={{ position: 'relative', top: '10px', right: '10px' }}
          />
        ) : (
          application.status === 'PENDING' && (
            <td className={styles.menu}>
              <button
                className={cn(styles.approve, styles.btn)}
                title='Принять'
                onClick={() =>
                  sendStatus({ status: 'APPROVED', id: application.id })
                }
              >
                <Check />
              </button>
              <button
                className={cn(styles.reject, styles.btn)}
                title='Отклонить'
                onClick={() =>
                  sendStatus({ status: 'REJECTED', id: application.id })
                }
              >
                <X />
              </button>
            </td>
          )
        )}
      </tr>
    )
  }
)

TableField.displayName = 'applicationTableField'
