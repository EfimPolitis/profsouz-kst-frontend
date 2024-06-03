import { CodeXml } from 'lucide-react'

import styles from './BuildPage.module.scss'

export const BuildPage = () => {
  return (
    <div className={styles.build}>
      <CodeXml size={50} />
      <p>Данная страница пока в разработке</p>
    </div>
  )
}
