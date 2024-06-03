'use client'

import { ListRowParent } from '@/components/screens/list-view/list-row-parent/ListRowParent'
import Loader from '@/components/ui/loader/Loader'

import { useGetCategories } from '@/hooks/category/useGetCategories'

import styles from './Category.module.scss'

const CategoryPage = () => {
  const { categories, setCategories, isLoading, error } = useGetCategories()

  return (
    <div className={styles.page}>
      {isLoading ? (
        <Loader />
      ) : (
        <ListRowParent
          categories={categories}
          setCategories={setCategories}
        />
      )}
    </div>
  )
}

export default CategoryPage
