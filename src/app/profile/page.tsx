import { Metadata } from 'next'

import { Header } from '@/components/frames'
import { ProfilePage } from '@/components/pages'

export const metadata: Metadata = {
  title: 'Профиль'
}

const Page = () => (
  <>
    <Header />
    <ProfilePage />
  </>
)

export default Page
