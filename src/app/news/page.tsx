import { Metadata } from 'next'

import { Header } from '@/components/frames'
import NewsPage from '@/components/pages/admin/news/page'

export const metadata: Metadata = {
  title: 'Новости'
}

const Page = () => (
  <>
    <Header />
    <NewsPage />
  </>
)

export default Page
