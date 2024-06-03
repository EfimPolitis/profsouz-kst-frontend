import type { Metadata } from 'next'

import { EventForm } from '@/components/screens/form/event-form/EventForm'
import { UndoBtn } from '@/components/ui/buttons/undo/UndoBtn'

import styles from './EditEvent.module.scss'

export const metadata: Metadata = {
  title: 'Редактирование мероприятия',
  description: ''
}

const EditEventPage = () => {
  return (
    <div className={styles.page}>
      <UndoBtn
        size={30}
        style={{ position: 'absolute', top: '10px', left: '10px' }}
      />
      <EventForm isEditing />
    </div>
  )
}

export default EditEventPage
