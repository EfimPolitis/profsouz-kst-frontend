import type { Metadata } from 'next'

import CreateEventPage from '@/components/pages/admin/events/create'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

// export const metadata: Metadata = {
//   title: 'Создание мероприятий',
//   ...NO_INDEX_PAGE
// }

const Page = () => <CreateEventPage />

export default Page
