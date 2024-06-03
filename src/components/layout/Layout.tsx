'use client'

import { PropsWithChildren } from 'react'

import { Footer } from '../screens/footer/Footer'
import { Header } from '../screens/header/Header'

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className='wrap'>
      <style jsx>{`
        * {
          color: #003f81;
        }
      `}</style>
      <Header />
      {children}
      <Footer />
    </div>
  )
}
export default Layout
