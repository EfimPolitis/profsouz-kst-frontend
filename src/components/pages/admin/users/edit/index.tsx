import { AuthForm } from '@/components/frames'
import { UndoBtn } from '@/components/ui'

import styles from './index.module.scss'

const EditUserPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <UndoBtn size={30} />
        <AuthForm type='edit' />
      </div>
    </div>
  )
}

export default EditUserPage
