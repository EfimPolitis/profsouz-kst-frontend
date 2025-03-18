import { Metadata } from 'next'
import { Suspense } from 'react'

import { EventsPage } from '@/components/pages'

export const metadata: Metadata = {
  title: 'Управление мероприятиями'
}

const Page = () => (
  <Suspense>
    <EventsPage />
  </Suspense>
)

export default Page
