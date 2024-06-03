import type { Metadata } from 'next'

import Layout from '@/components/layout/Layout'
import { BuildPage } from '@/components/screens/build/BuildPage'

export const metadata: Metadata = {
  title: 'Документы',
  description: ''
}

const DocumentsPage = () => {
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

export default DocumentsPage
