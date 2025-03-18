import { Metadata } from 'next'
import { Suspense } from 'react'

import { ApplicationsPage } from '@/components/pages'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
  title: 'Заявки',
  ...NO_INDEX_PAGE
}

const Page = () => (
  <Suspense>
    <ApplicationsPage />
  </Suspense>
)

export default Page
