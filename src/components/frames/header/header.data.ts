import { URL_PAGES } from '@/config/url.config'

interface IHeaderData {
  link: string
  title: string
  access: boolean
}

export const HEADER_DATA: IHeaderData[] = [
  { link: URL_PAGES.HOME, title: 'Главная', access: false },
  { link: URL_PAGES.NEWS, title: 'Новости', access: false },
  { link: URL_PAGES.EVENTS, title: 'Мероприятия', access: true },
  { link: URL_PAGES.DOCUMENTS, title: 'Документы', access: false },
  { link: URL_PAGES.ABOUT, title: 'О нас', access: false }
]
