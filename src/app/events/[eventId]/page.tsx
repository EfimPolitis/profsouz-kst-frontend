import axios from 'axios'
import { Metadata } from 'next'
import { cookies } from 'next/headers'

import { Header } from '@/components/frames'
import { EventPageId } from '@/components/pages/admin/events/[eventId]'

import { API_URL } from '@/constants/api.constants'

import { IEvent } from '@/types/event.types'

type Props = {
  params: { eventId: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { eventId } = params
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')?.value

  const response = await axios.get<IEvent>(`${API_URL}/event/${eventId}`, {
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
    <EventPageId />
  </>
)

export default Page
