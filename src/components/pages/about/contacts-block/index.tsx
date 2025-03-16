import { Mail, MapPin, Phone } from 'lucide-react'

import styles from './index.module.scss'

export const ContactsBlock = () => {
  return (
    <section className={styles.section}>
      <div className={styles.info_contacts}>
        <h2 className={styles.title}>Контакты</h2>
        <div className={styles.rows_block}>
          <div className={styles.row}>
            <Phone size={30} /> Тел: <span>+7-(973)-573-21-92</span>
          </div>
          <div className={styles.row}>
            <Mail size={30} /> Почта:{' '}
            <span>
              <a href='mailto:glush@mail.ru'>glush@mail.ru</a>
            </span>
          </div>
          <div className={styles.row}>
            <MapPin size={30} /> Адрес:{' '}
            <span>
              г. Москва, Хибинский пр-д, д. 10, 2 этаж учебного корпуса, 213
              кабинет
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
