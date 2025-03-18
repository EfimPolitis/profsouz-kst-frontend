import axios from 'axios'
import { Metadata } from 'next'
import { cookies } from 'next/headers'

import { Header } from '@/components/frames'
import { NewsPageId } from '@/components/pages/admin/news/[newsId]'

import { API_URL } from '@/constants/api.constants'

import { INews } from '@/types/news.types'

type Props = {
  params: { newsId: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { newsId } = params
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')?.value

  const response = await axios.get<INews>(`${API_URL}/news/${newsId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  const event = response.data

  if (!event) return {}

  return {
    title: event.title,
    openGraph: {
      images: [event.images[0].url]
    }
  }
}

const Page = () => (
  <>
    <Header />
    <NewsPageId />
  </>
)

export default Page
