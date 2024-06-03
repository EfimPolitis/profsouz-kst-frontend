import { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
  title: 'admin',
  ...NO_INDEX_PAGE
}

const Admin = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <p style={{ fontSize: '40px' }}>Админ панель!</p>
    </div>
  )
}

export default Admin
