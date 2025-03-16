import { Metadata } from 'next'
import { Suspense } from 'react'

import { Header } from '@/components/frames'
import NewsPage from '@/components/pages/admin/news/page'

export const metadata: Metadata = {
  title: 'Новости'
}

const Page = () => (
  <Suspense fallback={<div>Загрузка...</div>}>
    <Header />
    <NewsPage />
  </Suspense>
)

export default Page
