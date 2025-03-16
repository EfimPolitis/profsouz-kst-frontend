'use client'

import { Metadata } from 'next'

import { UsersPage } from '@/components/pages'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

// export const metadata: Metadata = {
//   title: 'Админ Панель | Пользователи',
//   ...NO_INDEX_PAGE
// }

const Page = () => <UsersPage />

export default Page
