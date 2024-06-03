import cn from 'clsx'

import styles from './InfoBlock.module.scss'

export const InfoBlock = () => {
  return (
    <section className={styles.info}>
      <div className={styles.container}>
        <div className={styles.wrapper_info}>
          <div className={styles.info_box}>
            <h1 className={styles.animate_items}>Профсоюз - это</h1>
            <div className={styles.info_content}>
              <p className={styles.animate_items}>
                Мы объединились на добровольной основе в профессиональный союз
                для представительства и защиты социально-трудовых прав и
                интересов работников сферы образования, студентов и неработающих
                пенсионеров.
              </p>
              <p className={styles.animate_items}>
                С этой целью мы стремимся оставаться крупнейшей общественной
                организацией, сообществом социально ответственных граждан,
                разделяющих общие принципы, ценности и приоритеты, а также
                проявляющих активность в практической реализации общих задач.
              </p>
              <p className={styles.animate_items}>
                Мы выступаем за всеобщее качественное образование, достойный,
                безопасный профессиональный труд и благополучную жизнь.
              </p>
            </div>
          </div>
          <div className={styles.tasks_box}>
            <h1 className={styles.title_section}>Наши главные задачи</h1>
            <div className={cn(styles.task_box, styles.main)}>
              <h4>Защита трудовых прав работника</h4>
            </div>
            <div className={styles.inner_task_box}>
              <div className={cn(styles.task_box)}>
                <p>Помощь в быстром разрешении трудовых споров</p>
              </div>
              <div className={cn(styles.task_box)}>
                <p>
                  Обеспечение соблюдения трудового законодательства в части
                  безопасности, охраны и оплаты труда
                </p>
              </div>
              <div className={cn(styles.task_box)}>
                <p>
                  Возможность повлиять на решения работодателя по поводу
                  увеличения заработной платы и улучшения условий труда
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
