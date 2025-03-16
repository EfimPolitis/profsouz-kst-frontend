import { Suspense } from 'react'

import { UsersPage } from '@/components/pages'

const Page = () => (
  <Suspense fallback={<div>Загрузка...</div>}>
    <UsersPage />
  </Suspense>
)

export default Page
