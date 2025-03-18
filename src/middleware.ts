import Cookies from 'js-cookie'
import { NextRequest, NextResponse } from 'next/server'

import { URL_PAGES } from './config/url.config'
import { API_URL } from './constants/api.constants'
import { EnumTokens } from './services/auth/auth.service'
import { ERole } from './types/user.types'

export async function middleware(request: NextRequest, response: NextResponse) {
  const { url, cookies } = request

  const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN)?.value
  let accessToken = cookies.get(EnumTokens.ACCESS_TOKEN)?.value

  const isAuthPage = url.includes('/auth')
  const isResetPasswordPage = url.includes('/reset-password')
  const isEventsPage = url.includes('/events')
  const isMyEventsPage = url.includes('/my-events')

  const isUserPage = isEventsPage || isMyEventsPage
  const isAdminPage = url.includes('/admin')

  if (!refreshToken && !isAuthPage && !isResetPasswordPage) {
    request.cookies.delete(EnumTokens.ACCESS_TOKEN)

    return redirectToHome(isAdminPage, request)
  }

  if (isResetPasswordPage && !url.includes('?token=')) {
    return NextResponse.rewrite(new URL('404', request.url))
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
      const { role } = (await fetch(`${API_URL}/auth/access-token`, {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${accessToken}`
        }
      })
        .then(res => res.json())
        .then(data => data)) as { role: ERole }

      if (
        url.slice(-6) === '/admin' &&
        (role === ERole.ADMIN || role === ERole.MODER)
      )
        return NextResponse.redirect(
          new URL(URL_PAGES.MANAGE_EVENTS, request.url)
        )

      if (role === ERole.ADMIN || role === ERole.MODER)
        return NextResponse.next()

      if (role === ERole.USER && !isAdminPage) return NextResponse.next()
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
  matcher: [
    '/admin',
    '/admin/:path*',
    '/events/:path*',
    '/my-events/:path*',
    '/auth',
    '/reset-password'
  ]
}

const redirectToHome = (isAdminPage: boolean, request: NextRequest) => {
  return isAdminPage
    ? NextResponse.rewrite(new URL('404', request.url))
    : NextResponse.redirect(new URL(URL_PAGES.HOME, request.url))
}
