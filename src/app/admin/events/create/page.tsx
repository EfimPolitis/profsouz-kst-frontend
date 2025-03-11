import type { Metadata } from 'next'

import CreateEventPage from '@/components/pages/admin/events/create'

export const metadata: Metadata = {
  title: 'Создание мероприятия',
  description: ''
}

const Page = () => <CreateEventPage />

export default Page
