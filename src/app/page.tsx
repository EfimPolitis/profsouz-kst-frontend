import Layout from '@/components/layout/Layout'
import {
  EmployeesBlock,
  FirstScreen,
  InfoBlock,
  NewsBlock,
  RecruitmentBlock,
  StatisticBlock,
  TelegramBlock,
  WhatsappBlock
} from '@/components/screens/home'

export default function Home() {
  return (
    <Layout>
      <main>
        <FirstScreen />
        <InfoBlock />
        <StatisticBlock />
        <EmployeesBlock />
        <NewsBlock />
        <TelegramBlock />
        <RecruitmentBlock />
        <WhatsappBlock />
      </main>
    </Layout>
  )
}
