'use client'

import { SearchIcon, X } from 'lucide-react'
import { type InputHTMLAttributes, useEffect, useRef } from 'react'

import { useDebounce } from '@/hooks/useDebounce'
import { useFilters } from '@/hooks/useFilters'

import styles from './index.module.scss'

interface ISearch {
  placeholder: string
}

export type TypeSearchProps = InputHTMLAttributes<HTMLInputElement> & ISearch

export const Search = ({ placeholder, ...rest }: TypeSearchProps) => {
  const { updateQueryParams, isFilterReset, queryParams } = useFilters()
  console.log(queryParams.search)

  const inputRef = useRef<HTMLInputElement>(null)

  const [debounceSearch, search, setSearch] = useDebounce('', 500)

  useEffect(() => {
    updateQueryParams('search', search)
  }, [debounceSearch])

  useEffect(() => {
    if (isFilterReset) {
      setSearch('')
    }
  }, [isFilterReset])

  return (
    <div
      className={styles.search}
      {...rest}
    >
      <SearchIcon className={styles.search_icon} />
      <input
        type='text'
        placeholder={placeholder}
        className={styles.search_input}
        value={search}
        ref={inputRef}
        onChange={event => setSearch(event.target.value)}
      />
      {search && (
        <X
          className={styles.close}
          onClick={() => {
            setSearch('')
            if (inputRef.current) inputRef.current.focus()
          }}
        />
      )}
    </div>
  )
}
