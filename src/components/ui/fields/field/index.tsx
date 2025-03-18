'use client'

import cn from 'clsx'
import { Eye, EyeOff } from 'lucide-react'
import { type HTMLInputTypeAttribute, forwardRef, useState } from 'react'

import styles from './index.module.scss'
import type { TypeInputProps } from './index.types'

export const Field = forwardRef<HTMLInputElement, TypeInputProps>(
  (
    {
      type: initialType,
      isPassword,
      style,
      className,
      Icon,
      onClickBtn,
      ...rest
    },
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
            onClick={() =>
              onClickBtn
                ? onClickBtn()
                : setType(type === 'password' ? 'text' : 'password')
            }
          >
            {type === 'password' ? <Eye /> : <EyeOff />}
          </div>
        )}
      </div>
    )
  }
)

Field.displayName = 'field'
