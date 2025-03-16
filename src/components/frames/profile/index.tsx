'use client'

import { Menu } from '@components/frames/menu'

import { Loader } from '@/components/ui'

import { roles } from '@/constants/roles.constants'

import { ERole } from '@/types/user.types'

import { useOutside } from '@/hooks/useOutside'
import { useProfile } from '@/hooks/user/useProfile'

import styles from './index.module.scss'

export const Profile = () => {
  const { isShow, setIsShow, ref } = useOutside(false)
  const { data: user, isLoading } = useProfile()

  const handleToggle = (event: React.MouseEvent) => {
    event.stopPropagation()
    setIsShow(prev => !prev)
  }

  return (
    <div className={styles.profile}>
      <div
        className={styles.profile_block}
        ref={ref}
        onClick={handleToggle}
      >
        {isLoading ? (
          <div className={styles.avatar}>
            <Loader />
          </div>
        ) : (
          <>
            {user && (
              <>
                <div className={styles.info}>
                  <span className={styles.fullname}>
                    {user?.lastName} {user?.firstName}
                  </span>
                  <span className={styles.role}>{roles[`${user?.role}`]}</span>
                </div>
                <div className={styles.avatar}>
                  {user?.firstName?.charAt(0).toUpperCase()}
                </div>
              </>
            )}
            {isShow && <Menu role={user?.role} />}
          </>
        )}
      </div>
    </div>
  )
}
