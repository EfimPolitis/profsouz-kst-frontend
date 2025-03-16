import { Suspense } from 'react'

import { CategoriesPage } from '@/components/pages'

const Page = () => (
  <Suspense fallback={<div>Загрузка...</div>}>
    <CategoriesPage />
  </Suspense>
)

export default Page
