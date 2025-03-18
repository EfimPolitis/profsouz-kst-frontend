import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { type Dispatch, type SetStateAction } from 'react'

import { Button, Loader, Search } from '@/components/ui'

import type { IResponseCategory } from '@/types/category.types'
import type { IQueryParam } from '@/types/query.types'

import { ListAddRowInput } from '../list-add-row-input'
import { ListRow } from '../list-row'

import styles from './index.module.scss'

interface IListRowParent {
  categories: IResponseCategory[] | undefined
  setCategories: Dispatch<SetStateAction<IResponseCategory[]>>
  updateQueryParams: (key: keyof IQueryParam, value: string) => void
  isLoading: boolean
  refetch: (
    options?: RefetchOptions
  ) => Promise<
    QueryObserverResult<AxiosResponse<IResponseCategory[], any>, Error>
  >
}

export const ListRowParent = ({
  categories,
  refetch,
  setCategories,
  isLoading
}: IListRowParent) => {
  return (
    <div className={styles.listRowParent}>
      <Search
        placeholder='Поиск'
        style={{ width: '100%' }}
      />
      {!categories?.some(category => !category.id) && (
        <ListAddRowInput setCategories={setCategories} />
      )}
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.listCategories}>
          {categories?.length ? (
            categories
              ?.map(category => (
                <ListRow
                  key={category.id}
                  category={category}
                  setCategories={setCategories}
                />
              ))
              .reverse()
          ) : (
            <>
              {isLoading ? (
                <div className={styles.not_found}>
                  <Loader size={50} />
                </div>
              ) : (
                !categories?.length && (
                  <div className={styles.not_found}>
                    <h3>Категории не были найдены</h3>
                    <Button
                      onClick={() => refetch()}
                      style={{ height: '50px' }}
                    >
                      <p>Обновить</p>
                    </Button>
                  </div>
                )
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}
