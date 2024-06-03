import Cookies from 'js-cookie'
import { NextRequest, NextResponse } from 'next/server'

import { DASHBOARD_PAGES } from './config/page-url.config'
import { API_URL } from './constants/api.constants'
import { EnumTokens } from './services/auth/auth.service'

export async function middleware(request: NextRequest, response: NextResponse) {
  const { url, cookies } = request

  const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN)?.value
  let accessToken = cookies.get(EnumTokens.ACCESS_TOKEN)?.value

  const isAuthPage = url.includes('/auth')
  const isEventsPage = url.includes('/events')
  const isMyEventsPage = url.includes('/my-events')

  const isUserPage = isEventsPage || isMyEventsPage
  const isModerPage =
    url.includes('/admin') &&
    !url.includes('/users/create') &&
    !url.includes('/users/edit')
  const isAdminPage = url.includes('/admin')

  // if (!refreshToken) {
  //   request.cookies.delete(EnumTokens.ACCESS_TOKEN)

  //   return redirectToHome(isAdminPage, request)
  // }

  if (refreshToken) {
    Cookies.set(EnumTokens.REFRESH_TOKEN, refreshToken, {
      domain: 'localhost'
    })
  }

  if (!accessToken && refreshToken) {
    try {
      const data = await fetch(`${API_URL}/auth/login/access-token`, {
        headers: {
          Cookie: `refreshToken=${refreshToken}`
        },
        credentials: 'include',
        method: 'Post'
      })
        .then(res => res.json())
        .then(data => data)

      accessToken = data?.accessToken
    } catch (error) {
      request.cookies.delete(EnumTokens.ACCESS_TOKEN)
      return redirectToHome(isAdminPage, request)
    }
  }

  if (isAuthPage && refreshToken) {
    return redirectToHome(isAdminPage, request)
  }

  try {
    if (refreshToken) {
      const { role } = await fetch(`${API_URL}/auth/access-token`, {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${accessToken}`
        }
      })
        .then(res => res.json())
        .then(data => data)

      if (role === 'ADMIN') return NextResponse.next()

      if (role === 'MODER' && isModerPage) return NextResponse.next()

      if (role === 'USER' && !isAdminPage) return NextResponse.next()
    }

    if (isAdminPage || isUserPage) {
      return NextResponse.rewrite(new URL('/404', url))
    }

    return NextResponse.next()
  } catch (error) {
    cookies.delete(EnumTokens.ACCESS_TOKEN)
    return redirectToHome(isAdminPage, request)
  }
}

export const config = {
  matcher: ['/admin/:path*', '/events/:path*', '/my-events/:path*', '/auth']
}

const redirectToHome = (isAdminPage: boolean, request: NextRequest) => {
  return isAdminPage
    ? NextResponse.rewrite(new URL('404', request.url))
    : NextResponse.redirect(new URL(DASHBOARD_PAGES.HOME, request.url))
}
