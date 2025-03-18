'use client'

import cn from 'clsx'
import { m } from 'framer-motion'
import { useEffect, useState } from 'react'

import { Button, DateInput, InputSelect } from '@/components/ui'

import { useFilters } from '@/hooks/useFilters'

import { FILTER_DATA } from './filter.data'
import styles from './index.module.scss'

interface IFilters {
  isOpen: boolean
  type: 'event' | 'user' | 'application' | 'news'
  handleResetFilter: () => void
}

export const FilterComponent = ({
  isOpen,
  type,
  handleResetFilter
}: IFilters) => {
  const { updateQueryParams, isFilterReset } = useFilters()

  const [resetKey, setResetKey] = useState(0)

  useEffect(() => {
    if (isFilterReset) {
      setResetKey(prev => prev + 1)
    }
  }, [isFilterReset])

  return (
    <div className={styles.filter}>
      <m.div
        className={cn(styles.menu, {
          [styles.hidden]: !isOpen
        })}
        animate={{
          height: isOpen ? 'min-content' : 0
        }}
        transition={{
          type: 'tween'
        }}
      >
        <div className={styles.fields}>
          {FILTER_DATA[type]?.map(({ title, type, inputs_block }) => (
            <section
              key={title}
              className={cn({
                [styles.date_section]: type === 'date',
                [styles.type_section]: type === 'select'
              })}
            >
              <h4>{title}</h4>
              {inputs_block.map(input => (
                <div
                  className={styles.input_block}
                  key={input.queryKey}
                >
                  {input.type === 'date' && (
                    <>
                      <span>{input?.label}</span>
                      <DateInput
                        key={resetKey}
                        type={input?.options?.type}
                        style={input?.options?.style}
                        onChange={event =>
                          updateQueryParams(input.queryKey, event.target.value)
                        }
                      />
                    </>
                  )}
                  {input.type === 'select' && (
                    <InputSelect
                      key={resetKey}
                      data={input?.options?.data}
                      initialValue={input?.options?.data?.[0]?.label}
                      updateQueryParams={updateQueryParams}
                      queryKey={input?.queryKey}
                      style={input?.options?.style}
                      top={55}
                    />
                  )}
                </div>
              ))}
            </section>
          ))}
        </div>
        <Button
          onClick={handleResetFilter}
          className={styles.resetBtn}
        >
          <p>Сбросить фильтры</p>
        </Button>
      </m.div>
    </div>
  )
}
