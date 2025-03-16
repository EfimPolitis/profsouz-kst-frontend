import Layout from '@/components/layouts/home-layout'
import {
  EmployeesBlock,
  FirstScreen,
  InfoBlock,
  NewsBlock,
  RecruitmentBlock,
  StatisticBlock,
  TelegramBlock,
  WhatsappBlock
} from '@/components/pages/home'

export default function Home() {
  return (
    <Layout>
      <main>
        <FirstScreen />
        <InfoBlock />
        <StatisticBlock />
        <NewsBlock />
        <EmployeesBlock />
        {/* <TelegramBlock /> */}
        <RecruitmentBlock />
        <WhatsappBlock />
      </main>
    </Layout>
  )
}
