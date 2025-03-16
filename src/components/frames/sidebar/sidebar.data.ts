import {
  BookCopy,
  CalendarRange,
  Download,
  LucideIcon,
  Newspaper,
  SquareGanttChart,
  Users
} from 'lucide-react'

import { URL_PAGES } from '@/config/url.config'

interface ISidebarData {
  name: string
  icon: LucideIcon
  link: string
}

export const SidebarData = [
  {
    name: 'Мероприятия',
    icon: CalendarRange,
    link: URL_PAGES.MANAGE_EVENTS
  },
  {
    name: 'Пользователи',
    icon: Users,
    link: URL_PAGES.MANAGE_USERS
  },
  {
    name: 'Заявки',
    icon: SquareGanttChart,
    link: URL_PAGES.MANAGE_APPLICATIONS
  },
  {
    name: 'Новости',
    icon: Newspaper,
    link: URL_PAGES.MANAGE_NEWS
  },
  {
    name: 'Категории',
    icon: BookCopy,
    link: URL_PAGES.MANAGE_CATEGORY
  },
  {
    name: 'Установщик',
    icon: Download,
    link: URL_PAGES.DOWNLOAD
  }
]
