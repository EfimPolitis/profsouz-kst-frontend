import { Metadata } from 'next'
import { Suspense } from 'react'

import { UsersPage } from '@/components/pages'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
  title: 'Упарваление пользователями',
  ...NO_INDEX_PAGE
}

const Page = () => (
  <Suspense>
    <UsersPage />
  </Suspense>
)

export default Page
