import cn from 'clsx'
import { ChangeEvent, forwardRef, useRef, useState } from 'react'

import styles from './TextArea.module.scss'
import { TypeTextAreaProps } from './TextArea.types'

export const TextArea = forwardRef<HTMLTextAreaElement, TypeTextAreaProps>(
  ({ error, className, ...rest }, ref) => {
    return (
      <div className={cn(className, styles.textarea)}>
        <textarea
          autoComplete='none'
          ref={ref}
          cols={60}
          rows={10}
          {...rest}
        />
        {error && <div className={styles.error}>{error.message}</div>}
      </div>
    )
  }
)

TextArea.displayName = 'textarea'
