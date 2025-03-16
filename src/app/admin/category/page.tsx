import { Metadata } from 'next'

import { CategoriesPage } from '@/components/pages'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

// export const metadata: Metadata = {
//   title: 'Категории',
//   ...NO_INDEX_PAGE
// }

const Page = () => <CategoriesPage />

export default Page
