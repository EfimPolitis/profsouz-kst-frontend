import { Metadata } from 'next'

import { Header } from '@/components/frames'
import MyEventsPage from '@/components/pages/my-events'

export const metadata: Metadata = {
  title: 'Мои мероприятия'
}

const Page = () => (
  <>
    <Header />
    <MyEventsPage />
  </>
)

export default Page
