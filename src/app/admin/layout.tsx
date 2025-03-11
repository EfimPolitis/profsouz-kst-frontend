import { type PropsWithChildren } from 'react'

import AdminLayout from '@/components/layouts/admin'

const Layout = ({ children }: PropsWithChildren<unknown>) => (
  <AdminLayout>{children}</AdminLayout>
)

export default Layout
