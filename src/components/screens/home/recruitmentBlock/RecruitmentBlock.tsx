import cn from 'clsx'
import Image from 'next/image'

import styles from './RecruitmentBlock.module.scss'

export const RecruitmentBlock = () => {
  return (
    <section className={styles.recruitment_block}>
      <div className={styles.container}>
        <h1 className={styles.title_section}>Вы еще не в профсоюзе?</h1>
        <div className={styles.steps_wrapper}>
          <div className={styles.steps_container}>
            <div className={styles.line_nums}>
              <div className={styles.num}>01</div>
              <div className={styles.num}>02</div>
              <div className={styles.num}>03</div>
            </div>
            <div className={styles.discriptions}>
              <div className={styles.discription}>
                Приходите по адресу: г. Москва, Хибинский пр-д, д. 10, 2 этаж
                учебного корпуса, 213 кабинет
              </div>
              <div className={styles.discription}>
                Напишите заявление на вступление в профсоюз
              </div>
              <div className={styles.discription}>
                И станьте частью нашей профсоюзной семьи!
              </div>
            </div>
          </div>
          <div className={styles.inner_docs}>
            <Image
              width={270}
              height={250}
              src='/docs.png'
              alt='docs-img'
            />
            <button
              className={cn(
                styles.docs_btn,
                styles.neumorphic_hover,
                styles.btn
              )}
            >
              образцы документов
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
