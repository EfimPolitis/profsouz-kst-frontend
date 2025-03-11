import { EventForm } from '@/components/frames'
import { UndoBtn } from '@/components/ui'

import { URL_PAGES } from '@/config/url.config'

import styles from './index.module.scss'

const CreateEventPage = () => {
  return (
    <div className={styles.page}>
      <UndoBtn
        size={30}
        style={{ position: 'absolute', top: '10px', left: '10px' }}
      />
      <EventForm />
    </div>
  )
}

export default CreateEventPage
