import { NewsForm } from '@/components/frames'
import { UndoBtn } from '@/components/ui'

import styles from './index.module.scss'

const EditNewsPage = () => {
  return (
    <div className={styles.page}>
      <UndoBtn
        size={30}
        style={{ position: 'absolute', top: '10px', left: '10px' }}
      />
      <NewsForm isEditing />
    </div>
  )
}

export default EditNewsPage
