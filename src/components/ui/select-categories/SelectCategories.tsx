import { X } from 'lucide-react'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { FieldError, Merge } from 'react-hook-form'

import { IResponseCategories } from '@/types/category.types'

import styles from './SelectCategories.module.scss'

interface ISelectCategories {
  onChange: Dispatch<SetStateAction<string[]>>
  value: string[]
  categories: IResponseCategories[]
  error?: Merge<FieldError, (FieldError | undefined)[]>
}

export const SelectCategories = ({
  onChange,
  value,
  categories,
  error
}: ISelectCategories) => {
  const [categoriesName, setCategoriesName] = useState<string[]>([])
  const onClickCategory = (category: IResponseCategories) => {
    onChange(
      [...value, category.id].filter(
        (item, pos) => [...value, category.id].indexOf(item) == pos
      )
    )

    setCategoriesName(
      [...categoriesName, category.name].filter(
        (item, pos) => [...categoriesName, category.name].indexOf(item) == pos
      )
    )
  }

  const onClickRemoveCategory = (category: string, i: number) => {
    setCategoriesName(categoriesName.filter(name => name !== category))

    onChange(value.filter((obj, ind) => ind !== i))
  }

  useEffect(() => {
    const result = []

    for (const category of categories) {
      for (const categoryId of value) {
        if (category.id === categoryId) result.push(category.name)
      }
    }

    setCategoriesName(result)
  }, [categories, value])

  return (
    <div className={styles.select_categories}>
      <ul className={styles.selected_list}>
        {categoriesName.map((category, i) => (
          <li key={category}>
            {category}
            <button
              type='button'
              className={styles.delete}
              onClick={() => onClickRemoveCategory(category, i)}
            >
              <X
                size={15}
                color='#fff'
                strokeWidth={3}
              />
            </button>
          </li>
        ))}
      </ul>
      <ul className={styles.categories_list}>
        {categories.map(category => (
          <li
            key={category.id}
            onClick={() => onClickCategory(category)}
          >
            {category?.name}
          </li>
        ))}
      </ul>
      {error && <div className={styles.error}>{error.message}</div>}
    </div>
  )
}
