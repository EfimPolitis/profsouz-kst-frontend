'use client'

import { Loader } from '@/components/ui'

import { ERole } from '@/types/user.types'

import { useProfile } from '@/hooks/user/useProfile'

import styles from './index.module.scss'

export const Profile = () => {
  const { data: user, isLoading } = useProfile()

  if (!user?.role) return

  return (
    <div className={styles.profile}>
      <div className={styles.profile_block}>
        <div className={styles.info}>
          {isLoading || (
            <>
              <span className={styles.fullname}>
                {user?.lastName} {user.firstName}
              </span>
              <span className={styles.role}>{ERole[`${user.role}`]}</span>
            </>
          )}
        </div>
        <div className={styles.avatar}>
          {isLoading ? <Loader /> : user.firstName?.charAt(0).toUpperCase()}
        </div>
      </div>
    </div>
  )
}
