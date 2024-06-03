import Image from 'next/image'

import styles from './WhatsappBlock.module.scss'

export const WhatsappBlock = () => {
  return (
    <section className={styles.whatsapp_section}>
      <div className={styles.container}>
        <button className={styles.WhatsApp_btn}>Написать в WhatsApp</button>
        <h1>
          Остались вопросы? <br />
          Напишите нам в WhatsApp!
        </h1>
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
