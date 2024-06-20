import { AuthForm } from '@/components/screens/form/auth-form/AuthForm'
import { UndoBtn } from '@/components/ui/buttons/undo/UndoBtn'

import styles from '@/scss/admin/users/create-user.module.scss'

const CreateUser = () => {
  return (
    <div className={styles.page}>
      <UndoBtn
        size={30}
        style={{ position: 'absolute', top: '10px', left: '10px' }}
      />
      <AuthForm isLogin={false} />
    </div>
  )
}
export default CreateUser
