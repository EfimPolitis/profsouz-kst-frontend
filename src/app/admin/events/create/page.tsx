import type { Metadata } from 'next'

import { EventForm } from '@/components/screens/form/event-form/EventForm'
import { UndoBtn } from '@/components/ui/buttons/undo/UndoBtn'

import styles from '@/scss/admin/events/create-event.module.scss'

export const metadata: Metadata = {
  title: 'Создание мероприятия',
  description: ''
}

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
