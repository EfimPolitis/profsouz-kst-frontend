'use client'

import { Undo2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { CSSProperties } from 'react'

import styles from './UndoBtn.module.scss'

interface IUndoBtn {
  style?: CSSProperties
  size?: number
}

export const UndoBtn = ({ style, size }: IUndoBtn) => {
  const { back } = useRouter()
  return (
    <button
      onClick={() => back()}
      className={styles.undo_btn}
      style={style}
    >
      <Undo2 size={size} />
    </button>
  )
}
