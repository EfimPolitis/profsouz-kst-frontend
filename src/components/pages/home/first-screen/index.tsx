'use client'

import cn from 'clsx'
import { m } from 'framer-motion'

import styles from './index.module.scss'

export const FirstScreen = () => {
  return (
    <>
      <section className={styles.mainscreen}>
        <div className={styles.container}>
          <div className={styles.bubbles_container}>
            <div className={cn(styles.bubble, styles.bubble1)}>
              <h1>Профсоюз - это...</h1>
            </div>
            <div className={cn(styles.bubble, styles.bubble2)}>
              <h3>каждый из нас</h3>
            </div>
            <div className={cn(styles.bubble, styles.bubble3)}>
              <h3>и все мы</h3>
            </div>
            <div className={cn(styles.bubble, styles.bubble4)}>
              <h3>вместе</h3>
            </div>
          </div>
          <div className={styles.mainscreen_lenta}>
            <h2>А также твои</h2>
            <div className={styles.main_lenta_content}>
              <div className={styles.lenta_col1}>
                <m.div
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  viewport={{ once: true, amount: 0.3 }}
                  className={styles.block_arrow}
                >
                  <h4>Коллективный договор</h4>
                </m.div>
                <m.div
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3, ease: 'easeOut' }}
                  viewport={{ once: true, amount: 0.3 }}
                  className={styles.block_arrow}
                >
                  <h4>Опора и защита</h4>
                </m.div>
              </div>
              <div className={styles.lenta_col2}>
                <m.div
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.6, ease: 'easeOut' }}
                  viewport={{ once: true, amount: 0.3 }}
                  className={styles.block_arrow}
                >
                  <h4>Комфортные условия труда</h4>
                </m.div>
                <m.div
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.9, ease: 'easeOut' }}
                  viewport={{ once: true, amount: 0.3 }}
                  className={styles.block_arrow}
                >
                  <h4>Уверенность в завтрашнем дне</h4>
                </m.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
