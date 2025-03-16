import { ContactsBlock } from './contacts-block'
import { DocumentsBlock } from './documents-block'
import { HistoryBlock } from './history-block'
import styles from './index.module.scss'
import { UsefullLinksBlock } from './usefull-links-block'

const AboutPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.wrapp}>
        <section>
          <div className={styles.container}>
            <div className={styles.map}>
              <iframe
                src='https://yandex.ru/map-widget/v1/?um=constructor%3A0d4e3ca41e671c5daf51b18a4ccb97506a4f439d7ccfb122e33322b06e52a026&amp;source=constructor'
                width='100%'
                height='400'
                frameBorder='0'
              ></iframe>
            </div>
          </div>
        </section>
        <ContactsBlock />
        <HistoryBlock />
        <DocumentsBlock />
        <UsefullLinksBlock />
      </div>
    </div>
  )
}

export default AboutPage
