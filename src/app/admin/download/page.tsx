import { Metadata } from 'next'

import DownloadAppPage from '@/components/pages/admin/download-app'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

// export const metadata: Metadata = {
//   title: 'Desktop',
//   ...NO_INDEX_PAGE
// }

const Page = () => <DownloadAppPage />

export default Page
