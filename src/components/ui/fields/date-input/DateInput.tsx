import {
  CSSProperties,
  DetailedHTMLProps,
  InputHTMLAttributes,
  forwardRef
} from 'react'
import { FieldError } from 'react-hook-form'

import { useFormatDate } from '@/hooks/useFormatDate'

import styles from './DateInput.module.scss'

interface IDateInput {
  style?: CSSProperties
  error?: FieldError
}

type TypeDateInput = IDateInput &
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export const DateInput = forwardRef<HTMLInputElement, TypeDateInput>(
  ({ style, error, ...rest }, ref) => {
    const min = useFormatDate(new Date())

    return (
      <div>
        <input
          className={styles.datetime_input}
          style={style}
          ref={ref}
          type='datetime-local'
          min={min}
          {...rest}
        />
        {error && <div className={styles.error}>{error.message}</div>}
      </div>
    )
  }
)

DateInput.displayName = 'dateInput'
