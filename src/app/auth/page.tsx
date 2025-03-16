import { Metadata } from 'next'

import { Header } from '@/components/frames'
import { LoginPage } from '@/components/pages'

export const metadata: Metadata = {
  title: 'Вход в систему'
}

const Page = () => (
  <>
    <Header />
    <LoginPage />
  </>
)

export default Page
