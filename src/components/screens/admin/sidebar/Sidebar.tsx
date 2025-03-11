'use client'

import cn from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { AdminSubmenu } from '@/constants/adminSubmenu.constants'

import styles from './sidebar.module.scss'

interface ISubmenu {
  isOpenPanel: boolean
}

export const Submenu = ({ isOpenPanel }: ISubmenu) => {
  const pathname = usePathname()

  return (
    <aside
      className={styles.sidebar}
      style={isOpenPanel ? { width: '280px' } : { width: '0px' }}
    >
      <ul>
        {isOpenPanel &&
          AdminSubmenu.map(({ link, name, icon: Icon }) => (
            <li key={link}>
              <Link
                href={link}
                className={cn({
                  [styles.active]: pathname?.includes(link) && link !== '/'
                })}
              >
                <p>{name}</p>
                <Icon size={24} />
              </Link>
            </li>
          ))}
      </ul>
    </aside>
  )
}
