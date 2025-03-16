import type { Metadata } from 'next'

import NewsPage from '@/components/pages/admin/news/page'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

// export const metadata: Metadata = {
//   title: 'Админ Панель | Новости',
//   ...NO_INDEX_PAGE
// }

const Page = () => <NewsPage />

export default Page
