import cn from 'clsx'
import Image from 'next/image'

import Layout from '@/components/layouts/home-layout'

import styles from '@/styles/about/about.module.scss'

const Page = () => {
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
                Вплоть до конца ХIХ века в России создание профсоюзов не
                допускалось. В имперский период в стране существовало небольшое
                количество касс взаимопомощи, которые решали некоторые
                материальные проблемы рабочих. Действовали также нелегальные
                рабочие союзы. Первые легальные объединения рабочих – Общества
                взаимного вспомоществования рабочих механического производства в
                Москве и Санкт-Петербурге – были созданы по инициативе главы
                Особого отдела Департамента полиции С.В. Зубатова в 1901-1903
                годах. В 1904 г. по инициативе священника Г. Гапона в
                Санкт-Петербурге было создано «Собрание русских
                фабрично-заводских рабочих».
              </p>
              <p className={styles._animateItems}>
                Однако после события 9 января 1905 г., вошедших в историю под
                названием «Кровавое воскресенье», Союз был распущен. В ходе
                первой русской революции 1905-1907 гг. во многих городах были
                созданы рабочие организации. Некоторые из них были легализованы,
                однако затем закрыты. Новый подъем рабочего движения, что в
                частности выразилось в создании профсоюзных объединений, начался
                в 1910 г., который продолжался вплоть до 1917 года. Период
                формирования и становления профсоюзных организаций в России
                завершился к лету 1918 года.
              </p>
              <p className={styles._animateItems}>
                Первый учредительный съезд Всесоюзного центрального совета
                профессиональных союзов (ВЦСПС), объединивших впоследствии все
                профессиональные организации сначала России, затем СССР,
                состоялся в январе 1918 года. Все годы существования советского
                государства профсоюзы играли важную роль в организации
                производства и быта рабочих и служащих, начиная от в ликвидации
                безработицы и безграмотности, в обеспечении продовольствием и
                топливом рабочих и их семей в первые послереволюционные годы и
                заканчивая целым комплексом социальных гарантий и льгот,
                предоставляемых по линии профсоюзов в позднесоветский период.
              </p>
              <p className={styles._animateItems}>
                Охват работающего населения советской страны имел массовый
                характер. В СССР не было ни одного предприятия или учреждения,
                где бы не работала профсоюзная организация. ВЦСПС владел
                значительной собственностью, прежде всего, это объекты
                недвижимости (учебные комплексы, гостиницы, санатории, детские
                лагеря, профилактории, административные здания); имел
                собственное печатное издание. Газета «Труд», издаваемая с 1921
                г., была не только одной из самых популярных в СССР, но и одной
                из самых многотиражных – к началу 1990-х годов тираж издания
                составлял 21 млн 500 тыс. экземпляров.
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

export default Page
