'use client'

import { Download } from 'lucide-react'

import { Button } from '@/components/ui'

import { API_URL } from '@/constants/api.constants'

import styles from './index.module.scss'

const DownloadAppPage = () => {
  const handleDownloadApp = () => {
    const downloadUrl = `${API_URL}/download`

    // Создаём ссылку и кликаем по ней
    const a = document.createElement('a')
    a.href = downloadUrl
    a.download = ''
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <div className={styles.download_page}>
      <div className={styles.download_block}>
        <Download size={180} />
        <h2>Скачать настольную версию админ панели Профсоюза КСТ</h2>
        <Button
          text='Скачать'
          onClick={handleDownloadApp}
        />
      </div>
    </div>
  )
}

export default DownloadAppPage
