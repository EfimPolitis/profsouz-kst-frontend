'use client'

import cn from 'clsx'
import { CalendarRange, Layout, LogOut, SquareGanttChart } from 'lucide-react'
import Link from 'next/link'
import { Dispatch, RefObject, SetStateAction, forwardRef } from 'react'

import { URL_PAGES } from '@/config/url.config'

import { useLogout } from '@/hooks/user/useLogout'

import styles from './index.module.scss'

interface IMenu {
  setIsShow: Dispatch<SetStateAction<boolean>>
  role: string | undefined
  ref: RefObject<HTMLDivElement> | undefined
}

export const Menu = forwardRef<HTMLDivElement, IMenu>(
  ({ setIsShow, role }, ref) => {
    const { mutate } = useLogout()
    const handleLogout = () => mutate()

    return (
      <div
        className={cn(styles.menu)}
        ref={ref}
        onClick={() => setIsShow(false)}
      >
        <ul>
          {(role === 'ADMIN' || role === 'MODER') && (
            <li>
              <Link href={URL_PAGES.MANAGE_EVENTS}>
                Админ панель
                <Layout />
              </Link>
            </li>
          )}
          <li>
            <Link href={URL_PAGES.NEWS}>
              Новости
              <CalendarRange />
            </Link>
          </li>
          <li>
            <Link href={URL_PAGES.EVENTS}>
              Мероприятия
              <CalendarRange />
            </Link>
          </li>
          <li>
            <Link href={URL_PAGES.MY_EVENTS}>
              Мои мероприятия
              <SquareGanttChart />
            </Link>
          </li>
          <li
            className={styles.logout}
            onClick={event => {
              // event.stopPropagation() // Останавливаем всплытие
              handleLogout()
            }}
          >
            Выйти
            <LogOut />
          </li>
        </ul>
      </div>
    )
  }
)

Menu.displayName = 'menu'
