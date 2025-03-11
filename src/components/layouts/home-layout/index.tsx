'use client'

import { PropsWithChildren } from 'react'

import { Footer } from '@/components/frames/footer'
import { Header } from '@/components/frames/header'

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className='wrap'>
      <Header />
      {children}
      <Footer />
    </div>
  )
}
export default Layout
