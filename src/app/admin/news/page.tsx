import { Suspense } from 'react'

import NewsPage from '@/components/pages/admin/news/page'

const Page = () => (
  <Suspense fallback={<div>Загрузка...</div>}>
    <NewsPage />
  </Suspense>
)

export default Page
