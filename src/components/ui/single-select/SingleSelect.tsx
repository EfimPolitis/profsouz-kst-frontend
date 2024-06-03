import { Dispatch, SetStateAction } from 'react'

import { IResponseCategories } from '@/types/category.types'

import styles from './SingleSelect.module.scss'

interface IData {
  value: string
  label: string
}

interface ISingleSelectData {
  data: IData[]
  onChange: Dispatch<SetStateAction<IResponseCategories>>
  value: string
}

export const SingleSelect = ({ data, onChange, value }: ISingleSelectData) => {
  return <div>SingleSelect</div>
}
