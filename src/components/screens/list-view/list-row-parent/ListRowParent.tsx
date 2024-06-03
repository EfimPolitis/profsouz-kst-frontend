import type { Dispatch, SetStateAction } from 'react'

import type { IResponseCategories } from '@/types/category.types'

import { ListAddRowInput } from '../list-add-row-input/ListAddRowInput'
import { ListRow } from '../list-row/ListRow'

import styles from './ListRowParent.module.scss'

interface IListRowParent {
  categories: IResponseCategories[] | undefined
  setCategories: Dispatch<SetStateAction<IResponseCategories[]>>
}

export const ListRowParent = ({
  categories,
  setCategories
}: IListRowParent) => {
  return (
    <div className={styles.listRowParent}>
      {categories?.length
        ? categories?.map(category => (
            <ListRow
              key={category.id}
              category={category}
              setCategories={setCategories}
            />
          ))
        : 'Здесь пока нет категорий'}
      {!categories?.some(category => !category.id) && (
        <ListAddRowInput setCategories={setCategories} />
      )}
    </div>
  )
}
