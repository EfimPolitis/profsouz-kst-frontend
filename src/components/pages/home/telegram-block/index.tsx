import Image from 'next/image'

import styles from './index.module.scss'

export const TelegramBlock = () => {
  return (
    <section className={styles.tg_section}>
      <div className={styles.container}>
        <div className={styles.tg_container}>
          <iframe
            loading='lazy'
            frameBorder='0'
            width='800px'
            height='500px'
            src='https://t.me/profsouzKST'
          >
            Your Browser Does Not Support iframes!
          </iframe>
        </div>
        <h2>Больше новостей в нашем telegram канале</h2>
        <div className={styles.arrow}>
          <Image
            src='./icons/arrow.svg'
            alt='arrow'
            fill
          />
        </div>
      </div>
    </section>
  )
}
