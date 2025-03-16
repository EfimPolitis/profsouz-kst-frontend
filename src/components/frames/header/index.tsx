'use client'

import cn from 'clsx'
import { LogIn, MenuIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLayoutEffect, useState } from 'react'

import { Loader } from '@/components/ui'
import { ThemeToggler } from '@/components/ui/buttons/theme-toggle'

import { URL_PAGES } from '@/config/url.config'

import { useOutside } from '@/hooks/useOutside'
import { useProfile } from '@/hooks/user/useProfile'

import { Menu } from '../menu'

import { HEADER_DATA } from './header.data'
import styles from './index.module.scss'
import { getAccessToken } from '@/services/auth/auth.helper'

export const Header = () => {
  const pathname = usePathname()

  const { isShow, setIsShow, ref } = useOutside(false)
  const { data: user, isLoading, isFetching } = useProfile()

  const [accessToken, setAccessToken] = useState<string | null>(null)

  const handleToggle = (event: React.MouseEvent) => {
    event.stopPropagation()
    setIsShow(prev => !prev)
  }

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
            {HEADER_DATA.map(({ link, title, access }) => {
              if (access && accessToken) {
                return (
                  <li key={link}>
                    <Link
                      href={link}
                      className={cn({
                        [styles.active]:
                          (pathname?.includes(link) && link !== '/') ||
                          (link === '/' && pathname === '/')
                      })}
                    >
                      {title}
                    </Link>
                  </li>
                )
              } else if (!access) {
                return (
                  <li key={link}>
                    <Link
                      href={link}
                      className={cn({
                        [styles.active]:
                          (pathname?.includes(link) && link !== '/') ||
                          (link === '/' && pathname === '/')
                      })}
                    >
                      {title}
                    </Link>
                  </li>
                )
              }
            })}
          </ul>
        </nav>
        <div className={styles.containerProfile}>
          <ThemeToggler />
          {isLoading ? (
            <div className={styles.profile}>
              <div className={styles.profile_icon}>
                <Loader />
              </div>
            </div>
          ) : accessToken ? (
            <div
              className={styles.profile}
              onClick={handleToggle}
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
              {isShow && <Menu role={user?.role} />}
            </div>
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
    </>
  )
}
