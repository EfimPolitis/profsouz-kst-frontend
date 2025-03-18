import { Metadata } from 'next'

import CreateNewsPage from '@/components/pages/admin/news/create'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
  title: 'Создание новости',
  ...NO_INDEX_PAGE
}

const Page = () => <CreateNewsPage />

export default Page
