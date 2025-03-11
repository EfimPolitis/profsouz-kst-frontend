'use client'

import cn from 'clsx'
import { m } from 'framer-motion'
import { LogOut, PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

import { SidebarData } from '@/components/frames/sidebar/sidebar.data'
import { ThemeLayout } from '@/components/layouts/theme'

import { URL_PAGES } from '@/config/url.config'

import styles from './index.module.scss'

const Sidebar = () => {
  const pathname = usePathname()
  const { push } = useRouter()

  const [isCollapsed, setIsCollapsed] = useState(false)
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <m.aside
      className={cn(styles.sidebar, {
        [styles.collapsed]: isCollapsed
      })}
      animate={{ width: isCollapsed ? 60 : 220 }}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
    >
      <div className={styles.buttons}>
        <button
          className={styles.toggle}
          title={isCollapsed ? 'Развернуть' : 'Свернуть'}
          onClick={toggleSidebar}
        >
          {isCollapsed ? <PanelLeftOpen /> : <PanelLeftClose />}
        </button>
        <ThemeLayout.ThemeToggler />
      </div>
      <ul>
        {SidebarData.map(({ link, name, icon: Icon }) => (
          <li key={link}>
            <Link
              href={link}
              className={cn({
                [styles.active]: pathname?.includes(link) && link !== '/'
              })}
              title={isCollapsed ? name : undefined}
            >
              <Icon size={24} />
              {!isCollapsed && <span>{name}</span>}
            </Link>
          </li>
        ))}
      </ul>
      <button
        className={styles.logout}
        title={isCollapsed ? 'Выйти' : undefined}
        onClick={() => {
          push(URL_PAGES.HOME)
        }}
      >
        <LogOut size={24} />
        {!isCollapsed && <span>На главную</span>}
      </button>
    </m.aside>
  )
}

export default Sidebar
