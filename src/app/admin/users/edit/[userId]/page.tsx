import { Metadata } from 'next'

import EditUserPage from '@/components/pages/admin/users/edit'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
  title: 'Редактирование пользователя',
  ...NO_INDEX_PAGE
}

const Page = () => <EditUserPage />

export default Page
