import type { PropsWithChildren } from 'react'

import { Submenu } from '@/components/screens/admin/submenu/Submenu'

import styles from './layout.module.scss'

const AdminLayout = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <div className={styles.layout}>
      <Submenu />
      <div className={styles.page}>{children}</div>
    </div>
  )
}

export default AdminLayout
