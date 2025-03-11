import type { Metadata } from 'next'

import { EventForm } from '@/components/frames'
import EditEventPage from '@/components/pages/admin/events/edit'
import { UndoBtn } from '@/components/ui'

import styles from '@/styles/admin/events/edit-event.module.scss'

export const metadata: Metadata = {
  title: 'Редактирование мероприятия',
  description: ''
}

const Page = () => <EditEventPage />

export default Page
