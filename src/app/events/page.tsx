import { Metadata } from 'next'
import { Suspense } from 'react'

import { Header } from '@/components/frames'
import { EventsPage } from '@/components/pages'

export const metadata: Metadata = {
  title: 'Мероприятия'
}

const Page = () => (
  <Suspense>
    <Header />
    <EventsPage />
  </Suspense>
)

export default Page
