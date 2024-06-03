import { ChevronDown } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

import { IResponseCategories } from '@/types/category.types'

import styles from './ListAddRowInput.module.scss'

interface IListAddRowInput {
  setCategories: Dispatch<SetStateAction<IResponseCategories[]>>
}

export const ListAddRowInput = ({ setCategories }: IListAddRowInput) => {
  const addRow = () => {
    //@ts-ignore
    setCategories(prev => {
      if (!prev) return

      return [
        ...prev,
        {
          id: '',
          name: '',
          color: 'default'
        }
      ]
    })
  }

  return (
    <button
      className={styles.addRowBtn}
      onClick={addRow}
    >
      Новая категория <ChevronDown size={32} />
    </button>
  )
}
