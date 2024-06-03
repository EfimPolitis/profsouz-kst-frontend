import { Check, Trash2 } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { TransparentField } from '@/components/ui/fields/transparent-field/TransparentField'
import Loader from '@/components/ui/loader/Loader'
import { SingleSelect } from '@/components/ui/single-select/SingleSelect'

import type { IResponseCategories } from '@/types/category.types'

import { useCategoryDebounce } from '@/hooks/category/useCategoryDebounce'
import { useCreateCategory } from '@/hooks/category/useCreateCategory'
import { useDeleteCategory } from '@/hooks/category/useDeleteCategory'

import styles from './LlistRow.module.scss'

interface IListRow {
  category: IResponseCategories
  setCategories: Dispatch<SetStateAction<IResponseCategories[]>>
}

export const ListRow = ({ category, setCategories }: IListRow) => {
  const { deleteCategory, isDeletePanding } = useDeleteCategory()

  const { register, control, watch } = useForm({
    defaultValues: {
      name: category.name,
      color: category.color
    }
  })

  //@ts-ignore
  useCategoryDebounce({ id: category?.id, watch })
  // const { isSuccess } = useCreateCategory()
  // console.log(isSuccess)

  return (
    <div className={styles.list_row}>
      <TransparentField
        placeholder='Новая категория'
        {...register('name')}
      />
      {/* <Controller
          control={control}
          name='color'
          render={({ field: { value, onChange } }) => (
            <SingleSelect
              data={['red', 'orange', 'green', 'blue', 'cian'].map(item => ({
                value: item,
                label: item
              }))}
              onChange={onChange}
              value={value || ''}
            />
          )}
        /> */}
      <div>
        {/* {isSuccess && (
          <Check
            size={24}
            color='green'
          />
        )} */}
        <button
          onClick={() =>
            category?.id
              ? confirm('Вы действительно хотите удалить эту категорию?') &&
                deleteCategory(category.id)
              : setCategories(prev => prev.slice(0, -1))
          }
          className={styles.trash}
        >
          {isDeletePanding ? <Loader size={24} /> : <Trash2 size={24} />}
        </button>
      </div>
    </div>
  )
}
