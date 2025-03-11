'use client'

import { Eye } from 'lucide-react'
import { useParams } from 'next/navigation'

import { UndoBtn } from '@/components/ui'
import { ImageSlider } from '@/components/ui/sliders/image-slider'

import { useGetNewsById } from '@/hooks/news/useGetNewsById'

import styles from './index.module.scss'
import NewsPageSkeleton from './index.skeleton'

export const NewsPageId = () => {
  const { newsId } = useParams() as { newsId: string }

  const { data, isPending } = useGetNewsById(newsId)
  const news = data?.data

  return (
    <div className={styles.page}>
      {!isPending ? (
        <div className={styles.content}>
          {news ? (
            <>
              <UndoBtn
                size={30}
                style={{
                  position: 'absolute',
                  top: '0px',
                  left: '-60px',
                  zIndex: '1'
                }}
              />
              <ImageSlider
                height={500}
                images={news?.images}
                style={{ borderRadius: '10px 10px 0px 0px' }}
              />
              <div className={styles.info_block}>
                <div className={styles.views}>
                  <Eye />
                  <span>{news.views}</span>
                </div>
                <h2>{news.title}</h2>
                <div className={styles.description}>
                  {news?.content
                    .split('\n')
                    ?.map((label, index) => <p key={index}>{label}</p>)}
                </div>
              </div>
            </>
          ) : (
            <p>Кажется что данной новости уже нет...</p>
          )}
        </div>
      ) : (
        <NewsPageSkeleton />
      )}
    </div>
  )
}
