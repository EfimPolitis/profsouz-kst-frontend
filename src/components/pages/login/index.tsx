import { AuthForm } from '@/components/frames'

import styles from './index.module.scss'

const LoginPage = () => {
  return (
    <div className={styles.login_page}>
      <AuthForm type='login' />
    </div>
  )
}

export default LoginPage
