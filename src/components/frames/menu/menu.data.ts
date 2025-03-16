import {
  CalendarRange,
  Layout,
  LucideIcon,
  SquareGanttChart,
  User
} from 'lucide-react'

import { ERole } from '@/types/user.types'

import { URL_PAGES } from '@/config/url.config'

interface IMenuData {
  link: string
  title: string
  icon: LucideIcon
  role?: ERole
}

export const MENU_DATA: IMenuData[] = [
  {
    link: URL_PAGES.ADMIN,
    title: 'Админ панель',
    icon: Layout,
    role: ERole.MODER
  },
  { link: URL_PAGES.PROFILE, title: 'Профиль', icon: User },
  { link: URL_PAGES.NEWS, title: 'Новости', icon: CalendarRange },
  {
    link: URL_PAGES.EVENTS,
    title: 'Мероприятия',
    icon: CalendarRange
  },
  {
    link: URL_PAGES.MY_EVENTS,
    title: 'Мои мероприятия',
    icon: SquareGanttChart
  }
]
