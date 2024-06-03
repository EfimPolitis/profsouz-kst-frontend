'use client'

import cn from 'clsx'
import {
  CalendarRange,
  LayoutDashboard,
  LogOut,
  SquareGanttChart
} from 'lucide-react'
import { getDisplayName } from 'next/dist/shared/lib/utils'
import Link from 'next/link'
import { Dispatch, FC, RefObject, SetStateAction, forwardRef } from 'react'

import { DASHBOARD_PAGES } from '@/config/page-url.config'

import { useLogout } from '@/hooks/user/useLogout'

import styles from './Menu.module.scss'

interface IMenu {
  setIsShow: Dispatch<SetStateAction<boolean>>
  role: string | undefined
  ref: RefObject<HTMLDivElement> | undefined
}

export const Menu = forwardRef<HTMLDivElement, IMenu>(
  ({ setIsShow, role }, ref) => {
    const { mutate } = useLogout()

    return (
      <div
        className={cn(styles.menu)}
        onClick={() => setIsShow(false)}
        ref={ref}
      >
        <ul>
          {(role === 'ADMIN' || role === 'MODER') && (
            <li>
              <Link href={DASHBOARD_PAGES.ADMIN}>
                Админ панель
                <LayoutDashboard />
              </Link>
            </li>
          )}
          <li>
            <Link href={DASHBOARD_PAGES.EVENTS}>
              Мероприятия
              <CalendarRange />
            </Link>
          </li>
          <li>
            <Link href={DASHBOARD_PAGES.MY_EVENTS}>
              Мои мероприятия
              <SquareGanttChart />
            </Link>
          </li>
          <li
            className={styles.logout}
            onClick={() => {
              mutate()
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
