import { Metadata } from 'next'

import EditEventPage from '@/components/pages/admin/events/edit'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
  title: 'Редактирование мероприятия',
  ...NO_INDEX_PAGE
}

const Page = () => <EditEventPage />

export default Page
