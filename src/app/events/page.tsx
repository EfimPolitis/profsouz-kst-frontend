import { Metadata } from 'next'

import { Header } from '@/components/frames'
import { EventsPage } from '@/components/pages'

export const metadata: Metadata = {
  title: 'Мероприятия'
}

const Page = () => (
  <>
    <Header />
    <EventsPage />
  </>
)

export default Page
