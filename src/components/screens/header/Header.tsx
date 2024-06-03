'use client'

import Cookies from 'js-cookie'
import { LogIn, MenuIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useLayoutEffect, useState } from 'react'

import Loader from '@/components/ui/loader/Loader'

import { MENU_PAGES } from '@/constants/menu.constants'

import { DASHBOARD_PAGES } from '@/config/page-url.config'

import { useOutside } from '@/hooks/useOutside'
import { useProfile } from '@/hooks/user/useProfile'

import { Menu } from '../menu/Menu'

import styles from './Header.module.scss'
import { getAccessToken } from '@/services/auth/auth.helper'

export const Header = () => {
  const { isShow, setIsShow, ref } = useOutside(false)
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const { data: user, isLoading, isFetching } = useProfile()

  useLayoutEffect(() => {
    if (getAccessToken()) return setAccessToken(getAccessToken())
  }, [isFetching])

  return (
    <>
      <header className={styles.header}>
        <div className={styles.menu_icon}>
          <MenuIcon />
        </div>
        <div>
          <Link
            href={DASHBOARD_PAGES.HOME}
            className={styles.logo}
            title={'Главная'}
          >
            <Image
              alt='logo'
              src={'/logo-profsouz-kst.png'}
              width={50}
              height={50}
            />
            <p>
              Профсоюз КСТ<span className={styles.alpha}>alpha</span>
            </p>
          </Link>
        </div>
        <div>
          <ul className={styles.menu}>
            {MENU_PAGES.map(({ url, title }) => (
              <li key={url}>
                <Link href={url}>{title}</Link>
              </li>
            ))}
          </ul>
        </div>
        {accessToken ? (
          isLoading ? (
            <Loader />
          ) : (
            <div
              className={styles.profile}
              onClick={() => setIsShow(!isShow)}
            >
              <p>
                {user?.lastName.replace(
                  user?.lastName[0],
                  user?.lastName[0].toUpperCase()
                )}
              </p>
              <p>
                {user?.firstName.replace(
                  user?.firstName[0],
                  user?.firstName[0].toUpperCase()
                )}
              </p>
              <div className={styles.profile_icon}>
                {user?.userName.charAt(0).toLocaleUpperCase()}
              </div>
            </div>
          )
        ) : (
          <Link
            href={DASHBOARD_PAGES.AUTH}
            className={styles.login}
          >
            Войти
            <LogIn />
          </Link>
        )}
      </header>
      {isShow && (
        <Menu
          ref={ref}
          role={user?.role}
          setIsShow={setIsShow}
        />
      )}
    </>
  )
}
