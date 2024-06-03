'use client'

import cn from 'clsx'
import { Eye, EyeOff } from 'lucide-react'
import { HTMLInputTypeAttribute, forwardRef, useState } from 'react'

import styles from './Field.module.scss'
import type { TypeInputProps } from './Field.types'

export const Field = forwardRef<HTMLInputElement, TypeInputProps>(
  (
    { error, type: initialType, isPassword, style, className, Icon, ...rest },
    ref
  ) => {
    const [type, setType] = useState<HTMLInputTypeAttribute | undefined>(
      initialType || 'text'
    )

    return (
      <div className={cn(styles.field, className)}>
        {Icon && (
          <div className={styles.icon}>
            <Icon />
          </div>
        )}
        <input
          ref={ref}
          type={type}
          style={style}
          {...rest}
        />
        {isPassword && (
          <div
            className={styles.eyeIcon}
            onClick={() => setType(type === 'password' ? 'text' : 'password')}
          >
            {type === 'password' ? <Eye /> : <EyeOff />}
          </div>
        )}
        {error && <div className={styles.error}>{error.message}</div>}
      </div>
    )
  }
)

Field.displayName = 'field'
