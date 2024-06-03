import Link from 'next/link'

import styles from './(styles)/not-found.module.scss'

const NotFound = () => {
  return (
    <div className={styles.not_found}>
      <p className={styles.error}>404</p>
      <p className={styles.text}>Ууупс, такая страница не найдена</p>
      <Link
        href={'/'}
        className={styles.to_home}
      >
        Вернуться на главную
      </Link>
    </div>
  )
}

export default NotFound
