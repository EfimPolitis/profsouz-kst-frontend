import { Metadata } from 'next'

import { EventsPage } from '@/components/pages'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

// export const metadata: Metadata = {
//   title: 'Админ панель | Мероприятия',
//   ...NO_INDEX_PAGE
// }

const Page = () => <EventsPage />

export default Page
