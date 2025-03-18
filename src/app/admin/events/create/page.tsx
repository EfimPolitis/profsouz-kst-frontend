import { Metadata } from 'next'

import CreateEventPage from '@/components/pages/admin/events/create'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
  title: 'Создание мероприятия',
  ...NO_INDEX_PAGE
}

const Page = () => <CreateEventPage />

export default Page
