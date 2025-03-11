'use client'

import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { type PropsWithChildren, useState } from 'react'

import { Submenu } from '@/components/screens/admin/sidebar/Sidebar'

import styles from '@/scss/admin/layout.module.scss'

const AdminLayout = ({ children }: PropsWithChildren<unknown>) => {
  const [isOpenPanel, setIsOpenPanel] = useState(true)
  return (
    <div className={styles.layout}>
      <Submenu isOpenPanel={isOpenPanel} />
      {isOpenPanel ? (
        <button
          className={styles.panelButton}
          onClick={() => setIsOpenPanel(false)}
          title='Закрыть панель'
        >
          <PanelLeftClose size={24} />
        </button>
      ) : (
        <button
          className={styles.panelButton}
          onClick={() => setIsOpenPanel(true)}
          title='Открыть панель'
        >
          <PanelLeftOpen size={24} />
        </button>
      )}
      <div className={styles.page}>{children}</div>
    </div>
  )
}

export default AdminLayout
