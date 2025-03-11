import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { SITE_NAME } from '@/constants/seo.constants'

import { Providers } from './providers'
import '@/styles/_variables.scss'
import '@/styles/global.scss'

const zen = Inter({
  subsets: ['cyrillic', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-stack',
  style: ['normal']
})

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`
  },
  description: 'Сайт профсоюза Колледжа Современных Технологий',
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    other: {
      url: '/icon.png',
      sizes: '512x512',
      type: 'image/png'
    }
  },
  formatDetection: {
    telephone: false
  },
  metadataBase: new URL('https://profunions.ru'),
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: 'Профсоюз КСТ',
    description: 'Сайт профсоюза Колледжа Современных Технологий',
    images: [
      {
        url: '/bg-mainscreen.png',
        width: 1000,
        height: 613,
        alt: 'Профсоюз КСТ'
      }
    ]
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ru'>
      <body className={zen.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
