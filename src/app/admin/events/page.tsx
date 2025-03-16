import { Suspense } from 'react'

import { EventsPage } from '@/components/pages'

const Page = () => (
  <Suspense fallback={<div>Загрузка...</div>}>
    <EventsPage />
  </Suspense>
)

export default Page
