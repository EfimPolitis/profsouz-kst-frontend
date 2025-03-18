import { isDev } from '@/config/is-dev.config'

export const API_URL = isDev
  ? 'http://localhost:5000/api'
  : 'https://profunions.ru/api'
export const IS_CLIENT = typeof window !== 'undefined'
