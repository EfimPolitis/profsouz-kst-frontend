'use client'

import { LogIn, MenuIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useLayoutEffect, useState } from 'react'

import { Loader } from '@/components/ui'
import { ThemeToggler } from '@/components/ui/theme-toggle'

import { HEADER_PAGES } from '@/constants/header.constants'

import { URL_PAGES } from '@/config/url.config'

import { useOutside } from '@/hooks/useOutside'
import { useProfile } from '@/hooks/user/useProfile'

import { Menu } from '../menu'

import styles from './index.module.scss'
import { getAccessToken } from '@/services/auth/auth.helper'

export const Header = () => {
  const { isShow, setIsShow, ref } = useOutside(false)
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const { data: user, isLoading, isFetching } = useProfile()

  useLayoutEffect(() => {
    if (getAccessToken()) return setAccessToken(getAccessToken())
    else return setAccessToken(null)
  }, [isFetching, accessToken])

  return (
    <>
      <header className={styles.header}>
        <div className={styles.menu_icon}>
          <MenuIcon />
        </div>
        <div>
          <Link
            href={URL_PAGES.HOME}
            className={styles.logo}
            title={'Главная'}
          >
            <Image
              alt='logo'
              src={'/icon.png'}
              width={50}
              height={50}
            />
            <p>Профсоюз КСТ</p>
          </Link>
        </div>

        <nav>
          <ul className={styles.menu}>
            {HEADER_PAGES.map(({ url, title, access }) => {
              if (access && accessToken) {
                return (
                  <li key={url}>
                    <Link href={url}>{title}</Link>
                  </li>
                )
              } else if (!access) {
                return (
                  <li key={url}>
                    <Link href={url}>{title}</Link>
                  </li>
                )
              }
            })}
          </ul>
        </nav>
        <div className={styles.containerProfile}>
          <ThemeToggler />
          {accessToken ? (
            isLoading ? (
              <Loader />
            ) : (
              <div
                className={styles.profile}
                onClick={() => setIsShow(!isShow)}
                ref={ref}
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
                  {user?.firstName.charAt(0).toLocaleUpperCase()}
                </div>
              </div>
            )
          ) : (
            <Link
              href={URL_PAGES.AUTH}
              className={styles.login}
            >
              Войти
              <LogIn />
            </Link>
          )}
        </div>
      </header>
      {isShow && (
        <Menu
          role={user?.role}
          setIsShow={setIsShow}
          ref={ref}
        />
      )}
    </>
  )
}
