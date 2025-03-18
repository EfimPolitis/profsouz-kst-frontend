import { Metadata } from 'next'

import Layout from '@/components/layouts/home-layout'
import AboutPage from '@/components/pages/about'

export const metadata: Metadata = {
  title: 'О нас'
}

const Page = () => (
  <Layout>
    <AboutPage />
  </Layout>
)

export default Page
