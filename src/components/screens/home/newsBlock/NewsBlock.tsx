import cn from 'clsx'
import Image from 'next/image'

import { news } from '@/constants/news.constants'

import styles from './NewsBlock.module.scss'

export const NewsBlock = () => {
  return (
    <section className={styles.news}>
      <div className={styles.container}>
        <div className={styles.title_news}>
          <h1 className={styles.title_section}>Активная профсоюзная жизнь</h1>
          <div className={styles.news_arrowscontainer}>
            <h3 className={styles.title__info_slick_news}></h3>
          </div>
        </div>
        <div className={styles.news_slider}>
          {news.map((data, i) => (
            <div
              className={cn(styles.card, styles.neumorphic)}
              key={i}
            >
              <div className={styles.card__img}>
                <Image
                  src={data.imageUrl}
                  alt=''
                  fill
                />
              </div>
              <div className={styles.card__content}>
                <h4 className={styles.card__title}>{data.title}</h4>
                <div className={styles.card_discription}>
                  {data.description}
                </div>
                <div className={styles.card__actions}>
                  <p className={styles.card__date}>{data.date}</p>
                  <a
                    href={data.link}
                    className={styles.card_link}
                  >
                    <p>Читать далее</p>
                    <div className={styles.arrow}>
                      <Image
                        src='./icons/more_arrow.svg'
                        alt=''
                        fill
                      />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
