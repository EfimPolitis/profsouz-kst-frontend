import { Metadata } from 'next'

import { Header } from '@/components/frames'
import { NewsPageId } from '@/components/pages/admin/news/[newsId]'

export const metadata: Metadata = {
  title: 'Новость'
}

const Page = () => (
  <>
    <Header />
    <NewsPageId />
  </>
)

export default Page
