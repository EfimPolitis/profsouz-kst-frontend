import { Metadata } from 'next'

import CreateUserPage from '@/components/pages/admin/users/create'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
  title: 'Создание пользователя',
  ...NO_INDEX_PAGE
}

const Page = () => <CreateUserPage />
export default Page
