import { Metadata } from 'next'
import { Suspense } from 'react'

import NewsPage from '@/components/pages/admin/news/page'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
  title: 'Новости',
  ...NO_INDEX_PAGE
}

const Page = () => (
  <Suspense>
    <NewsPage />
  </Suspense>
)

export default Page
