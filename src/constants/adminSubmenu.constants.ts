import {
  BookCopy,
  CalendarRange,
  LogOut,
  MessageSquareWarning,
  Newspaper,
  ScrollText,
  SquareGanttChart,
  Users
} from 'lucide-react'

import { DASHBOARD_PAGES } from '@/config/page-url.config'

export const AdminSubmenu = [
  {
    link: DASHBOARD_PAGES.MANAGE_EVENTS,
    name: 'Мероприятия',
    icon: CalendarRange,
    type: 'Ежедневная работа'
  },
  {
    link: DASHBOARD_PAGES.MANAGE_USERS,
    name: 'Пользователи',
    icon: Users,
    type: 'Ежедневная работа'
  },
  {
    link: DASHBOARD_PAGES.MANAGE_RESERVATIONS,
    name: 'Бронь',
    icon: SquareGanttChart,
    type: 'Ежедневная работа'
  },
  {
    link: DASHBOARD_PAGES.MANAGE_APPLICATIONS,
    name: 'Заявки',
    icon: ScrollText,
    type: 'Ежедневная работа'
  },
  {
    link: DASHBOARD_PAGES.REPORTS,
    name: 'Поддержка',
    icon: MessageSquareWarning,
    type: 'Ежедневная работа'
  },
  {
    link: DASHBOARD_PAGES.MANAGE_NEWS,
    name: 'Новости',
    icon: Newspaper,
    type: 'Ежедневная работа'
  },
  {
    link: DASHBOARD_PAGES.MANAGE_CATEGORY,
    name: 'Категории',
    icon: BookCopy,
    type: ''
  },
  {
    link: DASHBOARD_PAGES.HOME,
    name: 'Главная',
    icon: LogOut,
    type: ''
  }
  // {
  //   link: DASHBOARD_PAGES.MANAGE_CATEGORY,
  //   name: 'Категории',
  //   icon: BookCopy,
  //   type: 'Документы'
  // }
]
