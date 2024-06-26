import cn from 'clsx'
import { ArrowDownUp, ChevronDown } from 'lucide-react'

import { EType, ISort } from '@/types/sort.types'

import { useOutside } from '@/hooks/useOutside'

import styles from './Sort.module.scss'

export const Sort = ({ list, sort, setSort, type, setType }: ISort) => {
  const { isShow, setIsShow, ref } = useOutside(false)

  return (
    <div
      className={styles.sort}
      ref={ref}
    >
      <div className={styles.sort_field}>
        Сортировка:
        <div
          className={styles.selected}
          onClick={() => setIsShow(!isShow)}
        >
          <span>{sort?.label}</span>
          <ChevronDown className={styles.icon} />
        </div>
        <button
          className={cn(styles.order, type === EType.desc && styles.active)}
          onClick={() => setType(type === EType.asc ? EType.desc : EType.asc)}
          title={
            type === EType.asc ? 'В порядке убывания' : 'В порядке возрастания'
          }
        >
          <ArrowDownUp size={24} />
        </button>
      </div>
      {isShow && (
        <div className={styles.menu}>
          <ul>
            {list.map(item => (
              <li
                onClick={() => {
                  setSort(item)
                  setIsShow(!isShow)
                }}
                key={item.value}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
