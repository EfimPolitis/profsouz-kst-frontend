import type { Metadata } from 'next'

import { AuthForm } from '@/components/screens/form/auth-form/AuthForm'
import { UndoBtn } from '@/components/ui/buttons/undo/UndoBtn'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import styles from '@/scss/admin/users/edit-user.module.scss'

export const metadata: Metadata = {
  title: 'Редактирование пользователя',
  ...NO_INDEX_PAGE
}

const EditPage = () => {
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

export default EditPage
