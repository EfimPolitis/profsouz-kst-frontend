import type { Metadata } from 'next'

import { EventForm } from '@/components/frames'
import CreateEventPage from '@/components/pages/admin/events/create'
import { UndoBtn } from '@/components/ui'

import styles from '@/styles/admin/events/create-event.module.scss'

export const metadata: Metadata = {
  title: 'Создание мероприятия',
  description: ''
}

const Page = () => <CreateEventPage />

export default Page
