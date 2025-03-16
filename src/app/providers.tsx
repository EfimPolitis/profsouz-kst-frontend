'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { LazyMotion, domAnimation } from 'framer-motion'
import { PropsWithChildren, useState } from 'react'

import { ReactScan } from '@/components/layouts/react-scan'
import { ThemeLayout } from '@/components/layouts/theme'

export const Providers = ({ children }: PropsWithChildren) => {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false
        }
      }
    })
  )

  return (
    <LazyMotion features={domAnimation}>
      <QueryClientProvider client={client}>
        <ThemeLayout>
          {children}
          {/* <ReactScan /> */}
          <ReactQueryDevtools initialIsOpen={false} />
        </ThemeLayout>
      </QueryClientProvider>
    </LazyMotion>
  )
}
