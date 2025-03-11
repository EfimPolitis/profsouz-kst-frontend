'use client'

import cn from 'clsx'
import { useState } from 'react'

import { statistic } from '@/constants/statistic.constants'

import styles from './StatisticBlock.module.scss'

export const StatisticBlock = () => {
  const [active, setActive] = useState(0)

  return (
    <section className={styles.statistic}>
      <div className={styles.container}>
        <h1 className={styles.title}>C нами уже</h1>
        <div className={styles.box}>
          <div className={styles.content}>
            <h1 className={styles.num}>
              <span>52</span>%
            </h1>
            <h2>работников нашей организации</h2>
          </div>
          <div className={styles.stata}>
            <div className={styles.shkala}></div>
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <h1 className={styles.title}>
          А это <span>124 человека</span>, которым наш профсоюз предоставляет
        </h1>
        <div className={styles.info_block}>
          <div className={styles.btn_box}>
            {statistic.map((data, i) => (
              <button
                className={cn(styles.btn, active === i ? styles.active : '')}
                key={i}
                onClick={() => setActive(i)}
              >
                <p>0{i + 1}</p>
                <h1>{data.type}</h1>
              </button>
            ))}
          </div>
          {statistic.map((data, i) => (
            <div
              key={i}
              className={cn(styles.popup, active === i ? styles.active : '')}
            >
              <div className={styles.box}>
                <h1>{data.info.title}</h1>
                <div className={styles.description}>
                  {data.info.description.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
