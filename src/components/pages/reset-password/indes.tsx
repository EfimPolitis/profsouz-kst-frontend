'use client'

import { ResetPasswordForm } from '@/components/frames'
import { UndoBtn } from '@/components/ui'

import styles from './index.module.scss'

const ResetPasswordPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <UndoBtn />
        <ResetPasswordForm />
      </div>
    </div>
  )
}

export default ResetPasswordPage
