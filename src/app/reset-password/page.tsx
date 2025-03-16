import { Metadata } from 'next'
import { Suspense } from 'react'

import { Header } from '@/components/frames'
import ResetPasswordPage from '@/components/pages/reset-password/indes'

export const metadata: Metadata = {
  title: 'Сброс пароля'
}

const Page = () => (
  <Suspense fallback={<div>Загрузка...</div>}>
    <Header />
    <ResetPasswordPage />
  </Suspense>
)

export default Page
