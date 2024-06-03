import Image from 'next/image'

import Layout from '@/components/layout/Layout'
import { BuildPage } from '@/components/screens/build/BuildPage'
import { Pagination } from '@/components/ui/pagination/Pagination'

import styles from './style.module.scss'

const News = () => {
  return (
    <Layout>
      {/* <section>
        <div className={styles.container}>
          <h1>Новости</h1>
          <div className={styles.wrapp_news}>
            <div className={styles.news_container}>
              <div className={styles.card_neumorphic}>
                <div className={styles.card__img}>
                  <div>
                    <Image
                      fill
                      src='/newtemplate-1.png'
                      alt=''
                    />
                  </div>
                </div>
                <div className={styles.card__content}>
                  <h4 className={styles.card__title}>Название новости1</h4>
                  <div className={styles.card_discription}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Esse maxime optio fugiat consequatur animi, nihil ipsam
                    voluptatum suscipit minus repellat, nam est? Optio,
                    assumenda.
                  </div>
                  <div className={styles.card__actions}>
                    <p className={styles.card__date}>01 Окт 2023</p>
                    <a
                      href='./article.html'
                      className={styles.card_link}
                    >
                      <p>Читать далее</p>
                      <div>
                        <Image
                          fill
                          src='/icons/more_arrow.svg'
                          alt=''
                        />
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <div className={styles.card_neumorphic}>
                <div className={styles.card__img}>
                  <div>
                    <Image
                      fill
                      src='/newtemplate-1.png'
                      alt=''
                    />
                  </div>
                </div>
                <div className={styles.card__content}>
                  <h4 className={styles.card__title}>Название новости1</h4>
                  <div className={styles.card_discription}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Esse maxime optio fugiat consequatur animi, nihil ipsam
                    voluptatum suscipit minus repellat, nam est? Optio,
                    assumenda.
                  </div>
                  <div className={styles.card__actions}>
                    <p className={styles.card__date}>01 Окт 2023</p>
                    <a
                      href='./article.html'
                      className={styles.card_link}
                    >
                      <p>Читать далее</p>
                      <div>
                        <Image
                          fill
                          src='/icons/more_arrow.svg'
                          alt=''
                        />
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <div className={styles.card_neumorphic}>
                <div className={styles.card__img}>
                  <div>
                    <Image
                      fill
                      src='/newtemplate-1.png'
                      alt=''
                    />
                  </div>
                </div>
                <div className={styles.card__content}>
                  <h4 className={styles.card__title}>Название новости1</h4>
                  <div className={styles.card_discription}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Esse maxime optio fugiat consequatur animi, nihil ipsam
                    voluptatum suscipit minus repellat, nam est? Optio,
                    assumenda.
                  </div>
                  <div className={styles.card__actions}>
                    <p className={styles.card__date}>01 Окт 2023</p>
                    <a
                      href='./article.html'
                      className={styles.card_link}
                    >
                      <p>Читать далее</p>
                      <div>
                        <Image
                          fill
                          src='/icons/more_arrow.svg'
                          alt=''
                        />
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <div className={styles.card_neumorphic}>
                <div className={styles.card__img}>
                  <div>
                    <Image
                      fill
                      src='/newtemplate-1.png'
                      alt=''
                    />
                  </div>
                </div>
                <div className={styles.card__content}>
                  <h4 className={styles.card__title}>Название новости1</h4>
                  <div className={styles.card_discription}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Esse maxime optio fugiat consequatur animi, nihil ipsam
                    voluptatum suscipit minus repellat, nam est? Optio,
                    assumenda.
                  </div>
                  <div className={styles.card__actions}>
                    <p className={styles.card__date}>01 Окт 2023</p>
                    <a
                      href='./article.html'
                      className={styles.card_link}
                    >
                      <p>Читать далее</p>
                      <div>
                        <Image
                          fill
                          src='/icons/more_arrow.svg'
                          alt=''
                        />
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <div className={styles.card_neumorphic}>
                <div className={styles.card__img}>
                  <div>
                    <Image
                      fill
                      src='/newtemplate-1.png'
                      alt=''
                    />
                  </div>
                </div>
                <div className={styles.card__content}>
                  <h4 className={styles.card__title}>Название новости1</h4>
                  <div className={styles.card_discription}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Esse maxime optio fugiat consequatur animi, nihil ipsam
                    voluptatum suscipit minus repellat, nam est? Optio,
                    assumenda.
                  </div>
                  <div className={styles.card__actions}>
                    <p className={styles.card__date}>01 Окт 2023</p>
                    <a
                      href='./article.html'
                      className={styles.card_link}
                    >
                      <p>Читать далее</p>
                      <div>
                        <Image
                          fill
                          src='/icons/more_arrow.svg'
                          alt=''
                        />
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <Pagination /> 
          </div>
        </div>
      </section> */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '1020px'
        }}
      >
        <BuildPage />
      </div>
    </Layout>
  )
}

export default News
