import { Metadata } from 'next'

import { Header } from '@/components/frames'
import RequestEmailPage from '@/components/pages/request-email'

export const metadata: Metadata = {
  title: 'Запрос email письма'
}

const Page = () => (
  <>
    <Header />
    <RequestEmailPage />
  </>
)

export default Page
