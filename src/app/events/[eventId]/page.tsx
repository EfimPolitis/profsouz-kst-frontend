import { Metadata } from 'next'

import { Header } from '@/components/frames'
import { EventPageId } from '@/components/pages/admin/events/[eventId]'

export const metadata: Metadata = {
  title: 'Мероприятие'
}

const Page = () => (
  <>
    <Header />
    <EventPageId />
  </>
)

export default Page
