import { Metadata } from 'next'

import { BuildPage } from '@/components/screens/build/BuildPage'

export const metadata: Metadata = {
  title: 'Репорты'
}

const ReportPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
      }}
    >
      <BuildPage />
    </div>
  )
}

export default ReportPage
