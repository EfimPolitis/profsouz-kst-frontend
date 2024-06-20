import type { Metadata } from 'next'

import { BuildPage } from '@/components/screens/build/BuildPage'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import styles from '@/scss/admin/news/news.module.scss'

export const metadata: Metadata = {
  title: '',
  ...NO_INDEX_PAGE
}

const NewsPage = () => {
  return (
    <div className={styles.page}>
      <BuildPage />
    </div>
  )
}

export default NewsPage
