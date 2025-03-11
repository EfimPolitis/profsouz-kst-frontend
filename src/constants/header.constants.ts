import { URL_PAGES } from '@/config/url.config'

export const HEADER_PAGES = [
  { url: URL_PAGES.HOME, title: 'Главная', access: false },
  { url: URL_PAGES.NEWS, title: 'Новости', access: false },
  { url: URL_PAGES.EVENTS, title: 'Мероприятия', access: true },
  { url: URL_PAGES.DOCUMENTS, title: 'Документы', access: false },
  { url: URL_PAGES.ABOUT, title: 'О нас', access: false }
]
