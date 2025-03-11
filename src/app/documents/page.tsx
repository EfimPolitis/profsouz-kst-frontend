import type { Metadata } from 'next'

import Layout from '@/components/layouts/home-layout'
import { BuildPage } from '@/components/pages/build'

export const metadata: Metadata = {
  title: 'Документы',
  description: ''
}

const Page = () => {
  return (
    <Layout>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '1020px'
        }}
      >
        <BuildPage />
      </div>
    </Layout>
  )
}

export default Page
