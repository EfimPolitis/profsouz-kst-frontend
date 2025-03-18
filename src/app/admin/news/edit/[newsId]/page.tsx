import { Metadata } from 'next'

import EditNewsPage from '@/components/pages/admin/news/edit'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
  title: 'Редактирование новости',
  ...NO_INDEX_PAGE
}

const Page = () => <EditNewsPage />

export default Page
