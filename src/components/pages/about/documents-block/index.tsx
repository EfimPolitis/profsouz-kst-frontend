import cn from 'clsx'
import Link from 'next/link'

import { Accordion } from '@/components/ui'

import styles from './index.module.scss'

export const DocumentsBlock = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h1 className={cn(styles.title, styles._animateItems)}>Документы</h1>
        <div className={styles.content}>
          <Accordion title='Доклад'>
            <ul>
              <li>
                <Link
                  href={
                    'https://storage.yandexcloud.net/profsouz/documents/%D0%9F%D0%A3%D0%91%D0%9B%D0%98%D0%A7%D0%9D%D0%AB%D0%99-%D0%94%D0%9E%D0%9A%D0%9B%D0%90%D0%94-2022-%D0%A2%D0%9E%D0%A3%D0%93%D0%A1%D0%9E.pdf'
                  }
                  target='_blank'
                >
                  ПУБЛИЧНЫЙ-ДОКЛАД-2022-ТОУГСО
                </Link>
              </li>
            </ul>
          </Accordion>
          <Accordion title='Заявление'>
            <ul>
              <li>
                <Link
                  href={
                    'https://storage.yandexcloud.net/profsouz/documents/%D0%97%D0%B0%D1%8F%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5-%D0%BE-%D0%B2%D1%81%D1%82%D1%83%D0%BF%D0%BB%D0%B5%D0%BD%D0%B8%D0%B8-%D0%B2-%D0%BF%D1%80%D0%BE%D1%84%D1%81%D0%BE%D1%8E%D0%B7.pdf'
                  }
                  target='_blank'
                >
                  Заявление-о-вступлении-в-профсоюз
                </Link>
              </li>
              <li>
                <Link
                  href={
                    'https://storage.yandexcloud.net/profsouz/documents/%D0%97%D0%B0%D1%8F%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5-%D0%BE-%D0%B2%D1%8B%D1%85%D0%BE%D0%B4%D0%B5-%D0%B8%D0%B7-%D0%BF%D1%80%D0%BE%D1%84%D1%81%D0%BE%D1%8E%D0%B7%D0%B0.pdf'
                  }
                  target='_blank'
                >
                  Заявление-о-выходе-из-профсоюза
                </Link>
              </li>
            </ul>
          </Accordion>
          <Accordion title='Коллективный договор'>
            <ul>
              <li>
                <Link
                  href={
                    'https://storage.yandexcloud.net/profsouz/documents/%D0%9F%D0%BE%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5-%D0%BE-%D0%9A%D0%BE%D0%BC%D0%B8%D1%81%D1%81%D0%B8%D0%B8.pdf'
                  }
                  target='_blank'
                >
                  Положение-о-Комиссии
                </Link>
              </li>
              <li>
                <Link
                  href={
                    'https://storage.yandexcloud.net/profsouz/documents/%D0%9F%D0%BE%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5-%D0%BE-%D0%BF%D0%BE%D1%80%D1%8F%D0%B4%D0%BA%D0%B5-%D0%BF%D0%B5%D1%80%D0%B5%D0%B3%D0%BE%D0%B2%D0%BE%D1%80%D0%BE%D0%B2-%D0%BF%D0%BE-%D0%9A%D0%94.pdf'
                  }
                  target='_blank'
                >
                  Положение-о-порядке-переговоров-по-КД
                </Link>
              </li>
            </ul>
          </Accordion>
          <Accordion title='Охрана труда'>
            <ul>
              <li>
                <Link
                  href={
                    'https://storage.yandexcloud.net/profsouz/documents/Rekomendacii-po-primernomu-soderzhaniju-1.pdf'
                  }
                  target='_blank'
                >
                  Rekomendacii-po-primernomu-soderzhaniju-1
                </Link>
              </li>
              <li>
                <Link
                  href={
                    'https://storage.yandexcloud.net/profsouz/documents/%D0%9F%D1%80%D0%B8%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F_%D0%BA_%D0%BA%D0%BE%D0%BB%D0%B4%D0%BE%D0%B3-1.pdf'
                  }
                  target='_blank'
                >
                  Приложения_к_колдог-1
                </Link>
              </li>
              <li>
                <Link
                  href={
                    'https://storage.yandexcloud.net/profsouz/documents/13-12_%D0%9F%D0%BE%D1%81%D1%82%D0%B0%D0%BD%D0%BE%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5_%D0%BE%D0%B1_%D1%83%D0%BF%D0%BE%D0%BB%D0%BD%D0%BE%D0%BC%D0%BE%D1%87%D0%B5%D0%BD%D0%BD%D0%BE%D0%BC_%D0%9E%D0%A2.pdf'
                  }
                  target='_blank'
                >
                  13-12_Постановление_об_уполномоченном_ОТ
                </Link>
              </li>
            </ul>
          </Accordion>
          <Accordion title='Уставные документы'>
            <ul>
              <li>
                <Link
                  href={'#'}
                  target='_blank'
                >
                  8.1.Устав-Профсоюза_зарегистрирован-Минюстом-России-1
                </Link>
              </li>
            </ul>
          </Accordion>
        </div>
      </div>
    </section>
  )
}
