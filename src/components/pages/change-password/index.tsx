'use client'

import { ChangePasswordForm } from '@/components/frames'
import { UndoBtn } from '@/components/ui'

import styles from './index.module.scss'

const ChangePasswordPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <UndoBtn size={30} />
        <ChangePasswordForm />
      </div>
    </div>
  )
}

export default ChangePasswordPage
