'use client'

import cn from 'clsx'
import { LogOut } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { AdminSubmenu } from '@/constants/adminSubmenu.constants'

import { DASHBOARD_PAGES } from '@/config/page-url.config'

import styles from './Submenu.module.scss'

export const Submenu = () => {
  const pathname = usePathname()

  return (
    <div className={styles.submenu}>
      <ul>
        {AdminSubmenu.map(({ link, name, icon: Icon }) => (
          <li key={link}>
            <Link
              href={link}
              className={cn({
                [styles.active]: pathname?.includes(link)
              })}
            >
              {name}
              <Icon />
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href={DASHBOARD_PAGES.HOME}
        className={styles.home}
      >
        На главную
        <LogOut />
      </Link>
    </div>
  )
}
