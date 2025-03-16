'use client'

import Link from 'next/link'

import { NewsCard, NewsCardSkeleton } from '@/components/frames'

import { URL_PAGES } from '@/config/url.config'

import { useGetNews } from '@/hooks/news/useGetNews'

import styles from './index.module.scss'

export const NewsBlock = () => {
  const { data, isFetching } = useGetNews()
  const news = data?.data.items.slice(0, 3)

  return (
    <section className={styles.news}>
      <div className={styles.container}>
        <div className={styles.title_news}>
          <h1 className={styles.title_section}>Последние новости</h1>
          <div className={styles.news_arrowscontainer}>
            <h3 className={styles.title__info_slick_news}></h3>
          </div>
        </div>
        <div className={styles.news_slider}>
          {isFetching
            ? [...new Array(3)].map((_, i) => <NewsCardSkeleton key={i} />)
            : !!news?.length &&
              news.map(news => (
                <NewsCard
                  key={news.newsId}
                  data={news}
                />
              ))}
        </div>
      </div>
      <Link href={URL_PAGES.NEWS}>Посмотреть все новости</Link>
    </section>
  )
}
