import Image from 'next/image'
import Link from 'next/link'

import styles from './index.module.scss'

export const UsefullLinksBlock = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Полезные ссылки</h2>
        <div className={styles.organization_box}>
          <div className={styles.organization}>
            <Link
              href='https://www.eseur.ru/'
              target='_blank'
            >
              <div className={styles.img}>
                <Image
                  width={50}
                  height={55}
                  src='https://www.eseur.ru/Images/logo.png?2'
                  alt=''
                />
              </div>
              Общественный профсоюз образования
            </Link>
          </div>
          <div className={styles.organization}>
            <Link
              href='https://mgoprof.ru/'
              target='_blank'
            >
              <div className={styles.img}>
                <Image
                  width={50}
                  height={80}
                  src='https://mgoprof.ru/wp-content/uploads/2018/06/flag0.png'
                  alt=''
                />
              </div>
              Московская городская организация общественного профсоюза
              образования
            </Link>
          </div>
          <div className={styles.organization}>
            <Link
              href='https://ugso.mgoprof.ru/'
              target='_blank'
            >
              <div className={styles.img}>
                <Image
                  width={50}
                  height={62}
                  src='https://ugso.mgoprof.ru/wp-content/uploads/2023/02/WhatsApp-Image-2021-11-16-at-17.21.27-1.jpeg'
                  alt=''
                />
              </div>
              ТО работников УГСО
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
