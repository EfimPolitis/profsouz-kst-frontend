import { Suspense } from 'react'

import { ApplicationsPage } from '@/components/pages'

const Page = () => (
  <Suspense fallback={<div>Загрузка...</div>}>
    <ApplicationsPage />
  </Suspense>
)

export default Page
