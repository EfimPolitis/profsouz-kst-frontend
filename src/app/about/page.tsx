import cn from 'clsx'
import Image from 'next/image'

import Layout from '../../components/layout/Layout'

import styles from './About.module.scss'

const About = () => {
  return (
    <Layout>
      <div className={styles.wrapp}>
        <section>
          <div className={styles.container}>
            <div className={styles.wrapp_contacts}>
              <div className={styles.info_contacts}>
                <h3 className={styles.text_center}>Контакты</h3>
                <address>
                  Адрес: г. Москва, Хибинский пр-д, д. 10, 2 этаж учебного
                  корпуса, 213 кабинет
                </address>
                <address>
                  <strong>Председатель - Глушенкова Светлана Борисовна</strong>
                  <br />
                  Тел: <abbr title='Phone'>+7-(973)-573-21-92</abbr>
                  <br />
                  <a href='mailto:#'>glush@mail.ru</a>
                </address>
              </div>
              <div className={styles.contacts__map}>
                <iframe
                  src='https://yandex.ru/map-widget/v1/?um=constructor%3A0d4e3ca41e671c5daf51b18a4ccb97506a4f439d7ccfb122e33322b06e52a026&amp;source=constructor'
                  width='100%'
                  height='400'
                  frameBorder='0'
                ></iframe>
              </div>
            </div>
          </div>
        </section>
        <section id={styles.history}>
          <div className={styles.container}>
            <h1 className={cn(styles.title_section, styles._animateItems)}>
              История
            </h1>
            <div className={styles.history_content}>
              <p className={styles._animateItems}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro,
                commodi vero aspernatur facere pariatur cum magnam ullam harum
                facilis, sunt tenetur. Praesentium dolorum corporis quo quis
                placeat nostrum explicabo? Fugiat, alias amet aliquam eos
                mollitia cum commodi ut? Culpa rerum animi perspiciatis harum,
                deleniti enim laudantium dolores asperiores minus reiciendis.
              </p>
              <p className={styles._animateItems}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro,
                commodi vero aspernatur facere pariatur cum magnam ullam harum
                facilis, sunt tenetur. Praesentium dolorum corporis quo quis
                placeat nostrum explicabo? Fugiat, alias amet aliquam eos
                mollitia cum commodi ut? Culpa rerum animi perspiciatis harum,
                deleniti enim laudantium dolores asperiores minus reiciendis.
              </p>
              <p className={styles._animateItems}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro,
                commodi vero aspernatur facere pariatur cum magnam ullam harum
                facilis, sunt tenetur. Praesentium dolorum corporis quo quis
                placeat nostrum explicabo? Fugiat, alias amet aliquam eos
                mollitia cum commodi ut? Culpa rerum animi perspiciatis harum,
                deleniti enim laudantium dolores asperiores minus reiciendis.
              </p>
              <p className={styles._animateItems}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro,
                commodi vero aspernatur facere pariatur cum magnam ullam harum
                facilis, sunt tenetur. Praesentium dolorum corporis quo quis
                placeat nostrum explicabo? Fugiat, alias amet aliquam eos
                mollitia cum commodi ut? Culpa rerum animi perspiciatis harum,
                deleniti enim laudantium dolores asperiores minus reiciendis.
              </p>
            </div>
          </div>
        </section>
        <section>
          <div className={styles.container}>
            <h2 className={styles.title_section}>Полезные ссылки</h2>
            <div className={styles.organization_box}>
              <div className={styles.organization}>
                <div className={styles.organization_img}>
                  <Image
                    width={50}
                    height={55}
                    src='https://www.eseur.ru/Images/logo.png?2'
                    alt=''
                  />
                </div>
                <a
                  href='https://www.eseur.ru/'
                  target='_blank'
                >
                  Общественный профсоюз образования
                </a>
              </div>
              <div className={styles.organization}>
                <div className={styles.organization_img}>
                  <Image
                    width={50}
                    height={80}
                    src='https://mgoprof.ru/wp-content/uploads/2018/06/flag0.png'
                    alt=''
                  />
                </div>
                <a
                  href='https://mgoprof.ru/'
                  target='_blank'
                >
                  Московская городская организация общественного профсоюза
                  образования
                </a>
              </div>
              <div className={styles.organization}>
                <div className={styles.organization_img}>
                  <Image
                    width={50}
                    height={62}
                    src='https://ugso.mgoprof.ru/wp-content/uploads/2023/02/WhatsApp-Image-2021-11-16-at-17.21.27-1.jpeg'
                    alt=''
                  />
                </div>
                <a
                  href='https://ugso.mgoprof.ru/'
                  target='_blank'
                >
                  ТО работников УГСО
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default About
