import cn from 'clsx'
import { Check } from 'lucide-react'
import React, { InputHTMLAttributes } from 'react'

import Loader from '../../loader/Loader'

import styles from './Button.module.scss'

interface IButton extends InputHTMLAttributes<HTMLButtonElement> {
  isPending?: boolean
  isSuccess?: boolean
  isLoading?: boolean
  isError?: boolean
  type?: 'button' | 'submit'
  disabled?: boolean
  text: string
  isSmall?: boolean
}

export const Button = ({
  isPending,
  isSuccess,
  isLoading,
  isError,
  type,
  text,
  className,
  disabled,
  onClick,
  style,
  isSmall
}: IButton) => {
  return (
    <button
      type={type}
      className={cn(
        isSmall ? styles.small : styles.standart,
        isSuccess && styles.success,
        isError && styles.error,
        styles.btn,
        className
      )}
      disabled={disabled}
      onClick={onClick}
      style={style}
    >
      {isLoading || isPending ? (
        <Loader />
      ) : isSuccess ? (
        <p>
          Успешно
          <Check />
        </p>
      ) : isError ? (
        <p>Произошла ошибка</p>
      ) : (
        text
      )}
    </button>
  )
}
