import { Metadata } from 'next'

import { Header } from '@/components/frames'
import ResetPasswordPage from '@/components/pages/reset-password/indes'

export const metadata: Metadata = {
  title: 'Сброс пароля'
}

const Page = () => (
  <>
    <Header />
    <ResetPasswordPage />
  </>
)

export default Page
