'use client'

import { Menu } from '@components/frames/menu'

import { Loader } from '@/components/ui'

import { roles } from '@/constants/roles.constants'

import { useOutside } from '@/hooks/useOutside'
import { useProfile } from '@/hooks/user/useProfile'

import styles from './index.module.scss'

export const Profile = () => {
  const { isShow, setIsShow, ref } = useOutside(false)
  const { profile, isLoading } = useProfile()

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
            {profile && (
              <>
                <div className={styles.info}>
                  <span className={styles.fullname}>
                    {profile?.lastName} {profile?.firstName}
                  </span>
                  <span className={styles.role}>
                    {roles[`${profile?.role}`]}
                  </span>
                </div>
                <div className={styles.avatar}>
                  {profile?.firstName?.charAt(0).toUpperCase()}
                </div>
              </>
            )}
            {isShow && <Menu role={profile?.role} />}
          </>
        )}
      </div>
    </div>
  )
}
