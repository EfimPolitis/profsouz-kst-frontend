import { AuthForm } from '@/components/frames'
import { UndoBtn } from '@/components/ui'

import { URL_PAGES } from '@/config/url.config'

import styles from './index.module.scss'

const EditUserPage = () => {
  return (
    <div className={styles.page}>
      <UndoBtn
        size={30}
        style={{ position: 'absolute', top: '10px', left: '10px' }}
      />
      <AuthForm isEditing />
    </div>
  )
}

export default EditUserPage
