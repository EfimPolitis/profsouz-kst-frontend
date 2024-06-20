import { AuthForm } from '@/components/screens/form/auth-form/AuthForm'

import styles from '@/scss/auth/auth.module.scss'

export default function AuthPage() {
  return (
    <div className={styles.page}>
      <AuthForm isLogin />
    </div>
  )
}
