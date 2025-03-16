import { Profile, Sidebar } from '@/components/frames'

import styles from './index.module.scss'

const AdminLayout = (props: { children: React.ReactNode }) => {
  return (
    <div className={styles.admin_layout}>
      <Sidebar />
      <div className={styles.page_layout}>
        <Profile />
        <div className={styles.page}>{props.children}</div>
      </div>
    </div>
  )
}

export default AdminLayout
