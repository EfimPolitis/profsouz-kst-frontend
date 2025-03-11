import type { Metadata } from 'next'

import EditEventPage from '@/components/pages/admin/events/edit'

export const metadata: Metadata = {
  title: 'Редактирование мероприятия',
  description: ''
}

const Page = () => <EditEventPage />

export default Page
