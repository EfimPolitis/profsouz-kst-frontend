'use client'

import cn from 'clsx'
import { LogOut } from 'lucide-react'
import Link from 'next/link'
import React, { Dispatch, SetStateAction } from 'react'

import { ERole } from '@/types/user.types'

import { useLogout } from '@/hooks/auth/useLogout'

import styles from './index.module.scss'
import { MENU_DATA } from './menu.data'

interface IMenu {
  role: string | undefined
}

export const Menu = ({ role: userRole }: IMenu) => {
  const { mutate } = useLogout()
  const handleLogout = () => {
    mutate()
  }

  return (
    <div className={cn(styles.menu)}>
      <ul>
        {MENU_DATA.map(({ link, title, icon: Icon, role }) => {
          if (
            (role === ERole.MODER && userRole === ERole.MODER) ||
            userRole === ERole.ADMIN
          ) {
            return (
              <li key={link}>
                <Link href={link}>
                  {title}
                  <Icon />
                </Link>
              </li>
            )
          } else if (!role) {
            return (
              <li key={link}>
                <Link href={link}>
                  {title}
                  <Icon />
                </Link>
              </li>
            )
          }
        })}
        <li
          className={styles.logout}
          onClick={event => {
            event.stopPropagation()
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

Menu.displayName = 'menu'
