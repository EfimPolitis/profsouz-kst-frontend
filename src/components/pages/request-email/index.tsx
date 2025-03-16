'use client'

import { RequestResetForm } from '@/components/frames'
import { UndoBtn } from '@/components/ui'

import styles from './index.module.scss'

const RequestEmailPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <UndoBtn />
        <RequestResetForm />
      </div>
    </div>
  )
}

export default RequestEmailPage
