import { Metadata } from 'next'

import { Header } from '@/components/frames'
import ChangePasswordPage from '@/components/pages/change-password'

export const metadata: Metadata = {
  title: 'Изменение пароля'
}

const Page = () => (
  <>
    <Header />
    <ChangePasswordPage />
  </>
)

export default Page
